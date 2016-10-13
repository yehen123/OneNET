<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/img/logo.png"/>
            <h2>OneNet管理系统</h2>
        </div>
        <!--<div class="search">-->
            <!--<input type="text" class="input">-->
            <!--<button type="button" class="icon-search iconfont"></button>-->
        <!--</div>-->
        <div class="user">
            <img src="../assets/img/user_03.png" class="avatar" alt="">
            <span class="username">{{userName}}</span>
            <i class="icon-chevron-down" @click="showuser"></i>
            <ul class="usermenu">
            	<li><a @click="changePasw" href="javascript:void(0)">修改密码</a></li>
            	<li><a @click="logout" href="javascript:void(0)">退出帐号</a></li>
            </ul>
        </div>
    </div>
	<!--<div id="passModal">
		<router-view></router-view>
		<rd-modal></rd-modal>
	</div>
	<rd-notification></rd-notification>-->
</template>
<script>

	import { RadonInstall } from 'radon-ui'
	import Vue from 'vue'
	Vue.use(RadonInstall, {
		Modal: true,
		Notification: true
	});
	export default {
      data() {
          return {
              userName: '',
          }
      },
      components: {
      },
      ready() {
          document.onclick = () => $('.usermenu').hide();
          this.getUserInfo();
      },
      methods: {
        getUserInfo: function() {
            let _this = this;
            $.ajax({
                url: "/accountinfo",
                success: function(res){
                    if(res.code == 0) {
                        _this.userName = res.data.username
                    } else if (res.code == 500) {
                        console.log(res.msg)
                    }
                }

          });
        },
        showuser: function(e) {
            e.stopPropagation();
            $('.usermenu').toggle();
        },
        logout: function() {
            window.location.href = "/logout";
//          $.ajax({
//              url: '/logout',
//              success: function(res) {
//                  if(res.code == 0) {
//                      window.location.href = "/logout"
//                  }
//              }
//          })
        },
        changePasw: function () {
	        var _this = this;
	        this.$Modal.confirmWithHTML('修改密码', '	<div class="passw-form"><label>初始密码：<input class="old-passw" type="password" v-model="oldPass"></label><label class="old-inspection hide"></label>' +
			        '<label>新设密码：<input class="new-passw" type="password"></label><label class="new-inspection hide"></label><label>确认密码：<input class="confirm-passw" type="password"></label><label class="confirm-inspection hide"></label></div>' +
	        '', function () {
		        var oldpass = $('.old-passw').val(),
			        newpass = $('.new-passw').val(),
			        passconfirm = $('.confirm-passw').val();
		        var paras = {
			        "opass": oldpass,
			        "npass": newpass,
			        "npass_confirm": passconfirm
		        };
		        if(oldpass && newpass && passconfirm) {
			        var result;
			        $.ajax({
				        type: "POST",
				        url: "/account/modifypass",
				        data: paras,
				        dataType: "json",
				        async: false,
				        success: function(res){
					        if(res.code == 0) {
						        _this.$Notification.create('success','修改成功','', 2000);
						        result =  true
					        } else if (res.code == 500) {
						        if(res.msg.npass) {
							        _this.$Notification.create('warning','新密码必须为8-16位字母及数组的组合', '', 2000)
						        }
						        if(res.msg.npass_confirm) {
							        _this.$Notification.create('warning','确认密码必须为8-16位字母及数组的组合','', 2000);
						        }
						        if(res.msg.opass) {
							        _this.$Notification.create('warning','旧密码不能为空','', 2000);
						        }
						        if(res.msg == '原密码错误') {
							        _this.$Notification.create('warning','原始密码错误','', 2000);
						        }
						        if(res.msg == '两次密码不一致') {
							        _this.$Notification.create('warning','两次密码不一致', '',2000);
						        }
						        result =  false
					        }
				        }
			        });
			        return result;
		        } else {
			        if(!oldpass) {
				        _this.$Notification.create('warning','旧密码不能为空','', 2000);
			        }
			        if(!newpass) {
				        _this.$Notification.create('warning','新密码不能为空','', 2000);
			        }
			        if(!passconfirm) {
				        _this.$Notification.create('warning','确认密码不能为空','', 2000);
			        }
			        return false
		        }
	        },function () {
	        });
        }
      }
    }
</script>
<style scoped>

	/*修改密码*/
	.hide {
		display: none;
	}

	.header {
	    width: 100%;
	    padding: 15px 0;
	    background-color: #1b2b33;
	}
	.logo {
	    overflow: hidden;
	}
	.logo img {
	    float: left;
	    margin-left: 30px;
	    margin-right: 10px;
	}
	.logo h2 {
	    color: #fff;
	    margin: 0;
	    line-height: 39px;
	}
	.search {
	    float: right;
	    margin-top: -40px;
	    margin-right: 192px;
	}
	.search input {
	    width: 260px;
	    height: 40px;
	    padding: 5px 10px;
	    background-color: #324148;
	    border-radius: 4px;
	    border: none;
	    color: #999;
	}
	.search button {
	    width: 40px;
	    height: 40px;
	    margin-left: 8px;
        vertical-align: bottom;
	    background-color: #19bbff;
	    outline: none;
	    border: none;
	    color: #fff;
	    border-radius: 4px;
	    font-size: 20px;
	}
	.user {
	    position: relative;
	    float: right;
	    height: 100%;
	    margin-top: -40px;
	    margin-right: 30px;
	}
	.user .username {
	    margin-left: 10px;
	    color: #19bbff;
	}
	.user img {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    background-color: #fff;
	    overflow: hidden;
	}
	.user i {
	    margin-left: 10px;
	    color: #fff;
	    cursor: pointer;
	}
	.usermenu {
	    position: absolute;
	    z-index: 99;
	    top: 55px;
	    left: -7px;
	    display: none;
	    width: 120px;
	    padding: 0;
	    border-radius: 4px;
	    background-color: #fff;
	    overflow: hidden;
	}
	.usermenu li a {
	    display: block;
	    line-height: 40px;
	    text-align: center;
	    cursor: pointer;
	    text-decoration: none;
	    color: #333;
	}
	.usermenu li a:hover {
	    background-color: #e4e8f3;
	    color: #19bbff;
	}
</style>