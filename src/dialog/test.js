/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','config','layer'],function($,config,layer){
        requirejs(['dialog'],function(dialog){

            dialog.confirm({
                //        template:"<div>eeeeee</div>",
                defaultContent:"rrrrrrrrrr",
                templateUrl:"dialog.html",
                layer:{
                    comfireCb:function(){
                        alert('comfireCb');
                    },
                    cancel:function(){
                        alert('cancelCb');
                    }
                }
            });
        })
    })

});