/**
 * Created by Loki.Luo on 2017/3/3.
 */

/**
 * @description dialog默认参数列表
 * @param {closeBtn} 是否包含关闭按钮
 * @param {area} 弹窗的宽高
 * @param {type} 动画类型
 * @param {shade} 遮罩透明度 0-133
 *
 *
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('dropDown',['exports','asynLoad'], factory);
    } else {
        factory(window['dropDown']=function(data){
            this.init(data);
        },asynLoad);
    }
}(function(koExports,asynLoad){
    var dropDown = typeof koExports !== 'undefined' ? koExports : {};
    var tem = function(data){
        this.init(data);
    };
    tem.prototype = dropDown.prototype = {
        init:function (data) {
            var self = this;
            console.log(dropDown);
            this.construct();
            self.default = $.extend(self.default,data);
            this.renderDOM();
        },
        construct: function (){
            this.data = [];
            this.default = {
                data:{},
                submitParam:'param',
                getListParam:'name',
                getListCode:"code",
                invaildTip:"校验未通过",
                required:false,
            };
        },
        renderDOM: function () {
            var inp = this.default.required ? "<input type='text' drop=true required data-invaildTip = "+this.default.invaildTip+">" : "<input type='text' />";
            var str = "<div class='searchWarp'><div class='search_input'>" +
                inp +
                "</div>"+
                "<div class='search_content'>"+
                "</div></div>";
            this.default.warp.html(str);
            this.$input = this.default.warp.find('input');
            this.inputKeyup();
            var self = this;
            self.$input.on('blur',function(){
                var val = self.$input.val(),i=0;
                $.each(self.data,function(index,item){
                    item = self.getCode_Name(item);
                    if(val == item.name){
                        self.$input.attr('key',item.code);
                        return false;
                    }
                    i++;
                });
                if(i>=self.data.length){
                    self.$input.val('');
                }
            })
            self.$input.on('focus',function(){
                self.$input.removeClass('invaild');
                if(self.$input.val() == self.$input.attr('data-invaildtip'))
                    self.$input.val('');
            });
        },
        asynRequire:function(val){
            //this.default.warp.find('.search_content').append('dasdfsa');
            var self = this;
            var data = {};
            data[this.default.submitParam] = val;
            if(this.default.data){
                data = $.extend(data,this.default.data);
            }
            asynLoad.ajax(
                $.extend(this.default.requireParam,{
                    success:function(response,status){
                        self.data = response.data;
                        self.generate(response,status);
                        self.default.requireParam.callBack(self.data);
                    },
                    data:data
                }));
        },
        inputKeyup:function(){
            var self = this;
            var oldTime,newTime;
            var setTime;
            this.$input.on('keyup',function(e){
                self.$input.attr('key','');
                if(e.which == 38 || e.which == 40 || e.which == 13){
                    self.useKeySelect(e.which);
                    return;
                }
                var val = $(this).val();
                clearTimeout(setTime);
                setTime = setTimeout(function(){
                    self.asynRequire(val);
                },300);
                if(oldTime){
                    newTime = new Date().getTime();
                    if((newTime-oldTime)>300){
                        clearTimeout(setTime);
                        self.asynRequire(val);
                    }
                    oldTime = newTime;
                }else{
                    oldTime = new Date().getTime();
                }
            });
        },
        generate:function(data, status){
            var self = this;
            self.default.warp.find('.search_content').empty();
            self.selectList();
            var temWarp = '';
            $.each(data.data,function(index,item){
                item = self.getCode_Name(item);
                var tem = item.name;
                var code = item.code;
                tem= index==0 ? "<div class='active' data-code="+item.code+">"+ tem +"</div>":"<div data-code="+item.code+">"+ tem +"</div>";
                temWarp += tem;
            });
            self.default.warp.find('.search_content').html(temWarp);
        },
        selectList:function(){
            var self = this;
            self.default.warp.find('.search_content').on('click','div',function(){
                self.$input.val($(this).html()).attr('key',$(this).attr('data-code'));
                self.default.warp.find('.search_content').empty();
            })
        },
        getCode_Name:function(item){
            return {
                name:this.default.getListParam ? item[this.default.getListParam]: item.name,
                code:this.default.getListCode ? item[this.default.getListCode]: item.code
            }
        },
        useKeySelect:function(keyVal){
            var $list = this.default.warp.find('.search_content div');
            var index = $list.index(this.default.warp.find('.search_content div.active'));
            // console.log(index);
            if(keyVal == 40){
                if(index == $list.length-1)
                    return;
                $list.eq(index).removeClass('active');
                $list.eq(index+1).addClass('active');
            }
            if(keyVal == 38){
                if(index == 0)
                    return;
                $list.eq(index).removeClass('active');
                $list.eq(index-1).addClass('active');
            }
            if(keyVal == 13){
                if($list.length==0)
                    return;
                this.$input.val($list.eq(index).html()).attr('key',$list.eq(index).attr('data-code'));
                this.default.warp.find('.search_content').empty();
            }
        }
    };
    if(typeof dropDown !== "function"){
        dropDown.init = tem;
    }
});

