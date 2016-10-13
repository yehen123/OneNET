<template>

	<!--子组件位置-->
	<datatable :condition="conditionArray"></datatable>
	<div v-if="total" class="paging-container">
		<div class="paging-left">
			共<span>{{ total }}</span>页&nbsp;/&nbsp;
			{{ dataTotal }}条数据
		</div>
		<div class="paging-middle">
			<ul>
				<li @click="pre(cur)">
					<i class="icon-angle-left"></i>
				</li>
				<li v-if="showLeftMoreTail" class="more-detail">...</li>
				<li v-for="item in indexs" @click="pageJump(item)" :class="{active: cur == item}">
					<a :href="">
						{{item}}
					</a>
				</li>
				<li v-if="showRightMoreTail" class="more-detail">...</li>
				<li class="" @click="next(cur)">
					<i class="icon-angle-right"></i>
				</li>
			</ul>
		</div>
		<div class="paging-right">
			<span>跳转至</span>
			<select name="" id="" v-model="selected">
				<option v-for="item in total" :value="$index + 1">{{$index + 1}}</option>
			</select>
			<span>页</span>
			<button class="button" @click="pageJump(selected)">Go</button>
		</div>
	</div>
</template>
<style>
	.paging-container {
		text-align: center;
		margin-bottom: 60px;
	}

	.paging-right, .paging-middle, .paging-left {
		display: inline-block;
		line-height: 40px;
	}

	.paging-middle ul li {

		display: inline-block;
		width: 40px;
		height: 40px;
		border-right: 0;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		color: #19BBFF;
		border-radius: 5px;
		margin: 0 1px;
	}

	.paging-middle ul li:hover {
		background-color: #E3E3E3;
	}

	.paging-middle ul li a {
		text-decoration: none;
		color: #19BBFF
	}
	.paging-middle .active {
		background-color: #E3E3E3;
		color: #000000;
	}
	.paging-middle ul .more-detail {
		color: #ABABAB;
	}

	.paging-right select {
		margin: 0 10px;
		border: none;
	}

	.button {
		height: 36px;
		width: 50px;
		line-height: 36px;
		background-color: #19BBFF;
		border: none;
		margin-left: 20px;
		border-radius: 5px;
		color: #fff;
	}

	.button:hover {
		background-color: #41d8ff;
	}

</style>
<script>

	//	子组件引用
	import datatable from './list';
	export default{
		data: function () {
			return {

				// 分页数据
				showRightMoreTail: false,
				showLeftMoreTail: false,
				userData: false,
				total: 1, // 页数
				size: 10,
				dataTotal: '',
				cur: 1,
				selected: 1,

				// 数据表数据
				conditionArray: Array,
				tabledata: {
					url: this.$route.name
				},

				// 查询数据
				search: {}
			}
		},
		components: {
			datatable
		},
		ready() {
			var $this = this,
					paras = {},
					url = "/account/list",
					type = 1; // 1代表去请求选择的参数
			paras.per_page = this.size;
			paras.page = 1;
			// 首次加载时请求数据
			this.getData($this, paras, url, type);
		},
		methods: {

			// 页面跳转
			pageJump: function (index) {
				var $this = this,
						paras = $this.search;
				$this.cur = index;
				paras.per_page = $this.size;
				paras.page = index;
				var url = "/account/list";
				this.getData($this, paras, url);
			},

			// 下一页
			next: function (index) {
				if (index < this.$data.total) {
					index++;
					this.$data.cur = index;
					var $this = this,
							paras = $this.search;
					paras.per_page = $this.size;
					paras.page = index;
					var url = "/account/list";
					this.getData($this, paras, url);
				} else {
					return
				}
			},

			// 前一页
			pre: function (index) {
				if (index > 1) {
					index--;
					this.$data.cur = index;
					var $this = this,
							paras = $this.search;
					paras.per_page = $this.size;
					paras.page = index;
					var url = "/account/list";
					this.getData($this, paras, url);
				} else {
					return
				}
			},

			// 获取数据
			getData: function ($this, paras, url, type) {
				$.ajax({
					type: "POST",
					url: url,
					data: paras,
					dataType: "json",
					success: function (res) {
						if (res.code == 0) {
							var pageTotal = Math.ceil(res.data.page.total / $this.$data.size);
							// 设置分页数据
							$this.$set("userData", res.data.datas);
							$this.$set("total", pageTotal);
							$this.$set("dataTotal", res.data.page.total);
							// 添加子组件数据
							var o = Object.keys(res.data.list);
							var ary = [];
							for (var i = 0; i < o.length; i++) {
								ary.push(res.data.list[o[i]]);
							}
							for (var j = 0; j < ary.length; j++) {
								var key = "switch";
								var obj = {};
								obj[key] = {};
								if (ary[j].status == -1) {
									obj[key].checked = false;
								} else if (ary[j].status == 0) {
									obj[key].checked = true;
								}
								ary[j].switchAry = obj;
							}

							$this.$set("conditionArray", ary);
						} else {
							console.log(res.msg);
						}
					}
				});
			}
		},
		computed: {
			indexs: function () {
				var $this = this;
				var ar = []; // 分页数组

				// 显示当前页的前3条记录
				if ($this.cur > 3) {
					ar.push($this.cur - 3);
					ar.push($this.cur - 2);
					ar.push($this.cur - 1);
					if (( $this.cur - 4 ) >= 1) {
						$this.$set("showLeftMoreTail", true); // 显示左侧加载更多
					}
				} else {
					$this.$set("showLeftMoreTail", false); // 隐藏左侧加载更多
					for (var i = 1; i < $this.cur; i++) {
						ar.push(i);
					}
				}

				// 添加当前页
				ar.push($this.cur);

				// 显示当前页的后三条记录
				if ($this.cur < ( $this.total - 3 )) {
					ar.push($this.cur + 1);
					ar.push($this.cur + 2);
					ar.push($this.cur + 3);
					if ($this.cur <= ( $this.total - 4 )) {
						$this.$set("showRightMoreTail", true); // 显示右侧加载更多
					}
				} else {
					$this.$set("showRightMoreTail", false); // 不显示右侧加载更多
					for (var i = ($this.cur + 1); i <= $this.total; i++) {
						ar.push(i);
					}
				}
				return ar;
			}
		},
		events: {

			//删除账号
			'child-id': function (msg) {
				var $this = this;
				var paras = {};
				paras.id = msg;
				paras.page = this.size; // 参数名称需要修改
				var newMsg = {};
				newMsg.page = this.cur;
				newMsg.per_page = this.size;
				var url = "/account/list";
				// 删除请求
				$.ajax({
					type: "POST",
					url: "/account/delete",
					data: paras,
					dataType: "json",
					success: function (res) {
						if (res.code == 0) {
							$this.getData($this, newMsg, url);//删除后重新加载数据
						} else {
							console.log(res.msg);
						}
					}
				});
			},

			//状态改变
			'status-id': function (msg) {
				var $this = this;
				var id = msg;
				var newMsg = {};
				newMsg.page = this.cur;
				newMsg.per_page = this.size;
				var url = "/account/list";
				$.ajax({
					type: "POST",
					url: "/account/changeStatus",
					data: {
						id: id
					},
					dataType: "json",
					success: function (res) {
						if (res.code == 0) {
							$this.getData($this, newMsg, url);  //修改状态后重新加载数据
						} else {
							console.log(res.msg);
						}
					}
				});
			}
		}
	}
</script>
