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
            vaild = singleInput($(this));
            if(vaild)
            restoreInput($curForm);
        });
        return vaild;
    }

    function singleInput(input){
        var inputVaild = true;
        if(typeof(input.attr("required"))!="undefined" && !input.val()){
            input.addClass('invaild');
            inputVaild = false;
        }
        if(typeof(input.attr('pattern')) != "undefined"){
            if(input.attr('pattern')){
                var myreg = eval("/"+input.attr('pattern')+"/");
                if(!myreg.test(input.val() || input.val().length == 0)){
                    input.addClass('invaild');
                    inputVaild = false;
                }
            }
        }
        return inputVaild;
    }

    function restoreInput($curForm){
        var $input = $curForm.find('input');
        $.each($input,function(index,item){
            $(this).removeClass('invaild');
        })
    }

    function init($curForm){
        var $input = $curForm.find('input');
        $.each($input,function(index,item){
            $(this).on('focus',function(){
                $(this).removeClass('invaild');
            });
        });
        $.each($input,function(index,item){
            $(this).on('blur',function(){
                if(singleInput($(this))){
                    $(this).removeClass('invaild');
                }else{
                    $(this).addClass('invaild');
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
