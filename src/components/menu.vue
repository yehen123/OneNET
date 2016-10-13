<template>
    <slot name="menu"></slot>
    <!--<div class="menu">
        <dl>
        	<dd><a href="/">主页</a></dd>
        </dl>
        <dl>
            <dd><a>快速入口</a></dd>
        	<dt>
        	    <a href="/foo">大数据作战室</a>
            	<a href="/bar">运维系统</a>
            	<a href="/userlist">轻应用管理平台</a>
        	</dt>
        </dl>
        <dl v-for="m in menu">
            <dd><a>{{m.title}}</a></dd>
            <dt>
                <a class="abtn" v-for="l in m.list" href="{{l.url}}">{{l.name}}</a>
            </dt>
        </dl>
    </div>-->
</template>
<script>
    import Lib from 'assets/Lib.js'
    import Vue from 'vue'
	export default {
        data() {
            return {
                showing: true
//              menu: [
//              {
//                  title: '数据统计',
//                  list: [
//                      {name: '报表查询', url: '/index'},
//                  ]
//              }    
//              ]
            }
        },
        components: {
        },
        ready() {
            var _this = this;
            $(".menu").on('click', 'a', function(e) {
                if(!this.hasAttribute('href')) {
                    return;
                }
	            var linktype = $(this).attr("linkType");
	            if(linktype != 1) {
		            e.stopPropagation();
		            e.preventDefault();
	                const name = $(this).text();
		            const url = $(this).attr('href');
		            $(".menu .active").removeClass('active');
		            $(this).addClass('active');
		            Lib.M.openWin(url, name);
	            }
            })
            $(".menu").on('click', 'dd', function(e) {
                _this.slide($(this));
	            var toggleItem = $('.toggleLogo'),
		            mode = toggleItem.attr('clicked');
	            if(mode == 'false') {
		            toggleItem.removeClass('icon-angle-down').addClass('icon-angle-right').attr('clicked','true')
	            } else {
	                toggleItem.removeClass('icon-angle-right').addClass('icon-angle-down').attr('clicked','false')
	            }
            })
            this.init();
        },
        methods: {
            init: function() {
//              window.location.replace('#!/');
            },
            slide: function($tar) {
                var $cp = $tar.next('dt');
                if($tar.hasClass('showing')) {
                    $tar.removeClass('showing').next('dt').slideToggle(250);
                } else {
                    $('.menu .showing').removeClass('showing').next('dt').slideToggle(250);
                    $tar.addClass('showing').next('dt').slideToggle(250);
                }
            },
            loadComponent: function(url, component) {
//              router.map({
//                  '/async': {
//                      component: function (resolve) {
//                          require(['./MyComponent.vue'], resolve)
//                      }
//                  }
//              })
            },
            getList: function() {
                
            },
        }
    }
</script>

<style>
    .menu a {
        display: block;
        color: #333;
        text-decoration: none;
    }
	.menu {
	    position: absolute;
	    top: 114px;
	    bottom: 0;
	    width: 200px;
	    border-right: solid 1px #dce1e4;
	    background-color: #f5f9fa;
	}
	.menu dl {
	    margin: 0;
	}
	.menu dt {
	    display: block;
	}
	.menu dd {
		background-color: #fff;
		margin-left: 0;
	    line-height: 50px;
	}
	.menu dd, .menu dt {
	    border-bottom: solid 1px #dce1e4;
	}
	
	.menu dd>a {
		display: inline-block;
	    padding-left: 20px;
	    cursor: pointer;
	}
	.menu dt>a {
	    line-height: 50px;
        padding-left: 30px;
	    font-size: 13px;
	    font-weight: normal;
	    color: #7b7e88;
	    
	}
	.menu dd:hover,
	.menu dd:hover>a,
	.menu dt>a:hover,
	.menu dl .active {
	    color: #19bbff;
	    background-color: #e4e8f3
	}
	.menu i.toggleLogo {
	    float: right;
        line-height: 51px;
        margin-right: 30px;
	}
</style>