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
        showNum:5, //一次显示多少个页面按钮
        style:2,  //UI风格   默认为2
        callBack:function(index){
            alert(index);
        }
    });


    // 重新加载后或者查询数据后更新该导航时使用该函数
    page.refresh({
        totalRows:160,
        defaultSize:10,
        pageSize:16
    });
}