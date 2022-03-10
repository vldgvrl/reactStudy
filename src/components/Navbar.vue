<template>
  <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
      class="px-10">
    <b-navbar-brand class="mx-5">Employee Flex Time App</b-navbar-brand>
    <b-collapse id="nav-collapse" class="nav-with-username" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }" v-if='auth'>Home</b-nav-item>
        <b-nav-item :to="{ name: 'AddLeave' }"  v-if='auth'>Add leave period</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if='auth' right >
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="onLogout" >Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{ name: 'Login' }" v-if='!auth' right>Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
      return {
        userName: localStorage.getItem('userName')
      }
  },

  computed: {

    auth(){
      if (window.localStorage.getItem('userName') !== null) {
        return true
      } else {
        return false
      }
    }
    
  },

  

  methods: {
    //Clean the local storage
    onLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')

      //Redirect user to login page
      this.$router.push('Login')

      //refresh the page in order to menu items disappeared 
      location.reload()
    }
  }


}

</script>

<style scoped>
 .nav-with-username {
    justify-content: space-between;
    padding-right: 30px;
  } 
</style>