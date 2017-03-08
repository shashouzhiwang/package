/**
 *  @description 向页面显示数据并做数据转换(暂不支持数组)
 * @param key HTML中固定属性
 * @param $time 将该值再做时间转换处理
 * @param $currency 将该值再做货币转换处理-----第一个为保留小数位数
 */


function format_transfrom_demo(key,$time,$currency){

    //<div>
    //    <span key="$time yyyy-MM-dd hh:mm:ss | time"></span>
    //    <div key="data.lang">dd</div>
    //</div>
    //<div key="$currency 2 ￥ | currency"></div>
    //<div key="data.time.test">dd</div>
    //<div key="data.test">dd</div>

    var data = {
                    time:1488525824,
                    currency:"22",
                    data:{
                        lang:"中文",
                        time:{
                            test:"ceshi"
                        },
                        test:"测试"
                    }
                };

    format.binding(data);

}