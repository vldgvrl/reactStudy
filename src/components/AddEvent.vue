<template>
    <div>
        <p class="homeText">
            Syötä tapahtuma
        </p>
        <div class="form-wrapper">
                <b-form @submit.stop.prevent="handleSubmit" @reset="onReset">
                    <b-form-group
                        id="input-group-1"
                        label="Tapahtuman nimi:"
                        label-for="input-1"
                        description="Kirjoita tähän vain tapahtuman nimi, älä aikaa, paikkaa tai järjestäjää."
                    >
                        <b-form-input
                        id="input-1"
                        name="input-1"
                        v-model="form.name"
                        type="text"
                        :class="{ 'has-error': submitting && invalidName }"
                        placeholder="Syötä tapahtuman nimi"
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidName" class="error-message">❗ Nimi kenttä on pakollinen</p>
                    </b-form-group>

                    <b-form-group
                        id="input-group-2"
                        label="Päivämäärä:"
                        label-for="input-2"
                        description="Kirjoita päivämäärä muodossa kk/pp/vvvv tai valitse se kalenterista."
                    >
                        <b-form-input
                        id="input-2"
                        name="input-2"
                        v-model="form.date"
                        type="date"
                        :class="{ 'has-error': submitting && invalidDate }"
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidDate" class="error-message">❗ Päivämäärä on pakollinen kenttä</p>
                    </b-form-group>

                    <b-form-group
                        id="input-group-3"
                        label="Tapahtuman paikka:"
                        label-for="input-3"
                        description="Kirjoita paikan nimi tai osoite sekä kunta"
                    >
                        <b-form-input
                        id="input-3"
                        name="input-3"
                        v-model="form.place"
                        :class="{ 'has-error': submitting && invalidPlace }"
                        placeholder="esim. Helsinki"
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidPlace" class="error-message">❗ Paikka kenttä on pakollinen</p>
                        <p v-if="success" class="success-message">✅ Tallennettu onnistuneesti</p>
                    </b-form-group>

                    <div class="button-wrapper">
                        <b-button type="submit" variant="primary">Lisää tapahtuma</b-button>
                        <b-button type="reset" variant="danger">Kumoa</b-button>
                    </div>
                </b-form>
                <div class="result">
                    <b-card class="mt-3" header="Form Data Result">
                        <pre class="m-0">{{ form }}</pre>
                    </b-card>
                </div>
        </div>
        <event-list/>
    </div>
</template>
<script>
    import EventList from './EventList.vue'


    export default {
        components: { EventList },
        name: 'AddEvent',

        data() {
            return {
                error: false,
                submitting: false,
                success: false,
                form: {
                    id: '',
                    name: '',
                    date: '',
                    place: ''
                },
            }
        },

        computed: {
          invalidName() {
            return this.form.name === ''
          },
          invalidDate() {
            return this.form.date === ''
          },
          invalidPlace() {
            return this.form.place === ''
          },
        },

        methods: {
          handleSubmit() {
            this.submitting = true
            this.clearStatus()

              if (this.invalidName || this.invalidDate || this.invalidPlace) {
                this.error = true
                return
              }

              this.addEvent(this.form)
              this.error = false
              this.success = true
              this.submitting = false
          },

          async addEvent(newEvent) {
            try {
              const response=await fetch('http://localhost:3001/events', {
                method: 'POST',
                body: JSON.stringify(newEvent),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
              })
              const data=await response.json()
              this.events=[...this.events, data]
            } catch(error) {
              console.error(error)
            }
          },



          onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.date = ''
            this.form.place= ''
          },

          clearStatus() {
            this.success = false
            this.error = false
          }
        }
    }

</script>
<style scoped>
    .homeText{
        font-size: 35px;
        color: red;
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

    .form-wrapper [class*='-message'] {
      font-weight: 500;
    }

    .form-wrapper .error-message {
      color: #d33c40;
    }

    .form-wrapper .success-message {
      color: #32a95d;
    }
    .form-group {
        margin-bottom: 1rem;
    }
    .button-wrapper {
        display: flex;
        justify-content: space-between; 

    }
    .result {
        width: 50%;
    }
</style>