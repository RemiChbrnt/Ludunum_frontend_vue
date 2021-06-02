<template>
  <div id="map">
    <h1> LUGDUNUM MAP </h1>
    <div class="mascotte">
      <input v-model="year">
      <input v-model="day">
      <input v-model="hour">
      <input v-model="minute">
      <input type="datetime-local" name="startDate" v-model="dateStart">
      <button class="button" @click="calculateDate()"><span>TEST</span></button>
      <p > test : {{ dateStart }}</p>
    </div>
    <GmapMap
      :center="{lat:45.7484600, lng:4.8467100}"
      :zoom="13"
      map-type-id="terrain"
      style="padding-left: 5%; width: 65%; height: 700px;"
    >
      <GmapMarker
        :key="m.id"
        v-for="m in localizations"
        :position="{ lat: m.lat, lng: m.long }"
        :clickable="true"
        :draggable="false"
        @click="getMarkerInfo()"
      />
    </GmapMap>
  </div>
</template>

<script>
import {
  GET_USER,
  GET_LOCALIZATIONS,
} from "./graphql_util.js"

export default {
  data: function(){
    return {
      user: { username: 'user' },
      localizations: [
        {lat: 45.7484600, long: 4.8467100, id: 0},
        {lat: 45.7784600, long: 4.8467100, id: 1}],
      dateStart: new Date()
    }

  },
  methods: {
    calculateDate() {
      const min= 1000 * 60;
      const h = min * 60;
      const d = h * 24;
      const y = d * 365.25;
      this.dateAsInt = ((this.year-1970) * y + this.day * d + this.hour * h + this.minute * min);
    },

  },
  apollo: {
    localizations: {
      query: GET_LOCALIZATIONS,
    },
  },
}
</script>
