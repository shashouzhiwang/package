/**
 * Created by Loki.Luo on 2017/3/1.
 */
/**
 *封装ajax请求函数
 * 加入判断页面是否需要在登录条件下才能打开
 * 加入默认参数和默认函数
 *
 *  **/
var asynLoad = {};
(function(context){
    context.defOption = {
        url:'http://192.168.1.108:8083/guest/api/table.php?page=1',
        asyn: true,
        timeout: 2000,
        type: "POST",
        data:{
            accessToken:localStorage.accessToken
        },
        loading:true,
        dataType: "json",
        cache: false,
        success:function(data, status, requestCode){
        },
        error:function(data, status, requestCode){
            //console.log(data,status,requestCode);
        },
        beforeSend:function(data){
        },
        complete:function(data, status, requestCode){
            consumerModel.loadingClose();
            //alert('complete');
        }
    };

    context.init = function(opt){
        opt.url = config.DOMAIN + opt.url;
        //alert(JSON.stringify(opt));
        opt.data = $.extend(context.defOption.data,opt.data);
        context.defOption = $.extend(context.defOption,opt);
        if(context.defOption.loading)
            consumerModel.loading();

        context.successGlobalCb();
        context.errorGlobalCb();
    };

    context.successGlobalCb = function(){
        var success = context.defOption.success;
        context.defOption.success = function(data, status, requestCode){
            success(data,status, requestCode);
        };
    };

    context.errorGlobalCb = function(){
        var error = context.defOption.error;
        context.defOption.error = function(data, status, requestCode){
            if(status=='error'){
                consumerModel.msg({
                    content:'系统异常',
                    time:3000
                });
            }
            if(status == 'timeout'){
                consumerModel.msg({
                    content:'请求超时',
                    time:3000
                });
            }
            setTimeout(function(){ consumerModel.loadingClose(); }, 100);
            error(data,status,requestCode);
        }
    };

    context.ajax = function(opt){
        context.init(opt);
        $.ajax(context.defOption);
    };

})(asynLoad);



