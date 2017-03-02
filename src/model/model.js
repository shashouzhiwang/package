/**
 * Created by Loki.Luo on 2017/3/2.
 */

var consumerModel = {};
(function(context){

    /**
     *
     * @param data
     * {
     * template:
     * templateUrl
     * layer:{
     *          type:
     *          shade:
     *          title
     *      }
     * }
     */
    context.defConfirmOption = {
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
    context.layerId = null;
    context.loadingId = null;
    context.confirmInit = function(data){
        if(data.hasOwnProperty('template')){
            if(data.template){
                data.layer['content'] = data.template;
                $.extend(context.defConfirmOption,data.layer);
                context.layerId = layer.open(context.defConfirmOption);
            }
        }
        if(data.hasOwnProperty('templateUrl')){
            if(data.templateUrl){
                asynLoad.ajax(
                    {   url:data.templateUrl,
                        type: "GET",
                        loading:false,
                        dataType:'html',
                        success:function(res){
                            //console.log(data);
                            var content = $('<div>');
                            content.html(res);
                            content.find('.consumerModel_content').html(data.defaultContent);
                            data.layer['content'] = content.html();
                            $.extend(context.defConfirmOption,data.layer);
                            context.layerId = layer.open(context.defConfirmOption);
                        }});
            }
        }
    };
    context.confirmLayer = function(data){
        //context.confirmInit(data);
        //layer.open(context.defConfirmOption);
    };
    context.confirm = function(data){
        context.confirmInit(data);
    };

    context.loading = function(data){
        data = $.extend(
            {
                shade: [0.1,'#000']
            },data);
        context.loadingId = layer.load(1, data);
    };
    context.loadingClose = function(){
        layer.close(context.loadingId);
    };

    context.msg = function(data){
        data = $.extend(
            {
                time:2000
            },data);
        var content = data.content;
        delete data['content'];
        layer.msg(content,data);
    };

    context.confirmBtn = function(){
        context.defConfirmOption.comfireCb();
        layer.close(context.layerId);
    };

    context.cancelBtn = function(){
        context.defConfirmOption.cancel();
        layer.close(context.layerId);
    };


})(consumerModel);




