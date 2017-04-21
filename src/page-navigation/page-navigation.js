/**
 * Created by Loki.Luo on 2017/3/7.
 */
!function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define('page',['exports'], factory);
    } else {
        factory(window['page']=function(data){
            this.init(data);
        });

    }
}(function(koExports) {
    var page = typeof koExports !== 'undefined' ? koExports : function (data) {
            this.init(data)
        };
    var tem = function(data) {
        this.init(data);
    }
    tem.prototype = page.prototype = {
    init:function(data){
        var self = this;
        this.construct(data);
        this.renderDOM();
    },
    construct: function (data){
        this.default = {
            showNum:5,
            startPage:1,
            curPage:1,
            style:2,
            beforeCallBack:function(index){
                return true;
            }
        };
        this.default['endPage'] = this.default.showNum;
        this.default = $.extend(this.default,data);
    },
    renderDOM:function(){
        var pre = this.default.style == 1 ? "<span class='iconfont icon-chevronleft page-controller'></span>" : "<span class='page-controller'>上一页</span>";
        var next = this.default.style == 1 ? "<span class='iconfont icon-you page-controller'></span>" : "<span class='page-controller'>下一页</span>";
        var skin = this.default.style == 1 ? 'skin' : 'pageNav';
        var str = "<nav class="+skin+">"+
            "<ul>"+
            "<li>"+
            "<a>"+pre+"</a>"+
            "</li>"+

            "<li>"+
            "<a>"+next+"</a>"+
            "</li>"+
            "</ul>"+
            "<div class='description'>"+
            "<div class='index'>第 <input class='index' type='text' value="+this.default.curPage+" /> 页</div>"+
            "<div class='totalPage'>共<span class='num'>"+this.default.data.totalRows+"</span>条</div>" +
            "<div class='prePage'>，每页显示<span class='num'>"+this.default.data.defaultSize+"</span>条</div>"+
            "</div>"+
            "</nav>";
        // this.default.warp.empty();
        this.default.warp.html(str);
        this.$li_first = this.default.warp.find('li').first();
        this.$li_last = this.default.warp.find('li').last();
        this.$input = this.default.warp.find('.index');
        if(this.default.data.pageSize>1){
            this.$li_last.addClass('active');
        }
        this.buildPageList();
        this.eventBind();
    },
    refresh:function(data){
        this.default = $.extend(this.default,{data:data});
        this.default['endPage'] = this.default.showNum;
        this.default.warp.empty();
        this.renderDOM();
    },
    eventBind:function(){
        var self = this;
        this.default.warp.unbind();
        this.default.warp.on('click','li',function(e){
            if($(this).index() == 0){
                self.prePage();
            }else{
                if($(this).index() == self.default.warp.find('li').length - 1){
                    self.nextPage();
                }else{
                    if(parseInt($(this).find('a').html()) == self.default.curPage)
                        return;
                    if(!self.default.beforeCallBack($(this).find('a').html()))
                        return;
                    self.indexPage($(this).find('a').html());
                }
            }
        });
        this.$input.unbind();
        this.$input.on('keyup',function(e){
            if(e.which == 13){
                if($(this).val() == '')
                    return;
                var val = parseInt($(this).val());
                self.$input.blur();
                if(val == self.default.curPage || val > self.default.data.pageSize || val < 1)
                    return;
                if(!self.default.beforeCallBack(self.default.curPage))  {
                    $(this).val(self.default.curPage);
                    return;
                }
                self.indexPage(val);
            }
        })
    },
    buildPageList:function(startPage){
        startPage = startPage || this.default.startPage;
        this.default.startPage = startPage;
        this.default.endPage = this.default.data.pageSize > this.default.endPage ? this.default.endPage : this.default.data.pageSize;
        var str='';
        for(var i=startPage;i<=this.default.endPage;i++){
            if(i == this.default.curPage)
                str += "<li class='active'><a>"+i+"</a></li>";
            else
                str += "<li><a>"+i+"</a></li>";
        }
        this.default.warp.find('li').not(this.$li_first).not(this.default.warp.find('li').last()).remove();
        this.$li_first.after(str);
    },
    prePage:function(){
        if(this.default.curPage<=1){
            return;
        }
        if(!this.default.beforeCallBack(this.default.curPage))
            return;
        this.indexPage(parseInt(this.default.curPage)-1);
    },
    nextPage:function(){
        if(this.default.curPage>=this.default.data.pageSize){
            return;
        }
        if(!this.default.beforeCallBack(this.default.curPage))
            return;
        this.indexPage(parseInt(this.default.curPage)+1);
    },
    indexPage:function(num){
        this.default.curPage = num;
        if(num<=this.default.data.pageSize && (this.default.endPage-num)<Math.floor(this.default.showNum/2)){
            var starPage = num-Math.floor(this.default.showNum/2) >=1 ? num-Math.floor(this.default.showNum/2) :1;
            this.default.endPage  = num-Math.floor(this.default.showNum/2) + this.default.showNum - 1;
            this.buildPageList(starPage);
        }
        if(num >=1 && (num - this.default.startPage)<Math.floor(this.default.showNum/2)){
            var startPage = num-Math.floor(this.default.showNum/2) >= 1 ? num-Math.floor(this.default.showNum/2) :1;
            this.default.endPage  = startPage + this.default.showNum - 1;
            this.buildPageList(startPage);
        }
        this.activeCurPage(num);
    },
    activeCurPage:function(num){
        var self = this;
        $.each(this.default.warp.find('li'),function(index,item){
            $(this).removeClass('active');
            if(parseInt($(this).find('a').html()) == num){
                $(this).addClass('active');
                self.$input.val(num);
                self.default.callBack(num);
            }
        });
        if(num<this.default.data.pageSize){
            this.default.warp.find('li').last().addClass('active');
        }
        if(num>1){
            this.default.warp.find('li').first().addClass('active');
        }
    }
};
    if(typeof page !== "function"){
        page.init = tem;
    }

});
