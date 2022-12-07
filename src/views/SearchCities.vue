<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form
            ref="personalDetailsForm"
            lazy-validation
            @submit="submitForm">
          <v-row class="text-center">
            <v-col cols="10">
              <input
                  type="text"
                  placeholder="Search City"
                  ref="search"
                  v-model="city"
                  class="search-input-borders"
                  @input="handleInput"
              />
            </v-col>
            <v-col cols="2">
              <v-btn
                  :loading="loading"
                  :disabled="loading"
                  @click="submitForm">
                  search
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row class="text-left scrollbar" v-if="typing">
          <v-col cols="12" v-for="place in getPlaces" class="scroll-items" @click="handleClick(place)">
            {{place.description}}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
            :headers="headers"
            :items="getWeather"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:body="{ items }">
            <tbody style="margin-top: 50px">
            <tr
                v-for="item in items"
                :key="item.id">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from "moment";
  import {mapGetters} from "vuex";

  export default {
    name: 'SearchCities',
    data () {
      return {
        loading: false,
        typing: false,
        city: '',
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
    methods:{
      handleClick(place) {
        this.city = place.main_text || this.city
        this.typing = false
      },
      async submitForm(){
        try{
          await this.$store.dispatch('getWeather', this.city)
      } catch (error){
        this.city = 'City not found'
        return error
      }
      },
      formatDate(date) {
        return moment(date).format('DD.MM.YYYY')
      },
      getThumbnail(icon) {
        return `http://openweathermap.org/img/wn/${icon}.png`
      },
      handleInput() {
        this.typing = !(this.city === '' || this.city === null || this.city.value === 0);

        if (this.city.length > 0) {
          setTimeout(() => {
            this.$store.dispatch('getPlaces', this.city);
          }, 1000)
        }
      }
    },
    computed:{
      ...mapGetters(['getWeather', 'getPlaces'])
    },
  }
</script>
