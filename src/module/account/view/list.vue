<template>
	<div class="account_list">
		<!--<div class="sreach">-->
		<!--<rd-select :select=form.selectRole></rd-select>-->
		<!--<rd-text :textfield=form.condition></rd-text>-->
		<!--<div class="create_time">-->
		<!--创建时间：-->
		<!--<rd-datepicker :date=form.startDate></rd-datepicker>-->
		<!--至-->
		<!--<rd-datepicker :date=form.endDate></rd-datepicker>-->
		<!--</div>-->
		<!--<i class="sreach_icon" @click="clickFun"></i>-->
		<!--</div>-->
		<div class="title">
			<div class="circle">
				<div></div>
				账号列表
			</div>
			<a v-link="{path:'/create'}">创建账号</a>
		</div>
		<table id="table">
			<thead>
			<tr class="table_header">
				<th>账号名称</th>
				<th>所属角色</th>
				<th>更新时间</th>
				<th>账号操作</th>
				<th>状态</th>
				<th>操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-if="condition[0]" v-for="item in condition">
				<td>{{ item.username }}</td>
				<td>{{ item.group_name }}</td>
				<td>{{ item.update_time }}</td>
				<td>{{ item.last_operate_user.username }}</td>
				<td>
					<rd-switch :value=item.switchAry.switch @change=changeAction data-id={{item.id}}></rd-switch>
				</td>
				<td class="handle_container">
					<i class="handle" @mouseover="showBox" @mouseout="hideBox"
					   v-link="{name:'edit',params: { 'currData': transmitData } }" data-id={{item.id}}
					   @click="editFun">
						<div class="notice_box">
							<div class="font">编辑</div>
							<div class="triangle"></div>
						</div>
					</i>
					<i class="delete" data-id={{item.id}} @click="open" @mouseover="showBox" @mouseout="hideBox">
						<div class="notice_box">
							<div class="font">删除</div>
							<div class="triangle"></div>
						</div>
					</i>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
	<router-view></router-view>
</template>
<script>
	import {rdText, rdSelect, RadonInstall, rdDatepicker, rdSwitch} from 'radon-ui'
	export default {
		data: function () {
			return {
				currData: {},
				transmitData: {},
				switchArray: []
			}
		},
		components: {
			rdText,
			rdSelect,
			RadonInstall,
			rdDatepicker,
			rdSwitch
		},
		created: function () {
		},
		ready: function () {
		},
		methods: {
			open: function () {
				var $this = this;
				var id = event.currentTarget.getAttribute("data-id");
				this.$Modal.confirm(
						'提示：',
						'你确定要删除吗',
						function () {
							$this.$dispatch('child-id', id);
						},
						function () {
							return true;
						}
				)
			},
			showBox: function () {
				var box = event.currentTarget.querySelector(".notice_box");
				box.style.display = "block";
			},
			hideBox: function () {
				var box = event.currentTarget.querySelector(".notice_box");
				box.style.display = "none";
			},
			editFun: function () {
				var $this = this;
				var id = event.currentTarget.getAttribute("data-id");
				this.condition.forEach(function (val) {
					if (val.id == id) {
						$this.$data.currData.id = val.id;
						$this.$data.currData.username = val.username;
						$this.$data.currData.status = val.status;
						$this.$data.currData.create_time = val.create_time;
						$this.$data.currData.group_id = val.group_id;
						$this.$data.currData.update_time = val.update_time;
						$this.$data.currData.detail = val.detail;
						$this.$data.currData.group_name = val.group_name;
						$this.$data.currData.last_operate_user = val.last_operate_user;
					}
				});
				this.$data.transmitData = JSON.stringify(this.$data.currData);
			},
			changeAction: function () {
				var id = event.currentTarget.getAttribute("data-id");
				var $this = this;
				$this.$dispatch('status-id', id);
			}
		},
		props: ['condition']
	}

</script>
<style scoped>
	.account_list {
		width: 100%;
	}
	.account_list .title {
		width: 100%;
	}

	.account_list .circle {
		display: inline-block;
		margin-top: 20px;
		margin-bottom: 20px;
		color: #333333;
		font-size: 14px;
	}

	.account_list .circle div {
		width: 4px;
		height: 4px;
		border-radius: 2px;
		background-color: #333333;
		float: left;
		margin-right: 10px;
		margin-top: 8px;
		margin-left: 20px;
	}

	.account_list .title a {
		width: 100px;
		height: 30px;
		display: block;
		float: right;
		background-color: #19bbff;
		font-size: 12px;
		color: #fff;
		line-height: 30px;
		text-align: center;
		border-radius: 5px;
		margin-top: 14px;
	}

	.account_list #table {
		width: 100%;
		margin-bottom: 20px;
	}

	.account_list tr {
		height: 50px;
	}

	.account_list tbody tr:nth-child(even) {
		background-color: #f4f9fb;
	}

	.account_list tbody tr:hover {
		background-color: #eff1f5;
	}

	.account_list thead .table_header {
		background-color: #eeeeee;
	}

	.account_list td {
		text-align: center;
	}

	.account_list .handle {
		width: 18px;
		height: 18px;
		display: inline-block;
		background: url("../img/icon.png") -34px -3px;
		position: relative;
		font-style: normal;
		cursor: pointer;

	}

	.account_list .delete {
		width: 18px;
		height: 18px;
		display: inline-block;
		background: url("../img/icon.png") -56px -3px;
		margin-left: 20px;
		position: relative;
		font-style: normal;
		cursor: pointer;
	}

	.account_list .notice_box {
		width: 44px;
		height: 32px;
		position: absolute;
		top: -35px;
		left: -14px;
		display: none;
	}

	.account_list .font {
		width: 100%;
		height: 26px;
		background-color: #313232;
		line-height: 26px;
		text-align: center;
		color: #fff;
		border-radius: 5px;
		font-size: 12px;
	}

	.account_list .triangle {
		width: 0;
		height: 0;
		border: 0;
		border-top: 6px solid #313232;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		margin: 0 auto;
	}
</style>
