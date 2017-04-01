/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','config','layer'],function($,config,layer){
        requirejs(['collect'],function(collect){

            var test = {};
            collect.collectData('collect',test)
        })
    })

});