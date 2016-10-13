<template>
    <div>
        <div class="searcher">
            <div class="input-group">
                <rd-select :select=select1 @change=changeKey></rd-select>
                <input class="form-control" type="text" v-model="searchData.inputVal">
            </div>
            <div class="input-group">
                <span>产品行业:</span>
                <rd-select :select=select2 @change=changeSelect></rd-select>
            </div>
            <div class="input-group">
                <span>设备协议:</span>
                <rd-select :select=select3 @change=changeSelect></rd-select>
            </div>
            <button class="iconfont icon-search search-btn" @click="search"></button>
        </div>
        <hr>
        <h3 class="table-title">产品列表</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>产品ID</th>
                    <th>产品名称</th>
                    <th>产品行业</th>
                    <th>产品类别</th>
                    <th>接入协议</th>
                    <th>接入设备</th>
                    <th>创建时间</th>
                    <th>用户ID</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="loading" class="loadingBg">
                <tr><td colspan="9"><rd-spin></rd-spin></td></tr>
            </tbody>
            <tbody>
                <tr v-if="noData"><td colspan="9">没有数据</td></tr>
                <tr v-for="row in tableData">
                    <td>{{row.id || '-'}}</td>
                    <td>{{row.name || '-'}}</td>
                    <td>{{row.industry || '-'}}</td>
                    <td>{{row.category || '-'}}</td>
                    <td>{{row.protocol || '-'}}</td>
                    <td>{{row.device_total || '-'}}</td>
                    <td>{{row.create_time || '-'}}</td>
                    <td>{{row.user_id || '-'}}</td>
                    <!--<td>
                        <rd-switch :value=row[8]></rd-switch>
                    </td>-->
                    <td>
                       <a role="button" class="tab" uid="{{row.id}}" type="{{searchData.formData.type}}">查看详情</a>
                       <!--<a role="button" class="review">审核</a>-->
                   </td>
                </tr>
            </tbody>
        </table>
        <pagin v-if="!noData" :page.sync="page"></pagin>
    </div>
</template>
<script>
    import { rdDatepicker, rdSpin, rdSelect } from 'radon-ui'
    import pagin from 'components/paging'
    var sData = {};
    export default {
      data() {
        return {
            noData: true,
            loading: false,
            tableData: [],
            searchData: {
                inputName: 'product_id',
                inputVal: '',
                formData: {
                    type: "PUBLIC",
                    per_page: 10,
                }
            },
            page: {
                total: 1,
                dataTotal: 1,
                cur: 1,
            },
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
                    val: 'product_id'
                }, {
                    selected: false,
                    value: '产品名称',
                    val: 'product_name'
                }, {
                    selected: false,
                    value: '用户ID',
                    val: 'user_id'
                }]
            },
            select2: {
                key: 'industry',
                value   :{},
                options: [{
                    selected: true,
                    value: '请选择',
                    val: ''
                }]
            },
            select3: {
                key: 'type',
                value   :{},
                options: [{
                    selected: true,
                    value: '公开',
                    val: 'PUBLIC'
                }, {
                    selected: false,
                    value: '私有',
                    val: 'PRIVATE'
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
          rdSpin,
          rdSelect,
          pagin
      },
      ready() {
        if(this.noData == true) {
            this.init();
        }
      },
      methods: {
        init: function() {
            let _this = this;
            $.ajax({
                url: "/product/name",
                type: "get",
                dataType: "json",
                success: function(res) {
                    for(var i in res.industry) {
                        _this.select2.options.push({selected: false, value: res.industry[i], val: i});
                    }
//                  _this.select2 = res.industry;
                },
            })
            sData = {
                type: "PUBLIC",
                per_page: 10,
                page: 1
            }
            this.query(sData);
        },
        changeSelect: function(select, value) {
            this.searchData.formData[select.key] = value.val;
        },
        changeKey: function(select, value) {
            this.searchData.inputName = value.val;
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
            if(this.searchData.inputVal.length > 0) {
                sData[this.searchData.inputName] = this.searchData.inputVal;
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
            this.loading = true;
            $.ajax({
                url: "/product/select",
                type: "get",
                dataType: "json",
                data: fromData,
                success: function(res) {
                    if(res.code == 500) {
                        _this.refreshTable();
                        _this.noData = true;
                        return;
                    }
                    _this.page.dataTotal = res.data.total_count;
                    _this.page.total = Math.ceil(res.data.total_count/10);
                    _this.refreshTable(res.data.items);
                    _this.noData = false;
                },
                complete: function() {
                    _this.loading = false;
                }
            })
        }
      }
    }
</script>
<style>
    .rd-modal {
        border-radius: 5px;
        overflow: hidden;
    }
    .rd-modal-body, .rd-modal-header {
        padding: 0.7rem;
    }
    .rd-modal-header {
        font-size: 14px;
        color: #333;
        background-color: #f0f1f5;
    }
    .searcher {
        padding: 10px 0;
    }
    .searcher .search-btn {
        width: 30px;
        height: 30px;
        padding: 0;
        background-color: #fff;
        outline: none;
        border: 1px solid #d9d9d9;
        color: #19bbff;
        border-radius: 4px;
        font-size: 14px;
    }
    .input-group {
        display: inline-block;
        margin-right: 60px;
        margin-top: 20px;
    }
    .input-group>*:nth-child(2) {
        margin-left: 10px;
    }
    .input-group>.rd-select-container {
        display: inline-block;
        width: 120px;
        vertical-align: middle;
    }
    .input-group>.form-control {
        display: inline-block;
        width: 180px;
        height: 32px;
        margin-top: 0;
        margin-bottom: 0;
        border-radius: 6px;
    }
    .audit>div {
        margin-top: 20px;
    }
    .audit>div span {
        display: inline-block;
        vertical-align: top;
        color: #666;
    }
    .audit span:nth-child(1) {
        width: 16%;
        text-align: right;
    }
    .audit span:nth-child(2) {
        width: 80%;
        margin-left: 3%;
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
        padding: 10px 20px;
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