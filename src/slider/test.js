/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config'],function(requireconfig){
    requirejs(['jquery','../config','layer','move','swipe'],function($,config,layer,move,swipe){
        requirejs(['slider'],function(slider){;
            new slider.init({
                warp:$('#slide')
            });
        })
    })

});