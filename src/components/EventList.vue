<template>
  <div class="table-wrapper" id="event-list">
    <b-table striped hover :items="events"></b-table>
    <!-- Default table
    <table>
      <tbody>
      <tr v-for="event in events" :key="event.id">
        <td>{{ event.name }}</td>
        <td>{{ event.date }}</td>
        <td>{{ event.place }}</td>
      </tr>
      </tbody>
    </table>
    -->
  </div>
</template>
<script>


export default {

    name: 'event-list',

    data() {
        return {
            events: [],
        }
    },

    mounted() {
        this.getEvents()
    },

    methods: {

        async getEvents() {
            try {
                const response = await fetch('http://localhost:3001/events')
                const data = await response.json()
                this.events = data
            } catch (error) {
                console.error(error)
            }
        }

    }
}
</script>

<style scoped>
    .table-wrapper {
        padding: 30px 0 30px;
    }
</style>
