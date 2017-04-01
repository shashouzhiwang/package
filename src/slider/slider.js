/**
 * Created by Loki.Luo on 2017/3/23.
 */
// var test = [
//     {
//         text:"http://baidu.com",
//         name:"test1"
//     },
//     {
//         text:"test2",
//         name:"test2"
//     },
//     {
//         text:"test3",
//         name:"test3"
//     }
// ];
// $.each(test,function(index,item){
//     var obj
//     if(index==0){
//         obj = $('<div class="img_slide slide active">').qrcode({
//             width: 64,
//             height: 64,
//             text:item.text
//         });
//     }else{
//         obj = $('<div class="img_slide slide">').qrcode({
//             width: 64,
//             height: 64,
//             text:item.text
//         });
//     }
//     $('.slides_warp').append(obj);
// });

// (function ($, undefined) {
//     var slide = function (data) {
//         this.construct(data);
//         this.renderDOM();
//     };
//     slide.prototype = {
//         construct : function(data){
//             this.default = {
//                 startIndex : 0,
//             };
//             this.default = $.extend(this.default,data);
//         },
//         renderDOM : function(){
//             if(this.default.warp.html()){
//                 this.$wrap = $("<div class='img_slides_warp slides_warp'>");
//                 this.default.warp.children().addClass('img_slide slide');
//                 this.default.warp.children().eq(this.default.startIndex).addClass('active');
//                 this.default.warp.html(this.$wrap.html(this.default.warp.html()));
//             }
//             this.active();
//         },
//         active : function(){
//             var wrap = this.$wrap;
//             var slides = this.default.warp.children().find('.slide');
//             var active = slides.eq(this.default.startIndex);
//             var width = this.$wrap.width();
//             var i = slides.index(active);
//             slides
//                 .on('swipeleft',function(e){
//                     if(i === slides.length - 1){
//                         return;
//                     }
//                     slides.eq(i+1).trigger('activate');
//                 })
//                 .on('swiperight',function(e){
//                     if(i === 0){
//                         return;
//                     }
//                     slides.eq(i-1).trigger('activate');
//                 })
//                 .on('activate',function(e){
//
//                     slides.eq(i).removeClass('active');
//
//                     $(e.target).addClass('active');
//
//                     i = slides.index(e.target);
//                     console.log(i);
//                 })
//                 .on('movestart',function(e){
//                     if((e.distX> e.distY && e.distX < -e.distY) ||
//                         (e.distX< e.distY && e.distX > -e.distY)){
//                         e.preventDefault();
//                         return;
//                     }
//                     wrap.addClass('notransition');
//                 })
//                 .on('move',function(e){
//                     var left = 100 * e.distX /width;
//                     if(e.distX < 0){
//                         if(slides[i+1]){
//                             slides[i].style.left = left +'%';
//                             slides[i+1].style.left = (left+100) +'%';
//                         }
//                         else{
//                             slides[i].style.left = left/4 + '%';
//                         }
//                     }
//                     if(e.distX > 0){
//                         if(slides[i-1]){
//                             slides[i].style.left = left +'%';
//                             slides[i-1].style.left = (left-100) +'%';
//                         }
//                         else{
//                             slides[i].style.left = left/5 + '%';
//                         }
//                     }
//                 })
//                 .on('moveend',function(e){
//                     wrap.removeClass('notransition');
//                     slides[i].style.left = '';
//                     if(slides[i+1]){
//                         slides[i+1].style.left = '';
//                     }if(slides[i-1]){
//                         slides[i-1].style.left = '';
//                     }
//                 });
//
//         }
//     };
//
//     window['slide'] = slide;
// })($);



