/**
 * @description 将json中的某个字段的code匹配为对应的值(暂不支持数组)
 * @param {string} topicType 需要匹配的字段名
 * @param {json} data 需要做匹配的json
 * @param {function} function 匹配成功后的回调函数
 */

function mapping_demo(topicType,data,fun){
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
//    alert(JSON.stringify(data));
    });
}