/**
 * Created by Loki.Luo on 2017/3/2.
 */

requirejs.config({
    baseUrl:'',
    paths:{
        jquery:'../../bower_components/jquery/dist/jquery',
        layer:'../../bower_components/layer/src/layer'
    },
    shim:{
        'layer':{
            deps: ['jquery'],
            exports: 'layer'
        },

    }

});