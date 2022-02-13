<template>
  <div>
    <p class="homeText">
      Tervetuloa tapahtumakalenteriin
    </p>
    <event-list/> 
  </div>

</template>
<script>
import EventList from './EventList.vue'
export default {
  name: 'Home',
  components: {
    EventList
  },

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