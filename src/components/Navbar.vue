<template>
  <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
      class="px-10">
    <b-navbar-brand class="mx-5">Employee Flex Time App</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'Home' }" v-if='auth'>Home</b-nav-item>
      <b-nav-item :to="{ name: 'AddEvent' }"  v-if='auth'>Add leave period</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    auth () {
      return true//this.$store.getters.ifAuthenticated
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