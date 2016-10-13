<template>
    <div class="login">
    	<div class="title">
    		<h2><img src="img/logo.png">{{title}}</h2>
    	</div>
    	<form class="container">
    		<div class="form-group">
    			<input type="text" class="account form-control" required v-model="login.account" />
    		</div>
    		<div class="form-group">
    			<input type="password" class="password form-control" required v-model="login.password" />
    		</div>
			<input class="btn btn-default" type="button" value="登录" @click="submit" />
    	</form>
    </div>
</template>
<script>
//  import './login.css'
//  import cc from './a/b'
	import Lib from 'assets/Lib.js'
    
    export default {
      data() {
        return {
            list:[0,1,2,3,4,5,6],
            title: 'OneNET管理系统',
            login: {
                account: '',
                password: ''
            }
        }
      },
      components: {
      },
      ready() {
        let _this = this;
        document.onkeypress = function(e) {
            if(e.keyCode == 13) {
                _this.submit();
            }
        }
      },
      methods: {
        submit: function() {
            if(this.login.account == '' || this.login.password == '') {
                this.$Notification.create('warning', '请填写用户名和密码', '', '5000');
                return;
            }
            let _this = this;
            $.ajax({
                url: '/login',
                type: 'post',
                dataType: 'json',
                data: {
                    name: _this.login.account,
                    pass: _this.login.password
                },
                success: function(res) {
                    console.log(res)
                    if(res.code == 0 ) {
                        window.location.href = "/home";
                    } else {
                        _this.$Notification.create('failed', ''+res.msg, '', '5000');
                    }
                },
                error: function(res) {
                    console.log(res)
                }
            })
        }
      }
    }
</script>
<style scoped>

.login {
    position: absolute;
    width: 100%;
    height: 322px;
    top: 25%;
}
h2 {
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    color: #fff;
    line-height: 40px;
}
h2 img {
    margin-right: 10px;
}
.container {
    width: 400px;
    height: 250px;
    margin: auto;
    padding: 20px;
    padding-top: 30px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
}
.btn {
    display: block;
    width: 360px;
    height: 40px;
    margin: 40px auto 0;
    background-color: #19bbff;
    outline: none;
    border: none;
    color: #fff;
}
.btn:hover {
    background-color: #41d8ff;
    color: #fff;
}
.btn:active {
    background-color: #0aa2f1;
    color: #fff;
}
/*.btn:focus {
    background-color: #19bbff;
    color: #fff;
}*/
.account,
.password {
    padding-left: 48px;
    
}
.account {background: url(img/longin_01.png) 15px center no-repeat;}
.password {background: url(img/longin_02.png) 15px center no-repeat;}

</style>