<template>
    <component :is="currentView"></component>
</template>
<script>
    import page from './applist_page'
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
      },
      methods: {
           
      }
    }
</script>
<style>
</style>