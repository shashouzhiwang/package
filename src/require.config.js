/**
 * Created by Loki.Luo on 2017/3/2.
 */

requirejs.config({
    baseUrl:'',
    paths:{
        jquery:'../../bower_components/jquery/dist/jquery',
        // layer:'../../bower_components/layer/src/mobile/layer',
        layer:'../../bower_components/layer/src/layer',
        move:'../../bower_components/jquery.event.move/js/jquery.event.move',
        swipe:'../../bower_components/jquery.event.swipe/js/jquery.event.swipe',
        swiper:'../../bower_components/swiper/dist/js/swiper.jquery' 
    },
    shim:{
        'layer':{
            deps: ['jquery'],
            exports: 'layer'
        },

    }

});