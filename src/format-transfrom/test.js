/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','layer'],function($,layer){
        requirejs(['format'],function(format){

            var data = {
                time:1488525824,
                checkbox:1,
                currency:"22",
                data:{
                    lang:"中文",
                    time:{
                        test:"ceshi"
                    },
                    test:"测试"
                }
            };
            format.binding(data);

            $('#test').on("click",function(){
                alert($('#radio').is(':checked'));
                alert($('#checkbox').is(':checked'));
            })

        })
    })

});