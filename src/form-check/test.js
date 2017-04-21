/**
 * Created by Loki.Luo on 2017/3/31.
 */
requirejs(['../require.config','../main'],function(requireconfig){
    requirejs(['jquery','layer'],function($,layer){
        requirejs(['formCheck'],function(formCheck){

            $(document).on('click','#submit',function(){
                formCheck.check($('form'));
            })


        })
    })

});