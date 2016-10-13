<template>
    <component 
        :uid="uid"
        :pid="pid" 
        :is="currentView" 
        >
    </component>
</template>
<script>
    import page from './mana_page'
    import detail from './detail'
    export default {
      data() {
        return {
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
              _this.uid = $(this).attr('uid');
              _this.pid = $(this).attr('pid');
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