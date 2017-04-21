/**
 * Created by Loki.Luo on 2017/3/2.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('dialog',['exports','layer','asynLoad'], factory);
    } else {
        factory(window['dialog'] = {},layer,asynLoad);
    }
}(function(koExports,layer,asynLoad){
    if(layer)
    layer.config({
        path: '../../bower_components/layer/src/'
    });

    var dialog = typeof koExports !== 'undefined' ? koExports : {};
    dialog.defConfirmOption = {
        closeBtn: 0,
        shadeClose: true,
        area: ['300px'],
        type: 1,
        shade:.3,
        title: false, //不显示标题
        // content: '', //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function(){
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
        }
    };

    dialog.layerId = null;
    dialog.loadingId = null;
    dialog.confirmInit = function(data){
        if(data.hasOwnProperty('template')){
            if(data.template){
                data.layer['content'] = data.template;
                $.extend(dialog.defConfirmOption,data.layer);
                dialog.layerId = layer.open(dialog.defConfirmOption);
            }
        }
        if(data.hasOwnProperty('templateUrl')){
            if(data.templateUrl){
                asynLoad.ajax(
                    {   url:data.templateUrl,
                        type: "GET",
                        template:true,
                        loading:false,
                        dataType:'html',
                        success:function(res){
                            var content = $('<div>');
                            content.html(res);
                            content.find('.consumerModel_content').html(data.defaultContent);
                            $(document).on('click','.consumerModel .confirm',dialog.confirmBtn);
                            $(document).on('click','.consumerModel .cancel',dialog.cancelBtn);
                            data.layer['content'] = content.html();
                            $.extend(dialog.defConfirmOption,data.layer);
                            dialog.layerId = layer.open(dialog.defConfirmOption);
                        }});
            }
        }
    };
    dialog.confirmLayer = function(data){
        //context.confirmInit(data);
        //layer.open(context.defConfirmOption);
    };
    dialog.confirm = function(data){
        dialog.confirmInit(data);
    };
    /**
     *
     * @param data
     */
    dialog.loading = function(data){
        data = $.extend(
            {
                shade: [0.1,'#000']
            },data);
        dialog.loadingId = layer.load(1, data);
    };
    dialog.loadingClose = function(){
        layer.close(dialog.loadingId);
    };
    /**
     *
     * @param data
     */
    dialog.msg = function(data){
        data = $.extend(
            {
                time:2000
            },data);
        var content = data.content;
        delete data['content'];
        layer.msg(content,data);
    };

    dialog.confirmBtn = function(){
        layer.close(dialog.layerId);
        dialog.defConfirmOption.comfireCb();
    };

    dialog.cancelBtn = function(){
        layer.close(dialog.layerId);
        dialog.defConfirmOption.cancel();
    };
});





