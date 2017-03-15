/**
 * @description 生成页面导航条demo
 * @param {json} pageData 后台获取的页码信息  totalRows 总共条数  defaultSize  默认每页的条数   pageSize 总共页数
 * @param {string} showNum 每次可以操作页的数量
 */

function pageNav_demo(pageData,showNum){

//<div id="page"></div>
    var pageData = {
        totalRows:16,
        defaultSize:10,
        pageSize:16

    };
    new page({
        warp:$('#page'),
        data:pageData,
        showNum:5,
        callBack:function(index){
            alert(index);
        }
    });
}