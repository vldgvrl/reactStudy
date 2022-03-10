<template>
  <div>
    <b-alert variant="danger" :show="hasErrors">
      {{errorMessage}}
    </b-alert>
    <div class="center">
      <p class="h1 mb-4 mt-4">
        Login
      </p>
      <div class="login-wrapper p-4">
        <b-form @submit.prevent="onSubmit">
          <b-form-group
              id="input-group-1"
              label="Email"
              label-for="input-1"
              class="mb-4"
          >
            <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                placeholder="Email address"
                required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
                id="input-2"
                v-model="password"
                type="password"
                placeholder="Your password"
                required
                class="mb-4"
            ></b-form-input>
          </b-form-group>

          <div class="flex-center">
            <b-button type="submit" :disabled="loading" variant="primary">
              Login
              <b-spinner small variant="light" v-show='loading'></b-spinner>
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    state: {
      Token: null,
      UserId: null,
      UserName: null,
    },

    data () {
      return {
        email: '',
        password: '',
        loading: false,
        dismissSecs: 5,
        dismissCountDown: 0,
        errorMessage: '',
        hasErrors: false
      }
    },


    methods : {
      async onSubmit () {
        this.loading = true
        this.hasErrors = false
        this.errorMessage = ""
        axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/token/get', {
          UserName: this.email,
          Password: this.password
        })
      .then(res => {
          localStorage.setItem('token', res.data.Token)
          localStorage.setItem('userId', res.data.UserId)
          localStorage.setItem('userName', res.data.UserName)
          this.$router.push("/")
          location.reload()

        })
            .catch(error => {
              this.hasErrors = true
              this.errorMessage = error.response.data.Errors
              console.log(error)
              this.loading = false
            })

      },

    },
   }


</script>
<style scoped>
.center {
  margin: 0 auto 0;
  width: 20%;

}
.flex-center {
  display: flex;
  justify-content: center;
}
.login-wrapper {
  display: flex;
  padding: 30px 0 30px;
  text-align: left;
  justify-content: space-between;
  background-color: lightblue;
  border-radius: 4px;
}
.h1 {
  font-weight: 500;
  font-size: 28px;
}
</style>