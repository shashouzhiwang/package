/**
 * Created by Loki.Luo on 2017/3/23.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('slider',['exports'], factory);
    } else {
        factory(window['slider']=function(data){
            this.init(data);
        })
    }
}(function(koExports) {
    var slider = typeof koExports !== 'undefined' ? koExports : function (data) {
            this.init(data)
        };
    var tem = function(data) {
        this.init(data);
    };

    tem.prototype = slider.prototype = {
        init : function(data){
            this.construct(data);
            this.renderDOM();
        },
        construct : function(data){
            this.default = {
                startIndex : 0,
            };
            this.default = $.extend(this.default,data);
        },
        renderDOM : function(){
            if(this.default.warp.html()){
                this.$wrap = $("<div class='img_slides_warp slides_warp'>");
                this.default.warp.children().addClass('img_slide slide');
                this.default.warp.children().eq(this.default.startIndex).addClass('active');
                this.default.warp.html(this.$wrap.html(this.default.warp.html()));
            }
            this.active();
        },
        active : function(){
            var wrap = this.$wrap;
            var slides = this.default.warp.children().find('.slide');
            var active = slides.eq(this.default.startIndex);
            var width = this.$wrap.width();
            var i = slides.index(active);
            slides
                .on('swipeleft',function(e){
                    if(i === slides.length - 1){
                        return;
                    }
                    slides.eq(i+1).trigger('activate');
                })
                .on('swiperight',function(e){
                    if(i === 0){
                        return;
                    }
                    slides.eq(i-1).trigger('activate');
                })
                .on('activate',function(e){

                    slides.eq(i).removeClass('active');

                    $(e.target).addClass('active');

                    i = slides.index(e.target);
                    console.log(i);
                })
                .on('movestart',function(e){
                    if((e.distX> e.distY && e.distX < -e.distY) ||
                        (e.distX< e.distY && e.distX > -e.distY)){
                        e.preventDefault();
                        return;
                    }
                    wrap.addClass('notransition');
                })
                .on('move',function(e){
                    var left = 100 * e.distX /width;
                    if(e.distX < 0){
                        if(slides[i+1]){
                            slides[i].style.left = left +'%';
                            slides[i+1].style.left = (left+100) +'%';
                        }
                        else{
                            slides[i].style.left = left/4 + '%';
                        }
                    }
                    if(e.distX > 0){
                        if(slides[i-1]){
                            slides[i].style.left = left +'%';
                            slides[i-1].style.left = (left-100) +'%';
                        }
                        else{
                            slides[i].style.left = left/5 + '%';
                        }
                    }
                })
                .on('moveend',function(e){
                    wrap.removeClass('notransition');
                    slides[i].style.left = '';
                    if(slides[i+1]){
                        slides[i+1].style.left = '';
                    }if(slides[i-1]){
                        slides[i-1].style.left = '';
                    }
                });

        }
    };
    if(typeof slider !== "function"){
        slider.init = tem;
    }
});


