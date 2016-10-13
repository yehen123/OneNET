<template>
    <iheader></iheader>
    <inav :path="url"></inav>
    <imenu></imenu>
    <div class="main">
        <itab></itab>
    </div>
    <div class="menu">
        <!--<dl>-->
            <!--<dd><a href="/">主页</a></dd>-->
        <!--</dl>-->
        <dl>
            <dd class="showing">
	            <a>快速入口</a>
	            <i clicked="false" class="icon-angle-down toggleLogo"></i>
            </dd>
            <dt>
                <a linkType="1" href="http://admin.onenet.heclouds.com" target="_Blank">大数据作战室</a>
            </dt>
        </dl>
    </div>
</template>
<script>
    import Lib from 'assets/Lib.js'
    import iheader from 'components/header'
    import inav from 'components/nav'
    import imenu from 'components/menu'
    import itab from 'components/tab'
    export default {
      data() {
        return {
            url:'/home'
        }
      },
      components: {
        iheader,
        inav,
        imenu,
        itab
      },
      ready() {
      },
      methods: {
      }
    }
</script>
<style>
	.main {
	    position: absolute;
        top: 109px;
        left: 200px;
        right: 0;
        bottom: 0;
        padding: 30px 40px;
        background-color: #e9f0f4;
        overflow-y: auto;
	}
</style>