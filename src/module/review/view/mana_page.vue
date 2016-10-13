<template>
    <div>
        <div class="searcher">
            <div class="input-group">
            	<rd-select :select=select1 @change=changeKey></rd-select>
            	<input class="form-control" type="text" v-model="searchData.searchContent">
            </div>
            <div class="input-group">
                <span>产品行业:</span>
            	<rd-select :select=select2 @change=changeSelect></rd-select>
            </div>
            <button class="iconfont icon-search search-btn" @click="search"></button>
        </div>
        <hr>
        <h3 class="table-title">H5列表</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>ZIP包</th>
                    <th>H5地址</th>
                    <th>产品ID</th>
                    <th>产品名称</th>
                    <th>产品行业</th>
                    <th>用户ID</th>
                    <th>企业名称</th>
                    <th>上传时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <!--<tr v-for="col in tableData">
                    <td>{{col[0]}}</td>
                    <td>{{col[1]}}</td>
                    <td>{{col[2]}}</td>
                    <td>{{col[3]}}</td>
                    <td>{{col[4]}}</td>
                    <td>{{col[5]}}</td>
                    <td>{{col[6]}}</td>
                    <td>{{col[7]}}</td>
                    <td>
                        <rd-switch :value=col[8]></rd-switch>
                    </td>
                    <td>
                       <a role="button" class="tab" uid="3">产品信息</a>
                       <a role="button" class="review">审核</a>
                   </td>
                </tr>-->
                <tr v-if="noData"><td colspan="9">没有数据</td></tr>
                <tr v-for="col in tableData">
                    <td><a href="{{col.dopm}}">点击下载</a></td>
                    <td><a href="{{col.dopm_index}}">点击访问</a></td>
                    <td>{{col.product_id || '-'}}</td>
                    <td>{{col.product_name || '-'}}</td>
                    <td>{{col.industry || '-'}}</td>
                    <td>{{col.user_id || '-'}}</td>
                    <td>{{col.company_name || '-'}}</td>
                    <td>{{col.create_time || '-'}}</td>
                    <td>
                       <a role="button" class="tab" uid="{{col.user_id}}" pid="{{col.product_id}}">查看详情</a>
                       <a role="button" class="review" did="{{col.dopm_id}}">审核</a>
                   </td>
                </tr>
            </tbody>
        </table>
        <pagin v-if="!noData" :page.sync="page"></pagin>
    </div>
</template>
<script>
    import { rdDatepicker, rdSwitch, rdSelect } from 'radon-ui'
    import pagin from 'components/paging'
    var sData = {};
    export default {
      data() {
        return {
            noData: true,
            tableData: [],
            searchData: {
                searchType: 1,
                searchContent: '',
                formData: {
                    per_page: 10,
                    page: 1,
                    industry: 0
                }
            },
            page: {
                total: 1,
                dataTotal: 1,
                cur: 1,
            },
            checkData: {
                id: '',
                status: 2,
                reason: null,
            },
            tableData: [],
            select1: {
                // 获取select选择的对象, 多选时为Array, 单选时为Object
                value   :{},
                //开启搜索
//              search:true,
                // 是否为多选 :Boolean, 默认为false
                multiple: false,
                // 提供待选对象集合
                options: [{
                    // 选中状态 :Boolean
                    selected: true,
                    // 可用状态 :Boolean
                    disabled: false,
                    // 展示值 :String
                    value: '产品ID',
                    // 其他自定义属性
                    val: 1 
                }, {
                    selected: false,
                    value: '产品名称',
                    val: 2 
                }, {
                    selected: false,
                    value: '用户ID',
                    val: 3 
                }, {
                    selected: false,
                    value: '企业名称',
                    val: 4 
                }]
            },
            select2: {
                value   :{},
                key: 'industry',
                options: [{
                    selected: true,
                    value: '请选择',
                    val: 0
                },{
                    selected: false,
                    value: '智能家居',
                    val: 1
                }, {
                    selected: false,
                    value: '车载设备',
                    val: 2
                }, {
                    selected: false,
                    value: '可穿戴设备',
                    val: 3
                }, {
                    selected: false,
                    value: '医疗保健',
                    val: 4
                }, {
                    selected: false,
                    value: '智能玩具',
                    val: 5
                }, {
                    selected: false,
                    value: '新能源',
                    val: 6
                }, {
                    selected: false,
                    value: '运动监控',
                    val: 7
                }, {
                    selected: false,
                    value: '智能教育',
                    val: 8
                }, {
                    selected: false,
                    value: '环境监控',
                    val: 9
                }, {
                    selected: false,
                    value: '办公设备',
                    val: 10
                }, {
                    selected: false,
                    value: '其他',
                    val: 11
                }]
            }
        }
      },
      watch: {
          'page.cur': function(val, oldVal) {
              sData['page'] = val;
              this.query(sData);
          }
      },
      components: {
          rdSwitch,
          rdSelect,
          pagin
      },
      ready() {
        if(this.noData == true) {
            this.init();
        }
        let _this = this;
        $('#app').on('click', '.rd-radio', function() {
            $(this).parents('.rd-radio-group').find('.checked').removeClass('checked');
            $(this).addClass('checked');
            if($(this).hasClass('pass')) {
                _this.checkData.status = 2;
                $(".audit .reply").hide();
            } else {
                _this.checkData.status = -1;
                $(".audit .reply").show();
            }
        })
      },
      methods: {
        init: function() {
            sData = {
                per_page: 10,
                page: 1
            }
            let _this = this;
            $(".table").on('click', ".review", function() {
                _this.checkData.id = $(this).attr('did');
                _this.checkData.status = 2;
                _this.checkData.reason = null;
                $('.audit .checked').removeClass('checked');
                $('.audit .reply').hide();
                $('.pass').addClass('checked');
                _this.showModal();
            })
            this.query(sData);
        },
        showModal: function() {
            let _this = this;
            _this.$Modal.confirmWithHTML(
                '审核',
                '<div class="audit">'+
                '<div><span>审核操作：</span><span><div class="rd-radio-group"><label class="rd-radio checked pass"> <span class="rd-radio-inner"></span> <span class="rd-radio-value">审核通过</span> </label><label class="rd-radio reject"> <span class="rd-radio-inner"></span> <span class="rd-radio-value">审核驳回</span> </label></div></span></div>'+
                '<div class="reply"><span>驳回意见：</span><span><textarea placeholder="请输入驳回意见" class="textarea"></textarea></span></div>'+
                '</div>',
                () => {
                    if(_this.checkData.status == -1) {
                        const val = $('.audit').find('.textarea').val();
                        if(val == '') {
                            _this.$Notification.warning('请给出驳回意见', '', 5000);
                            return false;
                        }
                        _this.checkData.reason = val;
                    }
                    _this.check()
                },
                () => {
                }
            )
        },
        changeSelect: function(select, value) {
            this.searchData.formData[select.key] = value.val;
        },
        changeKey: function(select, value) {
            this.searchData.searchType = value.val;
        },
        search: function() {
            let _this = this;
            sData = {};
            this.page.cur = 1;
            for(let i in this.searchData.formData) {
                if(typeof this.searchData.formData[i] !== "object") {
                    sData[i] = this.searchData.formData[i];
                }
            }
            if(this.searchData.searchContent.length > 0) {
                sData['searchType'] = this.searchData.searchType;
                sData['searchContent'] = this.searchData.searchContent;
            }
            this.query(sData);
        },
        refreshTable: function(items) {
            this.tableData = [];
            for(var i in items) {
                this.tableData.$set(i, items[i]);
            }
        },
        query: function(fromData) {
            let _this = this;
            $.ajax({
                url: "/review/search",
                data: fromData,
                success: function(res) {
                    if(res.code == 500 || res.data.items.length == 0) {
                        _this.refreshTable();
                        _this.noData = true;
                        return;
                    }
                    _this.page.dataTotal = res.data.total_count;
                    _this.page.total = Math.ceil(res.data.total_count/10);
                    _this.refreshTable(res.data.items);
                    _this.noData = false;
                }
            })
        },
        check: function() {
            let _this = this;
            $.ajax({
                type: 'post',
            	url: "/review/check",
            	data: {
            	    dopm_id: _this.checkData.id,
            	    status: _this.checkData.status,
            	    reason: _this.checkData.reason
            	},
            	success: function(res) {
            	    if(res.code != 0) {
            	        console.log(res.msg);
            	        return;
            	    }
            	    _this.query(sData);
            	    _this.$Notification.success('操作成功', '', 5000)
            	}
            });
        }
      }
    }
</script>
<style>
    .audit>div {
        margin-top: 20px;
        line-height: 32px;
    }
    .audit>div>span {
        display: inline-block;
        vertical-align: top;
        color: #666;
    }
    .audit>div>span:nth-child(1) {
        width: 16%;
        text-align: right;
    }
    .audit>div>span:nth-child(2) {
        width: 80%;
        margin-left: 3%;
    }
    .audit .reply {
        display: none;
    }
    .audit .form-control {
        margin: 0;
        height: 30px;
        width: 80%;
        font-size: 12px;
    }
    .audit textarea {
        width: 100%;
        height: 120px;
        font-size: 12px;
        padding: 10px 12px;
        resize: none;
        line-height: 1.42857143;
        color: #555;
        border: 1px solid #dcdee3; 
        border-radius: 4px;
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    .audit textarea:focus {
        border-color: rgba(65,216,255,1);
        outline: 0;
        -webkit-box-shadow: 0 0 8px rgba(65,216,255,0.5);
        box-shadow: 0 0 8px rgba(65,216,255,0.5);
    }
</style>