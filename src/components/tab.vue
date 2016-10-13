<template>
    <div class="tab">
    	<!-- Nav tabs -->
        <ul class="itab">
            <li class="active"><a href="/">主页</a></li>
            <!--<li><a href="/bar">Profile<i class="icon-remove iclose"></i></a></li>
            <li><a v-link="{path:'/cus'}">Messages<i class="icon-remove iclose"></i></a></li>
            <li v-for="el in list"><a v-link="{path:'{{el.url}}'}">{{el.url}}<i class="icon-roundclose iconfont iclose"></i></a></li>-->
        </ul>
        <!-- Tab panes -->
        <div class="container-fluid clearfix">
            <router-view></router-view>
        </div>

    </div>
</template>
<script>
	export default {
      data() {
        return {
        }
      },
      components: {
      },
      ready() {
            $(".itab").on('click', 'a', function(e) {
                var $this = $(this);
                $('.itab').find('.active').removeClass('active');
                $this.parent().addClass('active');
                router.go($this.attr('href'));
                return false;
            })
            $(".itab").on('click', '.iclose', e => this.close(e));
            this.response();
            $(window).resize(() => this.response());
      },
      methods: {
        show: function() {
            this.t = 2
        },
        close: function(e) {
            const $this = $(e.target);
            const $li = $this.parents('li');
            e.stopPropagation();
            if($li.hasClass('active')) {
                $li.prev().addClass('active').find('a').click();
            }
            $li.remove();
            return false;
        },
        response: function() {
            let viewHeigh = $(window).height();
            let mHeight = viewHeigh - 205;
            $('.container-fluid').css('height', mHeight);
        }
      }
    }
</script>
<style>
    .tab {
        min-height: 100%;
        padding-top: 4px;
        margin-top: -4px;
        overflow-x: auto;
    }
    .itab i.iclose {
        position: absolute;
        top: 0;
        right: 7px;
        line-height: inherit;
    }
    .iclose:hover {
        color: #19bbff;
    }
    .itab {
        border-radius: 2px;
        padding: 0;
        margin: 0;
        height: 36px;
        line-height: 36px;
        background-color: #dce1e4;
        white-space: nowrap;
    }
    .itab li {
        position: relative;
        padding: 0 30px;
        height: 36px;
        line-height: 36px;
        display: inline-block;
        color: #7a7e89;
        vertical-align: top;
        overflow: hidden;
    }
    .itab li.active {
        position: relative;
        top: -4px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px 4px 0 0;
        background-color: #fff;
    }
    .itab li.active a {
        color: #333;
    }
    .itab li a {
        display: block;
        color: inherit;
        text-decoration: none;
    }
    .container-fluid {
        background-color: #fff;
        overflow-y: auto;
    }
</style>
