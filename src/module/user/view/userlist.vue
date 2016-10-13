<template>
	<div class="user-list-title">
		<h3 class="title-content">用户列表</h3>
	</div>
	<div v-if="user != 'false'" class="data-container">
        <table class="table">
	        <tr>
		        <th>
			        用户ID
		        </th>
		        <th>
			        用户名
		        </th>
		        <th>
			        类型
		        </th>
		        <th>
			        公司名称
		        </th>
		        <th>
			        注册时间
		        </th>
		        <th>
			        绑定设备数
		        </th>
		        <th>
			        产品总数
		        </th>
		        <th>
			        连接设备总数
		        </th>
		        <th>
			        查看详情
		        </th>
	        </tr>
	        <tbody>
		        <tr v-if="user[0]" v-for="item in user">
			        <td>{{item.uc_id}}</td>
			        <td>{{item.username}}</td>
			        <td>{{item.user_type}}</td>
			        <td>{{item.company_name}}</td>
			        <td>{{item.reg_time}}</td>
			        <td>{{item.bind_device}}</td>
			        <td>{{item.product}}</td>
			        <td>{{item.connect_device}}</td>
			        <td>
				        <img v-link="{name:'detail',params: { 'id': item.uc_id} }" class="edit-button" data-toggle="tooltip" data-placement="top" title="查看详情" src="../img/detail.png" alt="">
			        </td>
		        </tr>
	            <tr v-if="user[0] == null">
		            <td class="no-data" colspan="9">暂无相关数据~</td>
	            </tr>
	        </tbody>
        </table>
    </div>
	<div v-else class="nondata-container">
		<p>加载中...</p>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				uc_id: '',
				username: ''
			}
		},
		components: {
		},
		ready() {
			$('table').on('mouseover', '.edit-button',function () {
				$(this).tooltip('show');
			})
		},
		attached() {
		},
		props: ['user'],
		methods: {

		}
    }
</script>
<style scoped>
	.user-list-title {
		margin: 20px 40px 30px 40px;
	}
	.user-list-title .title-content {
		display: inline-block;
		font-size: 16px;
	}
	.user-list-title .title-content:before {
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
	.data-container {
		margin: 40px;
	}
	.edit-button {
		font-size: 14px;
		color: #19BBFF;
		cursor: pointer;
	}
	.edit-button:hover {
		color: #41d8ff
	}
	.nondata-container {
		text-align: center;
	}

	/*数据表样式*/
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