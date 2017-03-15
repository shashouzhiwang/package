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

(function ($, undefined) {
    var dropDown = function (data) {
        var self = this;
        self.default = {
        };
        self.default = $.extend(self.default,data);

        this.renderDOM();

        construct();

    };

    dropDown.prototype = {
        renderDOM: function () {
            var str = "<div class='searchWarp'><div class='search_input'>" +
                            "<input type='text'/>" +
                       "</div>"+
                       "<div class='search_content'>"+
                       "</div></div>";
            this.default.warp.html(str);
            this.$input = this.default.warp.find('input');
            this.inputKeyup();
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
                        self.generate(response,status);
                    },
                    data:data
            }));
        },
        inputKeyup:function(){
            var self = this;
            var oldTime,newTime;
            var setTime;
            this.$input.on('keyup',function(e){
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
               var tem = self.default.getListParam ? item[self.default.getListParam]: item.name;
               tem= index==0 ? "<div class='active'>"+ tem +"</div>":"<div>"+ tem +"</div>";
               temWarp += tem;
            });
            self.default.warp.find('.search_content').html(temWarp);
         },
        selectList:function(){
            var self = this;
            self.default.warp.find('.search_content').on('click','div',function(){
                self.$input.val($(this).html());
                self.default.warp.find('.search_content').empty();
            })
        },
        useKeySelect:function(keyVal){
            var $list = this.default.warp.find('.search_content div');
            var index = $list.index(this.default.warp.find('.search_content div.active'));
            console.log(index);
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
                this.$input.val($list.eq(index).html());
                this.default.warp.find('.search_content').empty();
            }
        }
    };
    function construct(){
    }
    window['dropDown'] = dropDown;
})($);

$(document).click(function(){
    if($('.search_content').length>0){
        $('.search_content').empty();
    }
});