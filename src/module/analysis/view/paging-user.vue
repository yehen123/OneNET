<template>

	<!--子组件位置-->
	<datatable :condition="conditionArray" :tabledata="tabledata" :subdata="userData" :searchdata.sync="searchdata"></datatable>
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
			<!--<select name="" id="" v-model="selected">-->
				<!--<option v-for="item in total" :value="$index + 1">{{$index + 1}}</option>-->
			<!--</select>-->
			<input class="jump-page" v-model="selected" type="text">
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
	.paging-middle .active {
		background-color: #E3E3E3;
		color: #000000;
	}

	/*页面跳转*/
	.jump-page {
		border: 1px solid silver;
		width: 50px;
		height: 35px;
		border-radius: 5px;
		text-align: center;
		outline:none
	}
</style>
<script>

	//	子组件引用
	import datatable from './data-table';
	export default{
		data: function () {
			return {

				// 分页数据
				showRightMoreTail: false,
				showLeftMoreTail: false,
				userData: false,
				total: '',
				size: 20, // 每页数据条数
				dataTotal: '',
				cur: 1, // 当前页
				selected: 1,

				// 数据表数据
				conditionArray: Array,

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
				url = "/report/getconditionajax",
				type = 1; // 1代表去请求选择的参数

			// 首次加载时请求数据
			this.getData($this, paras, url, type);
		},
		methods: {

			// 页面跳转
			pageJump: function (index) {
				if(parseInt(index) > parseInt(this.$data.total) || parseInt(index) < 0 || !parseInt(index)) {
					return
				} else {
					var $this = this,
						paras = $this.search;
					$this.$data.cur = parseInt(index);
					paras.limit = $this.size;
					paras.page = index;
					var url = "/report/getuserreportajax";
					this.getData($this, paras, url);
				}
			},

			// 下一页
			next: function (index) {
				if(index < this.$data.total) {
					index++;
					this.$data.cur = index;
					var $this = this,
						paras = $this.search;
					paras.limit = $this.size;
					paras.page = index;
					var url = "/report/getuserreportajax";
					this.getData($this, paras, url);
				} else {
					return
				}
			},

			// 前一页
			pre: function (index) {
				if(index > 1) {
					index--;
					this.$data.cur = index;
					var $this = this,
						paras = $this.search;
					paras.limit = $this.size;
					paras.page = index;
					var url = "/report/getuserreportajax";
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
					success: function(res){
						if(res.code == 0) {
							if (type == 1) {

								// 设置条件选择数据
								$this.$set("conditionArray", res.data);
							} else {
								var pageTotal = Math.ceil(res.data.count / $this.$data.size);

								// 设置分页数据

								if(res.data.datas.length != 0 ) {
									$this.$set("userData", res.data.datas); // 表格内的数据
								} else {
									$this.$set("userData", '无数据'); // 表格内的数据
								}
								$this.$set("total", pageTotal);  // 总页数
								$this.$set("dataTotal", res.data.count); // 数据总数
							}
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
			},
			tabledata: function () {
				return {
					url: this.$route.name,
					num: (this.$data.cur - 1) * this.$data.size
				}
			}
		},
		events: {
			'search-click': function (msg) {
				var paras = msg,
					$this = this;
					paras.limit = this.size;
					paras.page = 1;
				this.search = msg;
				var url = "/report/getuserreportajax";

				// 首次加载时请求数据
				this.getData($this, paras, url);
			}
		}
	}
</script>
