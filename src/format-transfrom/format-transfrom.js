/**
 * Created by Loki.Luo on 2017/3/3.
 */
var format = {};
(function(context){
    context.curKey = null;
    context.curVal = null;
    context.getAsynData = function(data){

        var i = 0;
        $.each(context.curKey,function(index,item){
            i ++;
            if(i==context.curKey.length){
                context.curVal = data[item];
                return false;
            }else{
                data = data[item];
            }
        });

       // context.getJsonVal(context.curKey,data);

        //switch (mapping.judgeObject(data)){
        //    case 'Array' : break;
        //    case 'Object' : context.checkType(data); break;
        //    case 'NAN':break;
        //}

    };

    context.getJsonVal = function(curKey,data){
        //return data[item];
    };

    context.checkType = function(data){
        for(key in data){

            switch (mapping.judgeObject(data[key])){
                case 'Array' : break;
                case 'Object' : context.getAsynData(data[key]); break;
                case 'NAN':context.getCurVal(data);break;
            }

        }
    };

    context.getCurVal = function(data){
        for(key in data){
            //$key.attr(key)
            if(key == context.curKey){
                context.curVal = data[key];
            }
        }
    };

    context.init = function(data){
        $key = $('[key]');
        $.each($key,function(index,item){
            context.curVal = null;
            context.curKey = $(this).attr('key').split('.');
            context.transfrom($(this),data);
        });
    };

    context.transfrom = function(_this,data){
        if(!context.curKey)
        return;

        context.transfromArray = context.curKey[0].split('|');
        if(context.transfromArray.length>1){
            context.transfromPrefix_param = $.trim(context.transfromArray[0]).split(' ');
            context.curKey[0] = $.trim(context.transfromArray[1]);
        }
        context.getAsynData(data);
        if(context.transfromPrefix_param){
            context.transfromPrefix = context.transfromPrefix_param[0];
            context.transfromPrefix_param.splice(0,1);
            context.transfromParam = context.transfromPrefix_param[0];

            switch(context.transfromPrefix){
                case '$time' :
                    var param ='';
                    $.each(context.transfromPrefix_param,function(index,item){
                        param += ' '+item;
                    });
                    context.time_transfrom(context.curVal,param);break;
                case '$currency' :
                    context.currency_transfrom(context.curVal,context.transfromPrefix_param);break;
            }
        }
        context.transfromPrefix = null;
        if(context.curVal)
            _this.html(context.curVal);

    };

    context.time_transfrom = function(dateObj,format){
        dateObj = new Date(dateObj);
        var o = {
            "M+" : dateObj.getMonth()+1, //month
            "d+" : dateObj.getDate(), //day
            "h+" : dateObj.getHours(), //hour
            "m+" : dateObj.getMinutes(), //minute
            "s+" : dateObj.getSeconds(), //second
            "q+" : Math.floor((dateObj.getMonth()+3)/3), //quarter
            "S" : dateObj.getMilliseconds() //millisecond
        };
        if(/(y+)/.test(format))
        {
            format = format.replace(RegExp.$1, (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o)
        {
            if(new RegExp("("+ k +")").test(format))
            {
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            }
        }
        context.curVal = format;

        return context.curVal;
    };

    context.currency_transfrom = function(data,array){
        if(array.length>0){
            var tem = new Number(data);
            data = tem.toFixed(array[0]);
        }
        if(array.length>1){
            data = array[1]+data;
        }
        context.curVal = data;
        return context.curVal;
    };

    context.binding = function(data){
        context.init(data);
    };

})(format);