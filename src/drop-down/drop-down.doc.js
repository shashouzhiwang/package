/**
 * @description 类似select2的下拉框封装使用demo
 * @param {object} warp jQuery对象
 * @param {string} submitParam 提交给后台做模糊查询的字段名，input的值对应的字段名   不传时默认为 param
 * @param {string} data 提交给后台做模糊的其他参数   不传时默认为 {}
 * @param {string} getListParam 下拉列表需要显示的字段名   不传时默认为 name
 * @param {string} getListCode 下拉列表需要绑定的属性名     不传时默认为 code
 * @param {string} required 改input是否是必填输入框   不传时默认为false
 * @param {string} invaildTip 校验未通过时的提示   不传时默认为   校验未通过
 * @param {json} requireParam 参考asynLoad中参数的传递      必传字段
 */

function demo_drop_demo(warp,submitParam,getListParam,requireParam){
    //<div id="search"></div>

    new dropDown({
        warp:$('#search'),
        submitParam:'param',
        data:{},
        getListParam:'name',
        getListCode:"code",
        invaildTip:"邮箱不能为空",
        required:true,
        requireParam:{
            url:'api/bacInfo/mapping/serviceStatus',
            localUrl:'../test-data/topic-list.json',
            loading:false
        }
    });

}