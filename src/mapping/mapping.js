/**
 * Created by Loki.Luo on 2017/3/2.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('mapping',['exports','asynLoad','config'], factory);
    } else {
        factory(window['mapping'] = {},asynLoad,config);
    }
}(function(koExports,asynLoad,config) {
    var mapping = typeof koExports !== 'undefined' ? koExports : {};
    mapping.matchCode = function (lookupTypeArray,needMatchData,cb){
        return asynLoad.ajax({
            //"url": "../test-data/code.json",
            type:"GET",
            "Content-Type":'application/json',
            dataType:'json',
            forbidBindingKey:true,
            "url": config.mappingUrl+lookupTypeArray,
            "data": {
            },
            success:function(data){
                if(data.status != 'SUCCESS'){
                    return;
                }
                if(!data.data){
                }
                cb(mapping.replaceCode(lookupTypeArray,data.data,needMatchData));
            }
        });
    };

    mapping.replaceCode = function(lookupType,codeArray,needMatchData){
        if(mapping.judgeObject(needMatchData) == 'Array'){
            $.each(needMatchData,function(index,item){
                traverseNeedMatch(lookupType,codeArray,item);
            })
        }else{
            if(mapping.judgeObject(needMatchData) == 'Object'){
                for(var key in needMatchData){
                    traverseNeedMatch(lookupType,codeArray,needMatchData[key]);
                }
            }

        }
        return needMatchData;
    };

    mapping.judgeObject = function(needMatchData){
        if(typeof(needMatchData) == 'object'){
            if(typeof needMatchData.length == 'number'){
                return 'Array';
            }else{
                return "Object";
            }
        }else{
            return "NAN";
        }
    }

    /**
     *
     */
    function traverseNeedMatch(lookupType,codeArray,needMatchData){
        if(mapping.judgeObject(needMatchData) == 'Array'){
            mapping.replaceCode(lookupType,codeArray,needMatchData);
        }else{
            traverseBacInfo(lookupType,needMatchData,codeArray);
        }
    }

    /**
     * @param lookupType
     *
     * @param json
     *      要进行匹配的json
     * @param codeArray
     *      bacInfo 资源键值对
     */
    function traverseBacInfo(lookupType,json,codeArray){
        for(key in json){
            if(mapping.judgeObject(json[key]) != 'NAN'){
                mapping.replaceCode(lookupType,codeArray,json[key]);
            }
            if(key == lookupType){
                $.each(codeArray,function(i,obj){
                    if(obj.code == json[key]){
                        json[lookupType+'Name'] = obj.name;
                        return false;
                    }
                })
            }
        }
    }
});

