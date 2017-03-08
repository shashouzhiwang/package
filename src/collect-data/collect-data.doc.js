/**
 *
 * @description 向HTML页面上收集数据生成json使用demo
 *
 * @return {json}     返回生成好的json
 */

function demo_collect_data(){
    //<div>
    //    <div collect="test.name">sss</div>
    //    <div collect="collect.name">ccc</div>
    //    <div collect="collect.lang.test">vvv</div>
    //</div>

    var test = {};
    collect.collectData('collect',test)
}