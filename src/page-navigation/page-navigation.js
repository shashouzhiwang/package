/**
 * Created by Loki.Luo on 2017/3/7.
 */
(function($,undefined){
    var page = function(data){
        var self = this;
        self.default = {
            showNum:5,
            startPage:1,
            curPage:1
        };
        self.default['endPage'] = self.default.showNum;
        self.default = $.extend(self.default,data);

        this.renderDOM();
    };

    page.prototype = {
        renderDOM:function(){
            var str = "<nav class='pageNav'>"+
                            "<ul>"+
                                "<li>"+
                                    "<a>"+
                                        "<span class='iconfont icon-chevronleft page-controller'></span>"+
                                    "</a>"+
                                "</li>"+

                                "<li>"+
                                    "<a>"+
                                        "<span class='iconfont icon-you page-controller'></span>"+
                                    "</a>"+
                                "</li>"+
                            "</ul>"+
                            "当前第<input class='index' type='text' value="+this.default.curPage+" />页"+
                            "<span>共有<span>"+this.default.data.totalRows+"</span>条，每页显示<span>"+this.default.data.defaultSize+"</span>条</span>"+
                        "</nav>";
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
        eventBind:function(){
            var self = this;
            this.default.warp.on('click','li',function(e){
                if($(this).index() == 0){
                    self.prePage();
                }else{
                    if($(this).index() == self.default.warp.find('li').length - 1){
                        self.nextPage();
                    }else{
                        self.indexPage($(this).find('a').html());
                    }
                }
            });
            this.$input.on('keyup',function(e){
                if(e.which == 13){
                    var val = parseInt($(this).val());
                    if(val == self.default.curPage || val > self.default.data.pageSize || val < 1)
                    return;
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
            this.indexPage(parseInt(this.default.curPage)-1);
        },
        nextPage:function(){
            if(this.default.curPage>=this.default.data.pageSize){
                return;
            }
            this.indexPage(parseInt(this.default.curPage)+1);
        },
        indexPage:function(num){
            this.activeCurPage(num);
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
        },
        activeCurPage:function(num){
            var self = this;
            $.each(this.default.warp.find('li'),function(index,item){
                $(this).removeClass('active');
                if($(this).find('a').html() == num){
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

    window['page'] = page;
})($);