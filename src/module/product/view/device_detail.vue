<template>
    <div class="table-title">设备详情<a role="button" class="back"><i class="icon-angle-left"></i>返回列表</a></div>
    <div class="sub-title">
        [ 设备信息 ]
    </div>
    <ul v-if="post.pub" class="detail-list">
        <li>
            <span>设备ID :</span><span>{{list.id}}</span>
        </li>
        <li>
            <span>设备名称 :</span><span>{{list.name}}</span>
        </li>
        <li>
            <span>设备位置 :</span><span v-if="list.location">{{list.location.lat}}, {{list.location.lon}}</span>
        </li>
        <li>
            <span>接入时间 :</span><span>{{list.accept_time}}</span>
        </li>
        <li>
            <span>产品ID :</span><span>{{list.product_id}}</span>
        </li>
        <li>
            <span>产品名称 :</span><span>{{list.product_name}}</span>
        </li>
        <li>
            <span>设备是否在线 :</span><span v-if="list.online">在线</span><span v-else>离线</span>
        </li>
    </ul>
    <ul v-else class="detail-list">
    	<li>
            <span>设备ID :</span><span>{{list.device_id}}</span>
        </li>
        <li>
            <span>接入时间 :</span><span>{{list.accept_time}}</span>
        </li>
        <li>
            <span>产品ID :</span><span>{{list.product_id}}</span>
        </li>
        <li>
            <span>产品名称 :</span><span>{{list.product_name}}</span>
        </li>
        <li>
            <span>设备是否在线 :</span><span v-if="list.online">在线</span><span v-else>离线</span>
        </li>
    </ul>
    <div v-if="post.pub">
        <div class="sub-title">
            [ 设备数据流 ]
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>数据流名称</th>
                    <th>最新数据</th>
                    <th>更新时间</th>
                </tr>
            </thead>
            <tbody v-if="loading" class="loadingBg">
                <tr><td colspan="9"><rd-spin></rd-spin></td></tr>
            </tbody>
            <tbody>
                <tr v-if="noData"><td colspan="9">没有数据</td></tr>
                <tr v-for="col in datastream">
                    <td>{{col.name || '-'}}</td>
                    <td>{{col.lastest_value || '-'}}</td>
                    <td>{{col.update_time || '-'}}</td>
                </tr>
            </tbody>
        </table>
        <pagin v-if="!noData" :page.sync="page"></pagin>
    </div>
    
    <!--<hr>
    <div class="table-title">html5包</div>
    <ul class="detail-list">
        <li>
            <span>ZIP包 :</span>
            <span><a href="http://upfiles.heclouds.com/123/ueditor/2016/07/08/xxx.zip">http://upfiles.heclouds.com/123/ueditor/2016/07/08/xxx.zip</a></span>
            <span class="auditing">审核通过</span>
        </li>
        <li>
            <span>H5访问地址 :</span><span><a href="http://upfiles.heclouds.com/123/ueditor/2016/07/08/xxx/index.html">http://upfiles.heclouds.com/123/ueditor/2016/07/08/xxx/index.html</a></span>
        </li>
    </ul>-->
</template>
<script>
    import pagin from 'components/paging'
    import { rdSpin } from 'radon-ui'
    var sData = {};
    export default {
      data() {
        return {
            noData: true,
            loading: false,
            list: {},
            datastream: [],
            page: {
                total: 1,
                cur: 1,
            },
        }
      },
      watch: {
          'page.cur': function(val, oldVal) {
              sData['page'] = val;
              this.query(sData);
          }
      },
      components: {
          pagin,
          rdSpin
      },
      ready() {
          let _this = this;
          var oData = {};
          if(this.post.pub) {
              oData.id = _this.post.id;
          } else {
              oData.device_id = _this.post.id;
          }
          $.ajax({
              url: _this.post.url,
              data: oData,
              success: function(res) {
                  if(res.code != 0) {
                      console.log(res.msg);
                      return
                  }
                  for(let i in res.data) {
                      _this.$set('list.'+i, res.data[i]);
                  }
                  
              }
          })
          if(this.post.pub) {
            sData = {
                per_page: 10,
                page: 1,
                device_id:  this.post.id
            }
            this.query(sData);
          }
      },
      methods: {
        refreshTable: function(items) {
            this.datastream = [];
            for(var i in items) {
                this.datastream.$set(i, items[i]);
            }
        },
        query: function(fromData) {
            let _this = this;
            _this.loading = true;
            $.ajax({
              url: '/device/datastreamPub',
              data: fromData,
              success: function(res) {
                  if(res.code != 0) {
                      _this.noData = true;
                      return
                  }
                  _this.page.total = Math.ceil(res.data.total_count/10);
                  _this.refreshTable(res.data.items);
                  _this.noData = false;
              },
              complete: function() {
                  _this.loading = false;
              }
          })
        }
      },
      props: ['post'],
    }
</script>
<style scoped>
.back {
    float: right;
    font-size: 12px;
    color: #19bbff;
}
.back:hover {
    color: #41dbff;
}
.back>i {
    margin-right: 10px;
}
.sub-title {
    color: #333;
    margin-left: 30px;
    line-height: 30px;
}
.detail-list li {
    line-height: 35px;
    white-space: nowrap;
}
.detail-list li span:nth-child(1) {
    display: inline-block;
    width: 160px;
    margin-right: 5px;
    text-align: right;
}
.auditing {
    margin-left: 20px;
    color: #2cd188;
}
</style>