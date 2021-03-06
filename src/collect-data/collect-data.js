/**
 * Created by Loki.Luo on 2017/3/5.
 */
var collect = {};
(function(context){
    context.collectData = function (name,json){
        $('['+[name]+']').each(function(){
            var attr = $(this).attr(name).split('.');
            if($(this).is("input")||$(this).is("textarea"))
            {
                var val = $(this).val();
            }
            else
            {
                var val = $(this).html();
            }
            context.recursive(json,attr,val);
        });
         console.log(json);
        return json;
    };
//向页面收集数据
    context.recursive = function(test, attr, val) {
        if (attr.length == 1) {
            //如果只有一级的情况
            if (test[attr[0]]) {
                test[attr[0]]['default'] = val;
            } else {
                test[attr[0]] = val;
            }
            return;
        }
        if (test[attr[0]]) {
            var tem = attr[0];
            attr.splice(0, 1);
            if (attr.length > 1) {
                context.recursive(test[tem], attr, val);
            } else {
                //数组的最后一个值在json中是一个存在的对象，故此在json中只能重命名
                if (test[tem][attr[0]]) {
                    test[tem][attr[0]]['default'] = val;
                } else {
                    test[tem][attr[0]] = val;
                }
            }
        } else {
            //不存在的情况只需一级一级的新建对象
            test[attr[0]] = {};
            var tem2 = attr[0];
            attr.splice(0, 1);
            if (attr.length > 1) {
                context.recursive(test[tem2], attr, val);
            } else {
                test[tem2][attr[0]] = val;
            }
        }
    };
})(collect);