///**
// * Created by Loki.Luo on 2017/3/2.
// */
//var mapping = {};
//(function(context){
//    context.init =function(){
//        alert();
//    }
//
//    function matchCode(lookupTypeArray,needMatchData){
//        return commonServer.loadAjax({
//            "localhostUrl": "",
//            "url": "api/bacInfo/mapping/"+lookupTypeArray,
//            "header":{},
//            "data": {},
//            "loading":true
//        }).then(function (data) {
//            if(data.status != 'SUCCESS'){
//                return;
//            }
//            if(!data.data){
//
//            }
//            return replaceCode(lookupTypeArray,data.data,needMatchData);
//        });
//    }
//
//    function replaceCode(lookupType,codeArray,needMatchData){
//        if(judgeObject(needMatchData) == 'Array'){
//            $.each(needMatchData,function(index,item){
//                if(judgeObject(item) == 'Array'){
//                    replaceCode(item,codeArray,item);
//                }else{
//                    traverseBacInfo(lookupType,item,codeArray);
//                }
//            })
//        }else{
//            traverseBacInfo(lookupType,needMatchData,codeArray);
//        }
//        return needMatchData;
//    }
//
//    function judgeObject(needMatchData){
//        if(typeof(needMatchData) == 'object'){
//            if(typeof needMatchData.length == 'number'){
//                return 'Array';
//            }else{
//                return "Object";
//            }
//        }else{
//            return "NAN";
//        }
//    }
//
//    /**
//     * @param lookupType
//     *
//     * @param json
//     *      要进行匹配的json
//     * @param codeArray
//     *      bacInfo 资源键值对
//     */
//    function traverseBacInfo(lookupType,json,codeArray){
//        for(key in json){
//            if(key == lookupType){
//                $.each(codeArray,function(i,obj){
//                    if(obj.code == json[key]){
//                        json[lookupType+'Name'] = obj.name;
//                        return false;
//                    }
//                })
//            }
//        }
//    }
//
//
//})(mapping);
