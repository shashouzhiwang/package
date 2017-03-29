/**
 * Created by Loki.Luo on 2017/3/2.
 */
var formCheck ={};
(function(context){

    //function traverseForm($form){
    //    $.each($form,function(index,item){
    //        checkInput($(this));
    //    })
    //}

    function checkInput($curForm){
        var $input = $curForm.find('input');
        var vaild = true;
        $.each($input,function(index,item){
            var tem = singleInput($(this));
            restoreInput(tem,$(this));
            if(!tem){
                vaild = false;
            }
        });
        return vaild;
    }

    //校验函数
    function singleInput(input){
        var inputVaild = true;
        if(typeof(input.attr("required"))!="undefined" ){
            if(!input.val() || input.val() == input.attr('data-invaildTip')){
                input.addClass('invaild');
                inputVaild = false;
            }
        }
        if(typeof(input.attr('pattern')) != "undefined"){
            if(input.attr('pattern')){
                var myreg = eval("/"+input.attr('pattern')+"/");
                if(!myreg.test(input.val()) && input.val().length != 0){
                    input.addClass('invaild');
                    inputVaild = false;
                }
            }
        }
        if(!inputVaild)
            showInvaild(input);
        return inputVaild;
    }

    function showInvaild(input){
        if(input.val() == input.attr('data-invaildTip'))
            return;
        input.attr('data-cache',input.val());
        input.val(input.attr('data-invaildTip'));
    }

    function showVaild(input){
        if(input.attr('data-cache'))
        input.val(input.attr('data-cache'));
        else{
            input.val('');
        }
    }

    function cacheVal(input){
        input.attr('data-cache',input.val());
    }

//转变为校验通过状态
    function restoreInput(vaild,$input){
       // var $input = $curForm.find('input');
       //  $.each($input,function(index,item){
       //      $(this).removeClass('invaild');
       //  })
        vaild ? $input.removeClass('invaild') : $input.addClass('invaild');
    }
//失去焦点是校验
    function init($curForm){
        var $input = $curForm.find('input');
        $.each($input,function(index,item){
            if($(this).attr('drop'))
                return;
            $(this).unbind('focus');
            $(this).on('focus',function(){
                $(this).removeClass('invaild');
                showVaild($(this));
            });
        });
        $.each($input,function(index,item){
            if($(this).attr('drop'))
                return;
            $(this).unbind('blur');
            $(this).on('blur',function(){
                if(singleInput($(this))){
                    $(this).removeClass('invaild');
                    cacheVal($(this));
                }else{
                    $(this).addClass('invaild');
                    showInvaild($(this));
                }
            });
        })
    }

    context.check = function($form){
        if($form.length<1){
            return;
        }
        init($form);
        //traverseForm($form);
         return checkInput($form);
    }
})(formCheck);
