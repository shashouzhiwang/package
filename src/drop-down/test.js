/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','config','layer'],function($,config,layer){
        requirejs(['dropDown'],function(dropDown){
           new dropDown.init({
               warp:$('#search'),
               submitParam:'param',
               data:{},
               getListParam:'name',
               getListCode:"code",
               invaildTip:"邮箱不能为空",
               required:true,
               requireParam:{
                   url:'api/bacInfo/mapping/serviceStatus',
                   localUrl:'../test-data/topic-list.json',
                   loading:false,
                   callBack:function(data){
                       alert(data);
                   }
               }
           });

        })
    })

});