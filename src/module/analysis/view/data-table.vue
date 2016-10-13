<template>
	<div class="choice-select">
		<div class="choice-container">
			<div class="select-title">
				筛选维度
			</div>
			<div class="select-title">
				条件选择
			</div>
		</div>
		<div class="choice-select-item">
			<div v-if="tabledata.url=='product'" class="select-value">
				<rd-checkbox :checkbox=checkbox1></rd-checkbox>
				<rd-checkbox :checkbox=checkbox2></rd-checkbox>
				<rd-checkbox :checkbox=checkbox3></rd-checkbox>
			</div>
			<div v-if="tabledata.url=='user'" class="select-value">
				<rd-checkbox :checkbox=checkbox4></rd-checkbox>
				<rd-checkbox :checkbox=checkbox5></rd-checkbox>
			</div>

			<!--产品相关-->
			<div v-if="tabledata.url=='product'" class="select-value condition-select">
				<div class="condition-container date-picker-container">
					<rd-datepicker :date=datePicker></rd-datepicker>
				</div>
				<div class="condition-container">
					<label>产品行业：
						<select v-model="productIndustry">
							<option value="">全部</option>
							<option v-for="industry in condition.industry" value="{{$key}}">{{industry}}</option>
						</select>
					</label>
				</div>
				<div class="condition-container">
					<label>产品类别：
						<select v-model="productCategory">
							<option value="">全部</option>
							<option v-for="product in condition.productOption" value="{{$key}}">{{product.title}}</option>
						</select>
					</label>
				</div>
				<div class="condition-container">
					<label>协议类型：
						<select v-model="productType">
							<option value="">全部</option>
							<option v-for="profile in condition.protocol" value="{{$key}}">{{profile}}</option>
						</select>
					</label>
				</div>
				<div class="condition-container search-container">
					<img @click="product_search"  src="../img/search_button.png" alt="">
				</div>
			</div>

			<!--用户相关-->
			<div v-if="tabledata.url=='user'" class="select-value condition-select">
				<div class="condition-container date-picker-container">
					<rd-datepicker :date=datePicker></rd-datepicker>
				</div>
				<div class="condition-container">
					<label>用户类型：
						<select v-model="userType">
							<option value="">全部</option>
							<option v-for="type in condition.profile" value="{{$key}}">{{type}}</option>
						</select>
					</label>
				</div>
				<div class="condition-container">
					<label>注册来源：
						<select v-model="userRegister">
							<option value="">全部</option>
							<option v-for="regfrom in condition.reg_from" value="{{$key}}">{{regfrom}}</option>
						</select>
					</label>
				</div>
				<div class="condition-container search-container">
					<img @click="user_search" src="../img/search_button.png" alt="">
				</div>
			</div>
		</div>
	</div>
	<div class="data-list-title">
		<div class="under-line"></div>
		<div v-if="tabledata.url=='product'" class="data-title-left">
			<p class="data-title-content">产品报表</p>
		</div>
		<div v-if="tabledata.url=='user'" class="data-title-left">
			<p class="data-title-content">用户报表</p>
		</div>
		<!--<div class="operation-button">-->
			<!--<rd-button type=primary>取消过滤</rd-button>-->
			<!--<rd-button type=primary>导出结果</rd-button>-->
		<!--</div>-->
	</div>
	<div class="data-container">
        <table v-if="subdata && subdata != '无数据'" class="table">
	        <tr v-if="tabledata.url=='user'">
		        <th></th>
		        <th v-if="subdata[0].user_type != null">用户类型</th>
		        <th v-if="subdata[0].register != null">注册方式</th>
		        <th v-if="subdata[0].wechat != null">微信注册人数</th>
		        <th v-if="subdata[0].qq != null">qq注册人数</th>
	        </tr>
	        <tbody v-if="tabledata.url=='user'">
		        <tr v-for="item in subdata">
			        <td>{{tabledata.num + $index + 1}}</td>
			        <td v-if="subdata[0].user_type != null">{{item.user_type}}</td>
			        <td v-if="subdata[0].register != null">{{item.register}}</td>
			        <td v-if="subdata[0].wechat != null">{{item.wechat}}</td>
			        <td v-if="subdata[0].qq != null">{{item.qq}}</td>
		        </tr>
	        </tbody>
	        <tr v-if="tabledata.url=='product'">
		        <th></th>
		        <th v-if="subdata[0].industry != null">产品行业</th>
		        <th v-if="subdata[0].category != null">产品类别</th>
		        <th v-if="subdata[0].protocol != null">接入协议</th>
		        <th v-if="subdata[0].product_total != null">产品总数</th>
		        <th v-if="subdata[0].device_total != null">设备总数</th>
		        <th v-if="subdata[0].dp_total != null">数据点总数</th>
		        <th v-if="subdata[0].webapp_total != null">应用总数</th>
	        </tr>
	        <tbody v-if="tabledata.url=='product'">
		        <tr v-for="item in subdata">
			        <td>{{tabledata.num + $index + 1}}</td>
			        <td v-if="subdata[0].industry != null">{{item.industry}}</td>
			        <td v-if="subdata[0].category != null">{{item.category}}</td>
			        <td v-if="subdata[0].protocol != null">{{item.protocol}}</td>
			        <td v-if="subdata[0].product_total != null">{{item.product_total}}</td>
			        <td v-if="subdata[0].device_total != null">{{item.device_total}}</td>
			        <td v-if="subdata[0].dp_total != null">{{item.dp_total}}</td>
			        <td v-if="subdata[0].webapp_total != null">{{item.webapp_total}}</td>
		        </tr>
	        </tbody>
        </table>
		<div v-if="!subdata" class="nondata-container">
			<p>加载中~</p>
		</div>
		<div v-if="subdata == '无数据'" class="nondata-container">
			<p>暂无相关数据~</p>
		</div>
    </div>
	<rd-notification></rd-notification>
</template>

<script>
	import { rdCheckbox, rdButton, rdDatepicker, rdAlert } from 'radon-ui'
	import { RadonInstall } from 'radon-ui'
	import Vue from 'vue'

	Vue.use(RadonInstall, {
		Notification: true
	});
	export default {
		data: function () {
			return {
				uc_id: '',
				username: '',
				checkbox1: {
					checked: true,
					text: "产品行业"
				},
				checkbox2: {
					checked: true,
					text: "产品类别"
				},
				checkbox3: {
					checked: true,
					text: "协议类型"
				},
				checkbox4: {
					checked: true,
					text: "用户类型"
				},
				checkbox5: {
					checked: true,
					text: "注册来源"
				},
				datePicker: {
					value: '',
					rawDate: {},
					options: {
						format: 'YYYY-MM-DD',
						monthList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
						],
						weekList: ['一', '二', '三', '四', '五', '六', '日']
					}
				},
				userType: '',
				userRegister: '',
				productIndustry: '',
				productType: '',
				productCategory: ''
			}
		},
		components: {
			rdCheckbox,
			rdButton,
			rdDatepicker,
			rdAlert
		},
		ready() {
			if(this.tabledata.url=='product') {
				this.product_search();
			} else if (this.tabledata.url=='user') {
				this.user_search();
			}
			this.$set("datePicker.value", this.getPreDate())
		},
		props: [
			'condition', // 条件选择
			'tabledata', // 路由数据以数据条数
			'searchdata', // 查询条件
			'subdata' // 表数据
		],
		methods: {

			// 用户搜索条件
			user_search: function () {
				var endTime = this.getPreDate(),
					dimensionType,
					dimensionRegister;
				if(this.checkbox4.checked == false) {
					dimensionType = 0
				} else {
					dimensionType = 1
				}
				if(this.checkbox5.checked == false) {
					dimensionRegister = 0
				} else {
					dimensionRegister = 1
				}
				this.$dispatch('search-click', {
					'start': this.datePicker.value,
					'end': endTime,
					'type': this.userType ,
					'register': this.userRegister,
					'dimension_register': dimensionRegister,
					'dimension_type': dimensionType
				})
			},

			// 产品搜索条件
			product_search: function () {
				var dimensionIndustry,
					dimensionType,
					dimensionCategory,
					pickedDate = this.datePicker.value;
				if(pickedDate == '') {
					pickedDate = this.getPreDate();
				}
				if(this.checkbox1.checked == false) {
					dimensionIndustry = 0
				} else {
					dimensionIndustry = 1
				}
				if(this.checkbox2.checked == false) {
					dimensionType = 0
				} else {
					dimensionType = 1
				}
				if(this.checkbox3.checked == false) {
					dimensionCategory = 0
				} else {
					dimensionCategory = 1
				}
				this.$dispatch('search-click', {
					'day': pickedDate,
					'industry': this.productIndustry,
					'type': this.productType ,
					'category': this.productCategory,
					'dimension_industry': dimensionIndustry,
					'dimension_type': dimensionCategory,
					'dimension_category': dimensionType

				})
			},
			getPreDate: function () {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate() - 1;
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
				return currentdate;
			}
		}
    }
</script>
<style scoped>

	/*条件筛选*/
	.data-container, .choice-select {
		margin: 40px;
	}
	.choice-select {
		padding-top: 40px;
	}
	.choice-container {
		width: 140px;
		display: inline-block;
		background-color: #EDEDED;
	}
	.choice-select-item {
		display: inline-block;
		margin-left: 20px;
	}
	.date-picker-container {
		width: 100px;
	}
	.select-title, p {
		font-size: 16px;
		height: 50px;
		line-height: 50px;
		padding: 0;
		margin: 0px;
		text-align: center;
	}

	/*右侧的选择值*/
	.select-value {
		height: 50px;
		line-height: 50px;
	}
	.select-value .rd-checkbox-wrapper {
		margin-right: 15px;
	}
	.condition-container {
		display: inline-block;
		width: 175px;
	}
	.search-container {
		vertical-align: middle;
		width: 40px;
		text-align: center;
		line-height: 34px;
		border: 1px solid #eee;
		border-radius: 7px;
		margin-left: 27px;
		margin-top: -2px;
	}
	.search-container img {
		cursor: pointer;
	}

	/*日期选择*/
	.date-picker-container {
		width: 170px;
		margin-right: 10px;
	}
	.date-picker-container .rd-datepicker-container {
		margin-bottom: 8px;
	}
	.condition-container select {
		border: none;
		width: 100px
	}
	.condition-container select option {
		line-height: 30px;
	}
	.clert-container {
		width: 200px;
		height: 60px;
		position: absolute;
		z-index: 999;
		margin: 100px auto;
	}

	/*导入导出按钮及左侧title*/
	.data-list-title {
		margin: 0 40px;
	}
	.under-line {
		border-bottom: 1px solid #EFF0F4;
	}
	.data-list-title .data-title-left {
		display: inline-block;
		font-size: 18px;
	}
	.data-title-content:before {
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
	.data-list-title .operation-button {
		display: inline-block;
		float: right;
		text-align: right;
		line-height: 60px;
	}
	.data-list-title .operation-button button {
		margin: 0 10px;
	}
	.nondata-container p{
		font-size: 14px;
		text-align: center;
	}

	/*数据表*/
	.data-container {
		min-height: 400px;
	}
	.table {
		font-size: 14px;
		width: 100%;
		border: 1px solid #EFF0F4;
	}
	.table tr:hover {
		background: #eff1f5;
	}
	.table tr th {
		background-color: #EFF0F4;
	}
	.table tr td, th {
		text-align: center;
		border-right: 1px solid #EFF0F4;
	}
</style>