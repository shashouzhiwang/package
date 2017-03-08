/**
 * @description 类似select2的下拉框封装使用demo
 * @param {object} warp jQuery对象
 * @param {string} submitParam 提交给后台时，input的值对应的字段名
 * @param {string} getListParam 下拉列表显示的字段名
 * @param {json} requireParam 参考asynLoad中参数的传递
 */

function demo_drop_demo(warp,submitParam,getListParam,requireParam){
    //<div id="search"></div>

    new dropDown({
        warp:$('#search'),
        submitParam:'param',
        getListParam:'topicId',
        requireParam:{
            url:'api/bacInfo/mapping/serviceStatus',
            localUrl:'../test-data/topic-list.json',
            loading:false
        }
    });

}