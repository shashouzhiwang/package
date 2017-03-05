/**
 * Created by Loki.Luo on 2017/3/2.
 */
var mapping = {};
(function(context){
    context.matchCode = function (lookupTypeArray,needMatchData,cb){
        return asynLoad.ajax({
            //"url": "../test-data/code.json",
            type:"GET",
            "Content-Type":'application/json',
            dataType:'json',
            forbidBindingKey:true,
            "url": "api/bacInfo/mapping/"+lookupTypeArray,
            "data": {
            },
            success:function(data){
                if(data.status != 'SUCCESS'){
                    return;
                }
                if(!data.data){
                }
                cb(context.replaceCode(lookupTypeArray,data.data,needMatchData));
            }
        });
    };

    context.replaceCode = function(lookupType,codeArray,needMatchData){
        if(context.judgeObject(needMatchData) == 'Array'){
            $.each(needMatchData,function(index,item){
                traverseNeedMatch(lookupType,codeArray,item);
            })
        }else{
            if(context.judgeObject(needMatchData) == 'Object'){
                for(var key in needMatchData){
                    traverseNeedMatch(lookupType,codeArray,needMatchData[key]);
                }
            }

        }
        return needMatchData;
    };

    context.judgeObject = function(needMatchData){
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
        if(context.judgeObject(needMatchData) == 'Array'){
            context.replaceCode(lookupType,codeArray,needMatchData);
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
            if(context.judgeObject(json[key]) != 'NAN'){
                context.replaceCode(lookupType,codeArray,json[key]);
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


})(mapping);
