<template>
  <div class="table-wrapper" id="hours-list">
    <b-table striped hover :items="hoursList"></b-table>
  </div>
</template>
<script>

import axios from "axios";
export default {

    name: 'hours-list',

    data() {
        return {
            hoursList: [],
        }
    },

    mounted() {
        this.getEvents()
    },

    methods: {

        async getEvents() {
            axios.get('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/InfoByYear?Year=2022',
                { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .then(res => {
                    this.hoursList = res.data.Item
                })
                .catch(error => console.log(error))
        }

    }
}
</script>

<style scoped>
    .table-wrapper {
        padding: 30px 0 30px;
    }
</style>
