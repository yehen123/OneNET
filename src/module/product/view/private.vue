<template>
    <component :is="currentView" :post="postData"></component>
</template>
<script>
    import page from './private_page'
    import detail from './device_detail'
    export default {
      data() {
        return {
            postData: {
                id: '',
                url: '/device/priInfo',
                pub: false
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