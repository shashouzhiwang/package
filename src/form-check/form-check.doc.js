/**
 * @description 表单校验使用demo
 * @param {html} required HTML中input的属性，表示必填项
 * @param {html} pattern required HTML中input的属性，表示要校验使用的正则表达式
 */

function demo_form_check_demo(required,pattern){
    //<form name="test">
    //    <input type="text" required value="22" pattern="" />
    //    <input type="text"  value="" pattern="^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$" />
    //    <input type="text" required pattern="" />
    //</form>
    //<div onclick="submit()">提交</div>

    function submit(){
        formCheck.check($('form'));
    }

}