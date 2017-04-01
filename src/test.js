/**
 * Created by Loki.Luo on 2017/3/30.
 */
requirejs(['require.config','main'],function(requireconfig){
    requirejs(['jquery','config','layer'],function($,config,layer){
        requirejs(['asynLoad','dialog'],function(asyn,dialog){
            // console.log(asyn);
            dialog.msg({
               content:'加载中..',
               time:9000
            });
            // asyn.ajax({
            //     data:{"test":'uu',para:'rr'},
            //     url:'api/bacInfo/mapping/serviceStatus',
            //     localUrl:'../test-data/topic-list.json',
            //     success:function(data, status, requestCode)
            //     {
            //         data.data = {
            //             time:1488525824,
            //             currency:"22",
            //             data:{
            //                 lang:"中文",
            //                 time:{
            //                     test:"ceshi"
            //                 },
            //                 test:"测试"
            //             }
            //         };
            //         // format.binding(data.data);
            //     },
            //     error:function(){
            //
            //     }
            // });
        })
    })

});
