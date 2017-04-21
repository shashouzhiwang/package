/**
 * Created by Loki.Luo on 2017/4/7.
 */
requirejs(['../require.config'],function(requireconfig){
    requirejs(['jquery','swiper'],function($,swiper){

        var mySwiper = new swiper ('.swiper-container', {
            // direction: 'vertical',
            loop: true,

            // 如果需要分页器
            pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        })


        //
        // requirejs(['mapping'],function(mapping){
        // })
    })

});