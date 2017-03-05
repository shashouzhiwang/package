/**
 * Created by Loki.Luo on 2017/3/3.
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
            var str = "<div class='search_input'>" +
                            "<input type='text'/>" +
                       "</div>"+
                       "<div class='search_content'>"+
                       "</div>";
            this.default.warp.html(str);
            this.$input = this.default.warp.find('input');
            this.inputKeyup();
        },
        asynRequire:function(val){
            this.default.require(val);
        },
        inputKeyup:function(){
            var self = this;
            var oldTime,newTime;
            var setTime;
            this.$input.on('keyup',function(){
                var val = $(this).val();
                clearTimeout(setTime);
                setTime = setTimeout(function(){
                    self.default.asynRequire(val);
                },300);

                if(oldTime){
                    newTime = new Date().getTime();
                    if((newTime-oldTime)>300){
                        clearTimeout(setTime);
                        self.default.asynRequire(val);
                    }
                    oldTime = newTime;
                }else{
                    oldTime = new Date().getTime();
                }
                //console.log($(this).val());

                //self.default.asynRequire($(this).val());
            })
        }
    };
    function construct(){

    }
    window['dropDown'] = dropDown;
})($);