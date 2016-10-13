<template>
  <div class="create_user_box">
    <div class="title">
      <div class="circle"></div>
      修改账号
    </div>
    <form>
      <div class="list">
        <div class="list_title"><span>*</span>账号名称：</div>
        <input type="text" id="userName" placeholder="小于32个字符，英文+数字" value={{userMsg.username}}>
      </div>
      <div class="list">
        <div class="list_title"><span>*</span>密码：</div>
        <input type="password" id="psw" placeholder="8~16位，字母、数字、特殊字符组合" value={{nonePsw}} disabled="disabled">
        <input type="button" value="重置" id="reset" @click="resetFun">
        <div class="pst_prompt" id="pst_prompt">自动填充的密码为<span id="show_psw">{{nonePsw}}</span>,提交后更新密码</div>
      </div>
      <div class="list">
        <div class="list_title"><span>*</span>启用状态：</div>
        <div class="status">
        </div>
        <rd-radio-group :radios=radios></rd-radio-group>
      </div>
      <div class="list">
        <div class="list_title"><span>*</span>联系人：</div>
        <input type="text" id="contactName" placeholder="小于16个字符，中文" value={{userMsg.detail.contacts}}>
      </div>
      <div class="list">
        <div class="list_title"><span>*</span>联系方式：</div>
        <input type="text" id="contactWay" placeholder="手机或邮箱" value={{userMsg.detail.contact_info}}>
      </div>
      <input type="button" value="提交" @click="proving">
      <input type="button" value="取消" class="cancel" v-link="{path:'/pagingAccount'}">
    </form>
  </div>
  <router-view></router-view>
</template>
<script>
  import {rdSelect, rdRadioGroup} from 'radon-ui'

  export default {
    data: function () {
      return {
        radios: [{
          checked: true,
          value: '启用'
        }, {
          checked: false,
          value: '禁用'
        }],
        userMsg: '',
        psw: '',
        nonePsw:'111111111111'
      }
    },
    components: {
      rdSelect,
      rdRadioGroup
    },
    created: function () {
      //获取params的参数ID
      var $this = this;
      var currData = JSON.parse(this.$route.params.currData);
      this.userMsg = currData;
      if (currData.status == 0) {
        this.radios[0].checked = true;
        this.radios[1].checked = false;
      } else if (currData.status == -1) {
        this.radios[1].checked = true;
        this.radios[0].checked = false;
      }

      $.ajax({
        type: "POST",
        url: "/account/getrandpass",
        data: {
          id: currData.id
        },
        dataType: "json",
        success: function (res) {
          if (res.code == 0) {
            $this.$set("psw", res.data);
          } else {
            console.log(res.msg);
          }
        }
      });
    },
    ready: function () {
    },
    methods: {
      successAction () {
        this.$Notification.success('提交成功', '', 5000)
      },
      errorAction (str) {
        this.$Notification.warning(str, '', 5000);
      },
      $(id){
        return document.getElementById(id);
      },
      proving: function () {
        var uStr = /(^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$)|(^[a-zA-Z]+$)/;
        var cStr = /^[\u2E80-\u9FFF]+$/;
        var pStr = /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
        var userName = this.$("userName").value;
        var contactName = this.$("contactName").value;
        var psw = this.$("psw").value;
        var status = null;
        var contactWay = this.$("contactWay").value;
        var $this = this;
        var id = this.userMsg.id;
        this.$data.radios.forEach(function (val) {
          if (val.checked == true) {
            if (val.value == "启用") {
              status = 0;
            } else if (val.value == "禁用") {
              status = -1;
            }
          }
        });
        if (!uStr.test(userName) || userName.length > 32) {
          this.errorAction("'账号名称'不符合规则");
          return false;
        }
        if (!cStr.test(contactName) || contactName.length > 16) {
          this.errorAction("'联系人'不符合规则");
          return false;
        }
        if (!pStr.test(contactWay)) {
          this.errorAction("'联系方式'不符合规则");
          return false;
        }
        if(psw=="111111111111"){
          var datas={
            id: id,
            username: userName,
            status: status,
            contacts: contactName,
            contact_info: contactWay,
            group_id: 1
          };
        }else{
          var datas={
            id: id,
            username: userName,
            password: psw,
            status: status,
            contacts: contactName,
            contact_info: contactWay,
            group_id: 1
          };
        }
        $.ajax({
          url: '/account/edit',
          type: 'post',
          dataType: 'json',
          data: datas,
          success: function (res) {
            var key = Object.keys(res.msg);
            if (res.code == 0) {
              $this.$Notification.success(res.msg + "  1秒后返回！", '', 1000);
              setTimeout(function () {
                $this.$route.router.go({path: '/pagingAccount'});
              }, 1000);

            } else if (res.code == 500) {
              if (isNaN(key[0])) {
                $this.$Notification.warning(res.msg[key[0]], '', 5000);
              } else {
                $this.$Notification.warning(res.msg, '', 5000);
              }

            }
          },
          error: function (res) {
            alert(res)
          }
        })
      },
      resetFun: function () {
        var psw = this.$data.psw;
        this.$data.nonePsw=psw;
        document.getElementById("psw").value = this.$data.psw;
        document.getElementById("pst_prompt").style.display="inline-block";
        document.getElementById("reset").style.display="none";
      }
    }
  }

</script>
<style scoped>
  .create_user_box {
    width: 100%;
    overflow: hidden;
  }

  .create_user_box .title {
    width: 100%;
    height: 70px;
    line-height: 70px;
    color: #333333;
    font-size: 14px;
  }

  .create_user_box .circle {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: #333333;
    float: left;
    margin-right: 10px;
    margin-top: 33px;
    margin-left: 20px;
  }

  .create_user_box form {
    padding-left: 60px;
    color: #666666;
    font-size: 14px;
  }

  .create_user_box .list {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
  }

  .create_user_box .list input[type="text"],
  .create_user_box .list input[type="password"] {
    width: 280px;
    height: 30px;
    border: 1px solid #dcdee3;
    border-radius: 4px;
    text-indent: 10px;
    float: left;
  }

  .create_user_box .list .rd-select-container {
    width: 280px;
    float: left;
  }

  .create_user_box .list .list_title {
    float: left;
    width: 100px;
    text-align: right;
  }

  .create_user_box .list span {
    color: #ff4931;
    margin-top: 12px;
  }

  .create_user_box .pst_prompt {
    display: none;
    margin-left: 20px;
  }

  .create_user_box .pst_prompt span {
    color: #19bbff;
  }

  .create_user_box input[type="button"] {
    width: 98px;
    height: 28px;
    border: 1px solid #19bbff;
    font-size: 12px;
    color: #fff;
    background-color: #19bbff;
    margin-left: 100px;
    border-radius: 5px;
    outline: none;
  }

  .create_user_box input[value="取消"] {
    color: #19bbff;
    background-color: #FFF;
    margin-left: 20px;
  }

  .create_user_box #reset {
    color: #19bbff;
    background-color: #FFF;
    width: 60px;
    margin-left: 10px;
    line-height: 28px;
  }

  .rd-notification-container {
    left: 50%;
    top: 50%;
    margin-left: -160px;
  }

  .rd-notification {
    background-color: red !important;
  }
</style>
