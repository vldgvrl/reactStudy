<template>
  <b-navbar
      toggleable="md"
      type="dark"
      variant="info">
    <b-navbar-brand :to="{ name: 'Home' }" v-if='auth'>Tapahtumakalenterista</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'AddEvent' }"  v-if='auth'>Lisää tapahtuma</b-nav-item>
      <b-nav-item :to="{ name: 'EventList' }" v-if='auth'>Listaa tapahtuma</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    auth () {
      return this.$store.getters.ifAuthenticated
    }
  },
  methods: {
    AddEvent(){
      //console.log('Add event')

    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}

</script>

<style scoped>

</style>