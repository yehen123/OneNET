<template>
	<div class="personal-detail-title">
		<h3 class="personal-detail-content">个人信息</h3>
		<div v-link="{ path: '/user' }" class="back-button">
			<i class="icon-angle-left" aria-hidden="true"></i>
			<span>返回用户列表</span>
		</div>
	</div>

	<!--个人用户-->
    <div v-if="usertype == 1" class="personal-detail">
        <div class="item-container">
	        <div class="para-left">
		        头像：
	        </div>
	        <div class="val-right">
		        <img v-if="userDetail.avatar != '无'" class="header-img" src="{{userDetail.avatar}}" alt="">
		        <img v-else class="header-img" src="../img/default.png" alt="">
	        </div>
        </div>
	    <div class=" item-container">
	        <div class="para-left">
		        昵称：
	        </div>
	        <div class="val-right">{{userDetail.nick_name}}</div>
        </div>
	    <div class=" item-container">
	        <div class="para-left">
		        真实姓名：
	        </div>
	        <div class="val-right">{{userDetail.real_name}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        性别：
	        </div>
		    <template v-if="userDetail.sex != '无'">
			    <div v-if="userDetail.sex == 1" class="val-right">男</div>
			    <div v-if="userDetail.sex == 2" class="val-right">女</div>
		    </template>
	        <div v-else class="val-right">无</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        生日：
	        </div>
	        <div class="val-right">{{userDetail.birthday}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        所在地：
	        </div>
	        <div class="val-right">{{userDetail.addr}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        工作单位(或所在地学校)：
	        </div>
	        <div class="val-right">{{userDetail.school}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        个人简介：
	        </div>
	        <div class="val-right">{{userDetail.summary}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        手机：
	        </div>
	        <div class="val-right">{{userDetail.contact_tel}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        邮箱：
	        </div>
	        <div class="val-right">{{userDetail.contact_email}}</div>
        </div>
	    <div class="item-container">
	        <div class="para-left">
		        QQ：
	        </div>
	        <div class="val-right">{{userDetail.contact_qq}}</div>
        </div>
    </div>

	<!--企业用户-->
	<div v-if="usertype == 2" class="company-detail">
		<div class="item-container">
			<div class="col-md-4 para-left">
				公司名：
			</div>
			<div class="val-right">{{companyDetail.company_name}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				公司地址：
			</div>
			<div class="val-right">{{companyDetail.company_addr}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				公司详细地址：
			</div>
			<div class="val-right">{{companyDetail.company_addr_detail}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				行业：
			</div>
			<div class="val-right">{{companyDetail.company_industry}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				联系人：
			</div>
			<div class="val-right">{{companyDetail.company_contacter}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				联系人部门：
			</div>
			<div class="val-right">{{companyDetail.company_dep}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				固定电话：
			</div>
			<div class="val-right">{{companyDetail.company_tel}}</div>
		</div>
		<div class="item-container">
			<div class="para-left">
				联系邮箱：
			</div>
			<div class="val-right">{{companyDetail.company_email}}</div>
		</div>

		<div class="item-container">
			<div class="para-left">
				联系电话：
			</div>
			<div class="val-right">{{companyDetail.tel}}</div>
		</div>
		<div class=container>
			<rd-notification></rd-notification>
		</div>

	</div>
</template>
<style>
	.personal-detail-content {
		display: inline-block;
		font-size: 16px;
	}
	.personal-detail-content:before {
		content: '';
		margin-right: 10px;
		width: 4px;
		height: 4px;
		background-color: #000;
		border-radius: 45px;
		display: inline-block;
		line-height: 56px;
		vertical-align: middle;
		margin-top: -2px;
	}
	.back-button {
		float: right;
		height: 63px;
		line-height: 63px;
		color: #19BBFF;
		cursor: pointer;
	}
	.back-button:hover {
		color: #41d8ff;
	}
	.personal-detail, .company-detail {
		position: relative;
		width: 800px;
		left: 100px;
	}
	.para-left {
		float: left;
		text-align: right;
		width: 200px;
	}
	.val-right {
		width: 560px;
		float: right;
		margin-left: 40px;
		word-break: break-word;
		line-height: 25px;
	}
	.val-right:after {
		clear: both;
	}
	.header-img {
		width: 100px;
		height: 100px;
		border-radius: 5px;
	}
	.personal-detail-title, .personal-detail {
		margin: 20px 40px 30px 40px;
	}
	.item-container {
		margin: 20px 0;
		clear: both;
		padding: 10px 0;
	}
</style>
<script>
	import { rdText } from 'radon-ui'
    export default{
        data(){
            return{
	            usertype: '',
                userDetail: {

                },
	            companyDetail: {

	            },
		        test: {
			        value: '',
			        placeHolder: '请输入',
			        state: 'success',
			        tip: '',
			        inline: true
		        }
            }
        },
	    created: function(){

		    // 获取params的参数ID
		    var id=this.$route.params.id,
			    $this = this;

		    // 获取用户数据详情
		    this.getUserInfo($this, {"uc_id": id});

	    },
	    methods: {

		    // 获取用户详情函数
		    getUserInfo: function ($this,paras) {
			    $.ajax({
				    type: "POST",
				    url: "/user/detail",
				    data: paras,
				    dataType: "json",
				    success: function(res){
					    if(res.code == 0) {
						    var type = res.data.user_type; // 获取用户类型
						    var userdata = res.data; // 获取用户数据
						    $this.$set("usertype", type);

						    // 设置数据
						    if(type == 1) {
							    $this.$set("userDetail", userdata);
						    } else {
							    $this.$set("companyDetail", userdata);
						    }
					    } else {
						    console.log(res.msg);
					    }
				    }
			    });
		    }
	    },
	    components: {
		    rdText
	    }
    }
</script>
