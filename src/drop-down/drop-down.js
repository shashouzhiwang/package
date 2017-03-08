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
            this.$input.on('keyup',function(){
                var val = $(this).val();
                clearTimeout(setTime);
                setTime = setTimeout(function(){
                    //self.default.asynRequire(val,self.generate);
                    self.asynRequire(val);
                },300);
                if(oldTime){
                    newTime = new Date().getTime();
                    if((newTime-oldTime)>300){
                        clearTimeout(setTime);
                        //self.default.asynRequire(val,self.generate);
                        self.asynRequire(val);
                    }
                    oldTime = newTime;
                }else{
                    oldTime = new Date().getTime();
                }
            });

            this.$input.on('blur',function(){
                self.default.warp.find('.search_content').empty();
            })
        },
        generate:function(data, status){
            var self = this;
            self.default.warp.find('.search_content').empty();
            $.each(data.data,function(index,item){
                self.$searchList = $('<div>');
                self.default.getListParam ? self.$searchList.html(item[self.default.getListParam]): self.$searchList.html(item.name);
                self.default.warp.find('.search_content').append(self.$searchList);
                self.selectList();
            })
         },
        selectList:function(){
            var self = this;
            this.$searchList.on('click',function(){
                self.$input.val($(this).html());
                self.default.warp.find('.search_content').empty();
            })
    }
    };
    function construct(){

    }
    window['dropDown'] = dropDown;
})($);