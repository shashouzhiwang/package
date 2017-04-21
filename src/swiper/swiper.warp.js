/**
 * Created by Loki.Luo on 2017/4/7.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('swiper',['exports','asynLoad','config'], factory);
    } else {
        factory(window['swiper'] = {},asynLoad,config);
    }
}(function(koExports,asynLoad,config) {
    var swiper = typeof koExports !== 'undefined' ? koExports : {};

    // swiper

});