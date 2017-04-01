/**
 * Created by Loki.Luo on 2017/3/3.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('format',['exports'], factory);
    } else {
        factory(window['format'] = {});
    }
}(function(koExports){
    var format = typeof koExports !== 'undefined' ? koExports : {};
    format.curKey = null;
    format.curVal = null;
    format.getAsynData = function(data){

        var i = 0;
        $.each(format.curKey,function(index,item){
            i ++;
            if(i==format.curKey.length){
                format.curVal = data[item];
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

    format.getJsonVal = function(curKey,data){
        //return data[item];
    };

    format.checkType = function(data){
        for(key in data){

            switch (mapping.judgeObject(data[key])){
                case 'Array' : break;
                case 'Object' : format.getAsynData(data[key]); break;
                case 'NAN':format.getCurVal(data);break;
            }

        }
    };

    format.getCurVal = function(data){
        for(key in data){
            //$key.attr(key)
            if(key == format.curKey){
                format.curVal = data[key];
            }
        }
    };

    format.init = function(data){
        $key = $('[key]');
        $.each($key,function(index,item){
            format.curVal = null;
            format.curKey = $(this).attr('key').split('.');
            format.transfrom($(this),data);
        });
    };

    format.transfrom = function(_this,data){
        if(!format.curKey)
            return;

        format.transfromArray = format.curKey[0].split('|');
        if(format.transfromArray.length>1){
            format.transfromPrefix_param = $.trim(format.transfromArray[0]).split(' ');
            format.curKey[0] = $.trim(format.transfromArray[1]);
        }
        format.getAsynData(data);
        if(format.transfromPrefix_param){
            format.transfromPrefix = format.transfromPrefix_param[0];
            format.transfromPrefix_param.splice(0,1);
            format.transfromParam = format.transfromPrefix_param[0];

            switch(format.transfromPrefix){
                case '$time' :
                    var param ='';
                    $.each(format.transfromPrefix_param,function(index,item){
                        param += ' '+item;
                    });
                    format.time_transfrom(format.curVal,param);break;
                case '$currency' :
                    format.currency_transfrom(format.curVal,format.transfromPrefix_param);break;
            }
        }
        format.transfromPrefix = null;
        if(format.curVal)
            _this.html(format.curVal);

    };

    format.time_transfrom = function(dateObj,format){
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
        format.curVal = format;

        return format.curVal;
    };

    format.currency_transfrom = function(data,array){
        if(array.length>0){
            var tem = new Number(data);
            data = tem.toFixed(array[0]);
        }
        if(array.length>1){
            data = array[1]+data;
        }
        format.curVal = data;
        return format.curVal;
    };

    format.binding = function(data){
        format.init(data);
    };
});

