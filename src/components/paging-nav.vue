<template>

	<!--子组件位置-->
	<div class="search-container">
		<div class="search-item-container item-search">
			<rd-select :select=selectSearchItem></rd-select>
		</div>
		<div class="search-item-container">
			<rd-text :textfield=selectValue></rd-text>
		</div>
		<div class="search-item-container user-type-container">
			<span>类型：</span>
		</div>
		<div class="search-item-container">
			<rd-select :select=selectUserType></rd-select>
		</div>
		<div class="search-item-container img-search">
			<img @click="goSearch" src="../module/user/img/search_button.png" alt="">
		</div>
	</div>
	<usertable :user.sync="userData"></usertable>

    <div v-if="userData != 'false' && userData[0] != null" class="paging-container">
	    <div class="paging-left">
		    共<span>{{ total }}</span>页&nbsp;/&nbsp;
		    {{ dataTotal }}条数据
	    </div>
		    <div class="paging-middle">
			    <ul>
				    <li @click="pre(cur)">
					    <img src="../assets/img/pag_left.png" alt="左切换按钮">
				    </li>
				    <li v-if="showLeftMoreTail" class="more-detail">...</li>
				    <li v-for="item in indexs" @click="pageJump(item)" :class="{active: cur == item}">
				        <a :href="">
						    {{item}}
					    </a>
				    </li>
				    <li v-if="showRightMoreTail" class="more-detail">...</li>
				    <li class="" @click="next(cur)">
					    <img src="../assets/img/pag_right.png" alt="右切换按钮">
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
<style scoped>

	/*搜索*/
	.search-item-container {
		width: 200px;
		float: left;
		margin-right: 20px;
	}
	.item-search {
		width: 100px
	}
	.search-container {
		padding: 40px;
	}
	.search-container:after {
		clear: both;
	}
	.img-search {
		text-align: center;
		line-height: 34px;
		width: 40px;
		border: 1px solid #eee;
		border-radius: 7px;
		margin-left: 27px;
		margin-top: -2px;
	}
	.img-search img {
		cursor: pointer;
	}
	.user-type-container {
		width: 42px;
		margin-right: 10px;
		line-height: 33px;
		margin-left: 30px;
	}
	/* 分页*/
	.paging-container {
		text-align: center;
		margin-bottom: 40px;
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
	.active {
		background-color: #E3E3E3;
		color: #000000;
	}
	.active a {
		color: #ABABAB;
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
	import usertable from '../module/user/view/userlist';
	import { rdSelect, rdText} from 'radon-ui'
	export default{
		data: function () {
			return {
				showRightMoreTail: false,
				showLeftMoreTail: false,
				userData: 'false',
				total: '',
				size: '',
				dataTotal:'',
				cur: '',
				selected: 1,
				selectSearchItem: {
					multiple: false,
					key: 'selectSearchItem',
					value: {},
					options: [{
						selected: true,
						disabled: false,
						value: '用户ID',
						id: 'uc_id'
					},{
						selected: false,
						disabled: false,
						value: '用户名',
						id: 'username'
					}]
				},
				selectUserType: {
					multiple: false,
					key: 'selectUserType',
					value: {},
					options: [{
						selected: true,
						disabled: false,
						value: '全部',
						id: 0
					},{
						selected: false,
						disabled: false,
						value: '个人用户',
						id: 1
					}, {
						selected: false,
						disabled: false,
						value: '企业用户',
						id: 2
					}]
				},
				selectValue: {
					// value 值 :String
					value: '',
					// placeHolder :String
					placeHolder: '请输入关键词进行搜索',
					// 输入框状态 :String
					state: 'default', // ['warning', 'failed', 'info', 'success']
					// 输入框提示文字 :String
					tip: ''
				},
				select: '',
				searchIteam: '',
				user_type: ''
			}
		},
        components: {
	        usertable,
	        rdSelect,
	        rdText
        },
		ready() {
			var $this = this,
				paras = {
					"first_load": true,
				};

			// 首次加载时请求数据
			this.getData($this, paras);
		},
		methods: {

			// 页面跳转
			pageJump: function (index) {
				if(parseInt(index) > parseInt(this.$data.total) || parseInt(index) < 0 || !parseInt(index)) {
					return
				} else {
					var $this = this,
						paras = {
							"first_load": false,
							"page": index,
							"select": this.selectSearchItem.value.id,
							"searchItem": this.selectValue.value,
							"user_type": this.selectUserType.value.id
						};
					this.getData($this, paras);
				}
			},

			// 下一页
			next: function (index) {
				if(index < this.$data.total) {
					index++;
					this.$data.cur = index;
					var $this = this,
						paras = {
							"first_load": false,
							"page": this.$data.cur,
							"select": this.selectSearchItem.value.id,
							"searchItem": this.selectValue.value,
							"user_type": this.selectUserType.value.id
						};
					this.getData($this, paras);
				} else {
					return
				}
			},

			// 前一页
			pre: function (index) {
				if(index > 1) {
					index--;
				} else {
					return
				}
			},

			// 获取数据
			getData: function ($this,paras) {
				$.ajax({
					type: "GET",
					url: "/user/listRefresh",
					data: paras,
					dataType: "json",
					success: function(res){
						if(res.code == 0) {
							var pag = res.data.page;
							var userlist = res.data.userList;

							// 设置数据
							$this.$set("userData", userlist);
							$this.$set("cur", pag.page_num);
							$this.$set("total", pag.page_total);
							$this.$set("size", pag.size);
							$this.$set("dataTotal", pag.total);
						} else {
							console.log(res.msg);
						}
					}
				});
			},
			goSearch: function () {
				this.select = this.selectSearchItem.value.id;
				this.select = this.selectValue.value;
				this.select = this.selectUserType.value.id;
				var $this = this,
				paras = {
					"first_load": false,
					"select": this.selectSearchItem.value.id,
					"searchItem": this.selectValue.value,
					"user_type": this.selectUserType.value.id
				};

				// 首次加载时请求数据
				this.getData($this, paras);
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
			'goback': function () {
				var $this = this,
				paras = {
					"first_load": false,
					"select": this.selectSearchItem.value.id,
					"searchItem": this.selectValue.value,
					"user_type": this.selectUserType.value.id
				};
				this.getData($this, paras);
			}
		}
    }
</script>
