<template>
    <iheader></iheader>
    <inav :path="url"></inav>
    <imenu></imenu>
    <div class="main">
        <itab></itab>
    </div>
	<div slot="menu" class="menu">
		<dl>
			<dd class="showing">
				<a>用户注册</a>
				<i clicked="false" class="icon-angle-down toggleLogo"></i>
			</dd>
			<dt>
				<a v-link="{ path: '/user' }">用户列表</a>
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
            url:'/user'
        }
      },
      components: {
        iheader,
        inav,
        imenu,
        itab
      },
      ready() {
          this.t = 3;
      },
      methods: {
        show: function() {
            this.t = 2
        }
      }
    }
</script>

<style scoped>
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
