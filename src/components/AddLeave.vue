<template>
    <div>
        <p class="homeText mb-5">
            Add leave period
        </p>
        <b-alert variant="danger" :show="showAlertError">
          {{errorResponse}}
        </b-alert>
        <b-alert variant="success" :show="success">
          {{successResponse}}
        </b-alert>
        <div class="form-wrapper">
                <b-form @submit.stop.prevent="handleSubmit" @reset="onReset">
                    <b-form-group
                        id="input-group-1"
                        label="Type of leave:"
                        label-for="input-1"
                        description="Write the type of leave"
                    >
                        <b-form-input
                        id="input-1"
                        name="input-1"
                        v-model="form.LeaveType"
                        type="text"
                        :class="{ 'has-error': submitting && invalidName }"
                        placeholder="Ex.: sick leave, vacation, unpaid leave..."
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidName" class="error-message">❗ Mandatory field</p>
                    </b-form-group>

                    <b-form-group
                        id="input-group-2"
                        label="Period starts from:"
                        label-for="input-2"
                        description="Write a date in format dd/mm/yyyy or choose a date from calendar."
                    >
                        <b-form-input
                        id="input-2"
                        name="input-2"
                        v-model="form.StartDate"
                        type="date"
                        :class="{ 'has-error': submitting && invalidStartDate }"
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidStartDate" class="error-message">❗ Start date is mandatory field</p>
                    </b-form-group>

                    <b-form-group
                        id="input-group-3"
                        label="Period ends at:"
                        label-for="input-3"
                        description="Write a date in format dd/mm/yyyy or choose a date from calendar."
                    >
                        <b-form-input
                        id="input-3"
                        name="input-3"
                        v-model="form.EndDate"
                        type="date"
                        :class="{ 'has-error': submitting && invalidEndDate }"
                        @focus="clearStatus"
                        @keypress="clearStatus"
                        ></b-form-input>
                        <p v-if="submitting && invalidEndDate" class="error-message">❗ End date is mandatory field</p>
                        <p v-if="submitting && datesNotCorrect" class="error-message">❗ End date should be greater than Start date</p>
                    </b-form-group>

                    <div class="button-wrapper">
                        <b-button type="submit" variant="primary">Save</b-button>
                        <b-button type="reset" variant="danger">Cancel</b-button>
                    </div>
                </b-form>
                <div class="result">
                    <b-card class="mt-3" header="Form Data Result">
                        <pre class="m-0">{{ form }}</pre>
                    </b-card>
                </div>
        </div>
        <hours-list/>
    </div>
</template>
<script>
    import HoursList from './HoursList.vue'
    import axios from 'axios'
    import moment from 'moment'


    export default {
        components: { HoursList},
        name: 'AddLeave',

        data() {
            return {
                error: false,
                submitting: false,
                success: false,
                successResponse: '',
                errorResponse: '',
                showAlertError: false,
                form: {
                    LeaveType: '',
                    StartDate: '',
                    EndDate: '',
                },
            }
        },

        computed: {
          //Set validations: field should not be empty, end date should be greater then start date
          invalidName() {
            return this.form.LeaveType === ''
          },
          invalidStartDate() {
            return this.form.StartDate === ''
          },
          invalidEndDate() {
            return this.form.EndDate === ''
          },
          datesNotCorrect() {
                return moment(this.form.StartDate).isAfter(this.form.EndDate)
          }
        },

        methods: {
          handleSubmit() {
            this.submitting = true
            this.clearStatus()

              if (this.invalidName || this.invalidStartDate || this.invalidEndDate || this.datesNotCorrect ) {
                this.error = true
                return
              } 

              this.addEvent(this.form)
              this.error = false
              this.submitting = false
              this.onReset()
          },

          //Call post action with json body. Provide token with 'Authorization' header
          async addEvent(newEvent) {
            axios.post('https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/leave/save',
              {'LeaveType': newEvent.LeaveType, 'StartDate': newEvent.StartDate, 'EndDate': newEvent.EndDate},
              { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
              .then(res => {
                //Set success message to notification box
                this.success = true
                this.successResponse = res.data.Response
              })
              .catch(error => {
                    //Set error message to alert
                    this.showAlertError = true
                    this.errorResponse = error.response.data.Errors
                })

          },



          onReset() {
            // Reset our form values
            this.form.LeaveType = ''
            this.form.StartDate = ''
            this.form.EndDate = ''
          },

          clearStatus() {
            this.success = false
            this.error = false
            this.successResponse = '',
            this.errorResponse = '',
            this.showAlertError = false
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