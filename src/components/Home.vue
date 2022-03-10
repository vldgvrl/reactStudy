<template>
  <div>
    <b-alert variant="danger" :show="hasErrors">
      {{errorMessage}}
    </b-alert>
    <p class="homeText">
      Current year hours
    </p>
    <hours-list/>
  </div>

</template>
<script>
import HoursList from './HoursList.vue'
export default {
  name: 'Home',
  components: {
    HoursList
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