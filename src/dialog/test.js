/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','layer','../config'],function($,layer){
console.log(layer);
        // layer.open({
        //     title: [
        //         '我是标题',
        //         'background-color:#8DCE16; color:#fff;'
        //     ]
        //     ,anim: 'up'
        //     ,content: '展现的是全部结构'
        //     ,btn: ['确认', '取消']
        // });

        requirejs(['dialog'],function(dialog){
            console.log(dialog);
            // dialog.msg({
            //     content:'加载中..',
            //     time:9000
            // });
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