<template>
    <div class="home-page-container">
	    <div class="container-title">
		    <span class="undo-title">事务处理：HTML5审核</span>
		    <a href="/review" class="undo-sum">({{h5Ttotal}})</a>
	    </div>
	    <div class="container-body">
		    <div class="container-body-item">
			    <h3 class="body-item-title">注册用户数({{regTotal}})</h3>
			    <div id="userChart" class="body-item-content"></div>
		    </div>
		    <div class="container-body-item">
			    <h3 class="body-item-title">平台产品({{productTotal}})</h3>
			    <div id="productChart" class="body-item-content"></div>
		    </div>
	    </div>
	    <div class="container-body">
		    <div class="container-body-item">
			    <h3 class="body-item-title">设备接入({{deviceTotal}})</h3>
			    <div id="deviceChart" class="body-item-content"></div>
		    </div>
		    <div class="container-body-item">
			    <h3 class="body-item-title">用户应用({{appTotal}})</h3>
			    <div id="appChart" class="body-item-content"></div>
		    </div>
	    </div>
    </div>
</template>
<style>
	.home-page-container {
		margin: 0 25px;
	}
	.container-title {
		padding: 20px 0;
		border-bottom: 1px solid #eee;
	}
	.container-title .undo-sum {
		color: #19BBFF;
	}
    .container-body-item {
	    width: 46%;
	    height: 410px;
	    float: left;
	    margin: 2%;
	    box-shadow: 0 0 10px silver;
	    border-radius: 5px;
	    overflow: hidden;
    }
	.container-body-item .body-item-title {
		font-size: 14px;
		display: inline-block;
		margin-left: 20px;
	}
    .container-body-item .body-item-title:before {
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
	.container-body-item .body-item-content {
		margin: 10px 20px;
		height: 350px;
	}
</style>
<script>
	import echarts from 'echarts';

    export default{
        data(){
            return{
	            regTotal: 0,
                appTotal: 0,
	            productTotal: 0,
	            deviceTotal: 0,
	            h5Ttotal: 0
            }
        },
	    ready(){
		    this.userRegChart(); // 用户注册图表
		    this.productChart(); // 平台产品
		    this.deviceChart(); // 设备接入
		    this.userAppChart(); // 用户应用
		    this.getH5(); // 获取h5审核总数
	    },
	    methods: {

			// 获取H5审核
		    getH5: function () {
			    var url = "/home/h5total",
				    $this = this;
			    this.getData(url, $this, function (reg, $this) {
				    $this.$set("h5Ttotal", reg.total_count)
			    })
		    },
		    // 用户注册图表
	        userRegChart: function () {
				var url = "/home/getLastRegUser",
					$this = this;
		        this.getData(url, $this, function (reg, $this) {
			        $this.$set("regTotal", reg.user_total);

			        var myChart = echarts.init(document.getElementById('userChart'));

			        // 绘制用户注册图表
			        myChart.setOption({
				        color: ['#33DDB3', '#FF9933', '#4FBDEB'],
				        tooltip: {
					        trigger: 'axis'
				        },
				        toolbox: {
					        feature: {
						        magicType: {show: true, type: ['line', 'bar']},
						        restore: {show: true}
					        }
				        },
				        legend: {
					        data:['个人用户','企业用户','用户总数']
				        },
				        xAxis: [
					        {
						        type: 'category',
						        data: reg.aAxis
					        }
				        ],
				        yAxis: [
					        {
						        type : 'value'
					        }
				        ],
				        series: [
					        {
						        name:'个人用户',
						        type:'bar',
						        stack: '用户总数',
						        barWidth : 25,
						        data: reg.series.personal
					        },
					        {
						        name:'企业用户',
						        type:'bar',
						        stack: '用户总数',
						        barWidth : 25,
						        data:reg.series.company
					        },
					        {
						        name:'用户总数',
						        type:'line',
						        label: {
							        normal: {
								        show: true,
								        position: 'top'
							        }
						        },
						        data:reg.series.total
					        }
				        ]
			        })
		        });
	        },
		    productChart: function () {
			    var url = "/home/getProjByInd",
				    $this = this;
			    this.getData(url, $this, function (product, $this) {
				    $this.$set("productTotal", product.proj_total);
				    var productArray = [];
				    var  a = {};
				    for(var i = 0; i < product.series.proj_num.length; i++) {
					    a.value = product.series.proj_num[i];
					    a.name = product.aAxis[i];
					    productArray.push(a);
					    a = {};
				    }
				    var myChart = echarts.init(document.getElementById('productChart'));

				    // 绘制用户图表
				    myChart.setOption({
					    color: ['#E9C345', '#D9833B', '#C35B23', '#D55745', '#915DAF', '#6849A6', '#5197D5', '#57B99D', '#7BD393', '#A3CB53', '#BFC3C5'],
					    tooltip: {
						    trigger: 'item',
						    formatter: "{a} <br/>{b}: {c} ({d}%)"
					    },
					    legend: {
						    orient: 'vertical',
						    x: 'left',
						    data: product.aAxis
					    },
					    series: [
						    {
							    name:'产品分布',
							    type:'pie',
							    radius: ['50%', '70%'],
							    avoidLabelOverlap: false,
							    label: {
								    normal: {
									    show: false,
									    position: 'center'
								    },
								    emphasis: {
									    show: true,
									    textStyle: {
										    fontSize: '30',
										    fontWeight: 'bold'
									    }
								    }
							    },
							    labelLine: {
								    normal: {
									    show: false
								    }
							    },
							    data: productArray
						    }
					    ]
				    })
			    });
		    },
		    deviceChart: function () {
			    var url = "/home/deviceTotal",
			        url1 = "/home/deviceloc",
				    $this = this;
			    var myChart = echarts.init(document.getElementById('deviceChart'));

			    // 获取设备总数
			    this.getData(url, $this, function (device, $this) {
				    $this.$set("deviceTotal", device.total_count);
			    });

			    // 获取设备地理位置
			    this.getData(url1, $this, function (deviceLoc, $this) {
				    var newLoc = [],
					    a = {},
				        b = [];
				    for( var i = 0; i < deviceLoc.length; i++) {
					    a.name = '数据点' + i;
					    b.push(deviceLoc[i].lon);
					    b.push(deviceLoc[i].lat);
					    b.push(deviceLoc[i].value);
					    a.value = b;
					    newLoc.push(a);
					    a = {};
					    b = [];
				    }
					myChart.setOption({
						backgroundColor: '#fff',
						title: {
							left: 'center'
						},
						tooltip : {
							trigger: 'item'
						},
						legend: {
							orient: 'vertical',
							y: 'bottom',
							x:'right',
							data:['在线设备'],
							selectedMode: false
						},
						geo: {
							map: 'china',
							label: {
								emphasis: {
									show: false
								}
							},

							roam: true,
							itemStyle: {
								normal: {
									areaColor: '#323c48',
									borderColor: '#111'
								},
								emphasis: {
									areaColor: '#2a333d'
								}
							}
						},
						series : [
							{
								name: '在线设备',
								type: 'scatter',
								coordinateSystem: 'geo',
								data: newLoc,
								symbolSize: function (val) {
									return val[2] / 10;
								},
								label: {
									normal: {
										formatter: '{b}',
										position: 'right',
										show: false
									},
									emphasis: {
										show: true
									}
								},
								itemStyle: {
									normal: {
										color: '#ddb926'
									}
								}
							}
						]
					})
			    });
		    },
		    userAppChart: function () {
			    var url = "/home/getUserAPP",
				    $this = this;
			    this.getData(url, $this, function (app, $this) {
				    $this.$set("appTotal", app.app_total);
				    var myChart = echarts.init(document.getElementById('appChart'));

				    // 绘制用户图表
				    myChart.setOption({
					    color: ['#33DDB3', '#FF9933', '#4FBDEB'],
					    tooltip: {
						    trigger: 'axis'
					    },
					    toolbox: {
						    feature: {
							    magicType: {show: true, type: ['line', 'bar']},
							    restore: {show: true}
						    }
					    },
					    legend: {
						    data:['公开应用','私有应用','创建应用']
					    },
					    xAxis: [
						    {
							    type: 'category',
							    data: app.aAxis
						    }
					    ],
					    yAxis: [
						    {
							    type : 'value'
						    }
					    ],
					    series: [
						    {
							    name:'公开应用',
							    type:'bar',
							    data: app.series.public
						    },
						    {
							    name:'私有应用',
							    type:'bar',
							    data:app.series.private
						    },
						    {
							    name:'创建应用',
							    type:'line',
							    data:app.series.total
						    }
					    ]
				    })
			    });
		    },

		    // 数据请求函数
		    getData: function (url, $this, callback) {
			    $.ajax({
				    type: "GET",
				    url: url,
				    data: {},
				    dataType: "json",
				    success: function(res){
					    if(res.code == 0) {
						    callback(res.data, $this)
					    } else {
						    console.log(res.msg);
					    }
				    }
			    });
		    }

	    },
        components:{

        }
    }
</script>
