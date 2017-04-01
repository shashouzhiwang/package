/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','config','layer'],function($,config,layer){
        requirejs(['page'],function(page){

            var pageData = {
                totalRows:16,
                defaultSize:10,
                pageSize:16

            };
            new page.init({
                warp:$('#page'),
                data:pageData,
                showNum:5, //一次显示多少个页面按钮
                style:2,  //UI风格   默认为2
                callBack:function(index){
                    alert(index);
                }
            });

        })
    })

});