<template>
    <div class="paging-container">
	    <div v-if="page.total && page.dataTotal" class="paging-left">
		    共<span>{{ page.total || 0 }}</span>页&nbsp;/&nbsp;
		    {{ page.dataTotal || 0 }}条数据
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
		    <input class="pageInput form-control" type="text" v-model="selected">
		    <!--<select name="" id="" v-model="selected">
			    <option v-for="item in page.total" :value="$index + 1">{{$index + 1}}</option>
		    </select>-->
		    <span>页</span>
		    <button class="button" @click="pageJump(selected)">Go</button>
	    </div>
    </div>
</template>
<style scoped>
	.paging-container {
        margin-top: 15px;
		text-align: center;
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
	.pageInput.form-control {
        display: inline-block;
        width: 44px;
        padding: 10px;
	}
</style>
<script>
	export default{
		data: function () {
			return {
				showRightMoreTail: false,
				showLeftMoreTail: false,
				userData: Array,
				total: '',
//				size: '',
				dataTotal:'',
				cur: '',
				selected: 1,
			}
		},
        components: {
        },
		ready() {
		    for(var i in this.page) {
		        this.$set(i, this.page[i]);
		    }
//			var $this = this,
//				paras = {
//					"first_load": true
//				};
			// 首次加载时请求数据
//			this.getData($this, paras);
		},
		props: {
		    page: {
		        type: Object,
		        twoWay: true
		    }
		},
		methods: {

			// 页面跳转
			pageJump: function (index) {
                if(parseInt(index) > parseInt(this.$data.total) || parseInt(index) < 0 || !parseInt(index)) {
                    return
                } else {
                    this.setPage(parseInt(index));
                }
                
			},

			// 下一页
			next: function (index) {
				if(index < this.page.total) {
					index++;
					this.page.cur = index;
//					var $this = this,
//						paras = {
//							"first_load": false,
//							"page": this.$data.cur
//						};
				    this.setPage(index);
//					this.getData($this, paras);
				} else {
					return
				}
			},

			// 前一页
			pre: function (index) {
				if(index > 1) {
					index--;
					this.setPage(index);
				} else {
					return
				}
			},
            setPage: function(index) {
                this.cur = index;
                this.page.cur = index;
            },
			// 获取数据
//			getData: function ($this,paras) {
//				$.ajax({
//					type: "GET",
//					url: "http://www.adminv3.com/user/listRefresh",
//					data: paras,
//					dataType: "json",
//					success: function(res){
//						if(res.code == 0) {
//							var pag = res.data.page;
//							var userlist = res.data.userList;
//							// 设置数据
//							$this.$set("cur", pag.page_num);
//							$this.$set("total", pag.page_total);
//							$this.$set("size", pag.size);
//							$this.$set("dataTotal", pag.total);
//						} else {
//							console.log(res.msg);
//						}
//					}
//				});
//			}
		},
	    computed: {
		    indexs: function () {
			    var $this = this;
			    var ar = []; // 分页数组

			    // 显示当前页的前3条记录
			    if ($this.page.cur > 3) {
				    ar.push($this.page.cur - 3);
				    ar.push($this.page.cur - 2);
				    ar.push($this.page.cur - 1);
				    if (( $this.page.cur - 4 ) >= 1) {
					    $this.$set("showLeftMoreTail", true); // 显示左侧加载更多
				    }
			    } else {
				    $this.$set("showLeftMoreTail", false); // 隐藏左侧加载更多
				    for (var i = 1; i < $this.page.cur; i++) {
					    ar.push(i);
				    }
			    }

			    // 添加当前页
			    ar.push($this.page.cur);

			    // 显示当前页的后三条记录
			    if ($this.page.cur < ( $this.page.total - 3 )) {
				    ar.push($this.page.cur + 1);
				    ar.push($this.page.cur + 2);
				    ar.push($this.page.cur + 3);
				    if ($this.page.cur <= ( $this.page.total - 4 )) {
					    $this.$set("showRightMoreTail", true); // 显示右侧加载更多
				    }
			    } else {
				    $this.$set("showRightMoreTail", false); // 不显示右侧加载更多
				    for (var i = ($this.page.cur + 1); i <= $this.page.total; i++) {
					    ar.push(i);
				    }
			    }

			    return ar;
		    }
	    }
    }
</script>
