/**
 *  @description 带确定按钮的确定提示框.demo
 * @param {string} defaultContent 使用默认templateUrl模板时（此时使用自带的模板，templateUrl当不传），里面的提示内容
 * @param {string} templateUrl 弹框的模板地址
 * @param {json} layer 和layer中的参数一直，除comfireCb和cancelCb以外
 */

function domo_dialog_confirm(defaultContent,templateUrl,layer){

        dialog.confirm({
    //        template:"<div>eeeeee</div>",
            defaultContent:"rrrrrrrrrr",
            templateUrl:"./dialog/dialog.html",
            layer:{
                comfireCb:function(){
                    alert('comfireCb');
                },
                cancel:function(){
                    alert('cancelCb');
                }
            }
    });
}

/**
 * @description 自动消失的msg提示demo
 * @param {string} content 提示的内容
 * @param {number} time 显示的时长
 */

function domo_dialog_msg(content,time){

    dialog.msg({
        content:'加载中..',
        time:9000
    });

    dialog.loading();
    dialog.loadingClose();
}