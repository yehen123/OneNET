<template>
    <div class="inav">
        <ul>
        	<li v-for="el in list" class="{{el.class}}">
                <a href="{{el.url}}">{{el.name}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
	    data()  {
	        return {
	           list: [{name: '首页', url:'/home', class: 'white'},
	            {name: '用户管理', url: '/user', class: 'white'},
	            {name: '平台审核', url: '/review'},
                {name: '平台产品', url: '/product'},
                {name: '统计分析', url: '/report'},
	            {name: '系统设置', url: '/account'}]
	        }
	    },
	    ready() {
	        var _this = this;
	        $('.inav').find('a[href="'+_this.path+'"]').parent().addClass('active');
	    },
	    props: ['path'],
	}
</script>
<style scoped>
    .inav {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 40px;
        background-color: #19bbff;
        box-shadow: 0 0 2px 2px rgba(0,0,0,0.3);
        white-space: nowrap;
    }
    .inav li {
        position: relative;
        z-index: 0;
        display: inline-block;
        width: 56px;
        text-align: center;
        margin-left: 40px;
        line-height: 40px;
        font-weight: bold;
    }
    .inav li.active:after {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        left: 17px;
        top: 32px;
        width: 0;
        height: 0;
        border-left:11px solid transparent;   
        border-right:11px solid transparent;   
        border-bottom:11px solid #c6ccd0;
    }
    .inav li.active:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 2;
        left: 19px;
        top: 35px;
        width: 0;
        height: 0;
        border-left:9px solid transparent;   
        border-right:9px solid transparent;   
        border-bottom:9px solid #e9f0f4;
    }
    .inav li.active.white:before {
        border-bottom-color: #fff;
    }
    .inav li a {
        color: #fff;
    }
</style>