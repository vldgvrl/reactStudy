<template>
  <div class="center">
    <p class="h1 mb-4">
      Kirjaudu sisään
    </p>
    <div class="login-wrapper p-4">
      <b-form @submit.prevent="onSubmit">
        <b-form-group
            id="input-group-1"
            label="Sähköpostiosoite:"
            label-for="input-1"
            class="mb-4"
        >
          <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              placeholder="Sähköposti"
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
              class="mb-4"
          ></b-form-input>
        </b-form-group>

        <div class="flex-center">
          <b-button type="submit" variant="primary">Kirjaudu sisään</b-button>
        </div>
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
        axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/token/get', {
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
          this.$router.push("/Home")
        })
            .catch(error => console.log(error))

      }
    }

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