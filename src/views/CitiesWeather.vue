<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
        <v-data-table
            v-if="getWeathers.length > 0"
            :headers="headers"
            :search="search"
            :items="getWeathers"
            :items-per-page="5"
            class="elevation-1 text-center"
        >
          <template v-slot:body="{ items }">
            <tbody style="margin-top: 50px">
            <tr
                v-for="item in items"
                :key="item.id"
            >
              <td>{{item.city}}</td>
              <td>{{item.country}}</td>
              <td>{{item.day.toFixed(2)}}</td>
              <td>{{item.night.toFixed(2)}}</td>
              <td>{{item.evening.toFixed(2)}}</td>
              <td>{{item.morning.toFixed(2)}}</td>
              <td>{{item.description}}</td>
              <td>
                <v-img :src="getThumbnail(item.icon)"/>
              </td>
              <td>{{formatDate(item.date)}}</td>
            </tr>
            </tbody>
          </template>
        </v-data-table>
          <div
              v-else
              class="no-data-found">
            No Weather Available.
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment/moment";

export default {
  name: 'CitiesWeather',
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'City',
          align: 'center',
          sortable: false,
          value: 'city',
        },
        { text: 'Country', align: 'center', value: 'country',  sortable: false},
        { text: 'Day', align: 'center', value: 'day' },
        { text: 'Night', align: 'center', value: 'night' },
        { text: 'Evening', align: 'center', value: 'eve' },
        { text: 'Morning', align: 'center', value: 'morn' },
        { text: 'Description', align: 'center', value: 'description',  sortable: false },
        { text: 'Icon', align: 'center', value: 'icon',  sortable: false },
        { text: 'Date', align: 'center', value: 'date' },
      ],
    }
  },
  mounted() {
    this.$store.dispatch('getWeathers');
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY')
    },
    getThumbnail(icon) {
      return `http://openweathermap.org/img/wn/${icon}.png`
    }
  },
  computed:{
    ...mapGetters(['getWeathers'])
  },
}
</script>
