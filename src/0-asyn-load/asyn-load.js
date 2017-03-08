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
    context.init = function(opt){
        context.defOption = {
            url:'',
            asyn: true,
            data:{
                accessToken:localStorage.accessToken
            },
            bindingKey:'key',
            forbidBindingKey:false,
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
                //consumerModel.loadingClose();
                setTimeout(function(){ dialog.loadingClose(); }, 100);
                //alert('complete');
            }
        };

        //判断是否是做测试
        opt = context.testLoad(opt);
        //alert(JSON.stringify(opt));
        opt.data = $.extend(context.defOption.data,opt.data);
        context.defOption = $.extend(context.defOption,opt);
        if(context.defOption.loading)
            dialog.loading();

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
                dialog.msg({
                    content:'系统异常',
                    time:3000
                });
            }
            if(status == 'timeout'){
                dialog.msg({
                    content:'请求超时',
                    time:3000
                });
            }
            error(data,status,requestCode);
        }
    };

    context.testLoad = function(opt){
        if(!opt.template){
            if(!config.TEST){
                opt.url = config.DOMAIN + opt.url;
            }else{
                opt.url = opt.localUrl;
            }
            opt.type = config.REQUIRT_STYLE;
        }
        opt.timeout = config.TIMEOUT;
        return opt;
    };

    context.ajax = function(opt){
        context.init(opt);
        $.ajax(context.defOption).then(function(data){
            //alert(JSON.stringify(data));
            if(context.defOption.cb){
                context.defOption.cb(data);
            }
            if(data.status == 'SUCCESS' && !context.defOption.forbidBindingKey){
                //format.getAsynData(data.data);
            }
            //恢复forbidBindingKey为false
            if(context.defOption.forbidBindingKey){
                context.defOption.forbidBindingKey = false;
            }
        });
    };


})(asynLoad);



