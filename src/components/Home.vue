<template>
  <div>
    <p class="homeText">
      Tervetuloa tapahtumakalenteriin
    </p>
    <div class="mt-5">
      <button @click="sendToken">
        Send token
      </button>
    </div>

    <event-list/> 
  </div>

</template>
<script>
import EventList from './EventList.vue'
import axios from "axios";
export default {
  name: 'Home',
  components: {
    EventList
  },

  methods : {
    async sendToken() {
      axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/v1/addhours?HoursTrackIId=147&NewValue=50',
          {},{ headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
          .then(res => {
            console.log(res);
            console.log('token from storage:');
            console.log(localStorage.getItem('token'))
          })
          .catch(error => console.log(error))

    }
  }

}
</script>
<style scoped>
.homeText{
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top:30px;
  text-shadow: 2px 2px 2px gray;
}
</style>