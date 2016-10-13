<template>
    <component :is="currentView" :post="postData"></component>
</template>
<script>
    import page from './plist_page'
    import detail from './detail'
    export default {
      data() {
        return {
            postData: {
                id: '',
                type: '',
                url: '/product/proinfo',
                page: 'plist'
            },
            currentView: 'page'
        }
      },
      components: {
          page,
          detail,
      },
      ready() {
          let _this = this;
          $('.container-fluid').on('click', '.tab', function() {
              _this.postData.id = $(this).attr('uid');
              _this.postData.type = $(this).attr('type');
              _this.currentView = 'detail';
          })
          $('.container-fluid').on('click', '.back', function() {
              _this.currentView = 'page';
          })
      },
      methods: {
           
      }
    }
</script>
<style>
</style>