/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','../config','layer'],function($,config,layer){
        requirejs(['mapping'],function(mapping){
// console.log($);
//             console.log($('h3').html());
            var data = {
                data:{
                    data:[
                        {
                            data:[
                                {
                                    "topicId": "topic13",
                                    "topicType": "disorder",
                                    "serviceStatus": "inactive",
                                    "createTime": "2017-02-17T10:45:05.434+0800"
                                },
                                {
                                    "topicId": "333",
                                    "topicType": "order",
                                    "serviceStatus": "active",
                                    "createTime": "2017-02-17T16:19:02.606+0800"
                                },
                                {
                                    "topicId": "topic16",
                                    "topicType": "disorder",
                                    "serviceStatus": "active",
                                    "createTime": "2017-02-20T15:12:15.197+0800"
                                },
                                {
                                    "topicId": "test",
                                    "topicType": "order",
                                    "serviceStatus": "inactive",
                                    "createTime": "2017-02-20T17:42:13.503+0800"
                                }
                            ]
                        }
                    ]
                }
            };

            mapping.matchCode('topicType',data,function(data){
   // alert(JSON.stringify(data));
                console.log(data);
            });

        })
    })

});