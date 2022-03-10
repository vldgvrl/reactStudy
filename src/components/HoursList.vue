<template>
  <div class="table-wrapper" id="hours-list">
    <b-alert variant="danger" :show="hasErrors">
        {{errorMessage}}
    </b-alert>
    <b-alert variant="success" :show="success">
        {{successResponse}}
    </b-alert> 
    <b-table striped hover :items="hoursList">
        <template #cell(Id)="data">
            <a href="#" v-b-modal="'modal-prevent-closing'" @click="openPopup(data.value)" >{{ data.value }}</a>
        </template>
    </b-table>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit your hours"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Hours"
          label-for="name-input"
          invalid-feedback=" Please, check the hours should be a number and cannot be empty."
          :state="hoursState"
        >
          <b-form-input
            id="hours-input"
            v-model="hours"
            :state="hoursState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>

import axios from "axios";
export default {

    name: 'hours-list',

    data() {
        return {
            hoursList: [],
            selectedId: '',
            hours: '',
            hoursState: '',
            errorMessage: '',
            hasErrors: false,
            success: false,
            successResponse: '',
        }
    },

    mounted() {
        this.getEvents()
    },

    methods: {

        async getEvents() {
            this.hasErrors = false
            this.errorMessage = ""
            axios.get('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/InfoByYear?Year=2022',
                { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .then(res => {
                    this.hoursList = res.data.Item
                })
                .catch(error => {
                    this.hasErrors = true
                    this.errorMessage = error.response.data.Errors
                    console.log(error)
                })
        },

        async updateHours() {
            this.hasErrors = false
            this.errorMessage = ""
            axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/UpdateHours', 
                {  NewHours: this.hours, RecordId: this.selectedId  },
                { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
                .then(res => {
                    this.success = true
                    this.successResponse = res.data.Response
                    this.getEvents()
                })
                .catch(error => {
                    this.hasErrors = true
                    this.errorMessage = error.response.data.Errors
                    console.log(error)
                })
        },

        clearAlerts() {
            this.success = false,
            this.successResponse = '',
            this.error = false,
            this.errorMessage = ''
        },

        

        //Methods for modal window
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.hoursState = valid
            return valid
        },
        resetModal() {
            this.hours = ''
            this.hoursState = null
        },
        openPopup(id) {
            this.selectedId = id
            this.clearAlerts()
        },
        
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
            return
            }
            // Push the hours to current list
            this.updateHours()
            

            // Hide the modal manually
            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }
}
</script>

<style scoped>
    .table-wrapper {
        padding: 30px 0 30px;
    }
</style>
