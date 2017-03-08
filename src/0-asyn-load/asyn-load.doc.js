/**
 *
 * @description 异步请求函数的封装使用demo.
 * @param {json} data 传给后台的数据
 * @param {String} url 请求的URL地址
 * @param {String} localUrl 本地模拟的测试地址
 * @param {function} success 成功回调
 * @param {function} error 失败回调
 *
 */

function demo_asyn_load(data,url,localUrl,success,error){
    asynLoad.ajax({
        data:{"test":'uu',para:'rr'},
        url:'api/bacInfo/mapping/serviceStatus',
        localUrl:'../test-data/topic-list.json',
        success:function(data, status, requestCode)
        {
            data.data = {
                time:1488525824,
                currency:"22",
                data:{
                    lang:"中文",
                    time:{
                        test:"ceshi"
                    },
                    test:"测试"
                }
            };
            format.binding(data.data);
        },
        error:function(){

        }
    });
}



