<template>
  <div>
    <p class="homeText">
      Kirjaudu sisään
    </p>
    <div class="form-wrapper">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >
          <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              placeholder="Enter email"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Lisää salasana:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              placeholder="Salasana"
              required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Kirjaudu sisään</b-button>
      </b-form>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'

  export default {
    state: {
      Token: null,
      UserId: null,
      UserName: null
    },

    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods : {
      async onSubmit () {
        axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/v1/login', {
          UserName: this.email,
          Password: this.password
        })
      .then(res => {
          console.log(res)
        /**
        commit('authUser', {
            token: res.data.Token,
            userId: res.data.UserId,
            userName: res.data.UserName
          })*/
          localStorage.setItem('token', res.data.Token)
          localStorage.setItem('userId', res.data.UserId)
          localStorage.setItem('userName', res.data.UserName)
          this.$router.push("/EventList")
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
.form-wrapper {
  display: flex;
  padding: 30px 0 30px;
  text-align: left;
  justify-content: space-between;
}
</style>