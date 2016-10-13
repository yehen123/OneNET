<template>
    <table border="" cellspacing="" cellpadding="">
    	<tr><th>Header</th></tr>
    	<tr><td>Data</td></tr>
    	<tr><td>{{t}}</td></tr>
    	
    </table>
    <rd-datepicker :date=datePicker></rd-datepicker>
    <rd-checkbox :checkbox=checkbox></rd-checkbox>
</template>
<script>
    import { rdDatepicker, rdCheckbox } from 'radon-ui'
    export default {
      data() {
        return {
            t:1,
            datePicker: {
                value: '',
                options: {
                    format: 'YYYY/MM/DD',
                    monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    weekList: ['一', '二', '三', '四', '五', '六', '日']
                }
            },
            checkbox: {
                checked: false,
                text: "我已阅读用户协议"
            }
        }
      },
      components: {
          rdDatepicker,
          rdCheckbox
      },
      ready() {
      },
      methods: {
        show: function() {
            this.t = 2
        }
      }
    }
</script>
<style scoped>
</style>