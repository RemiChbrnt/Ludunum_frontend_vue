<template>
  <div id="map">
    <h1> CARTE LUGDUNUM </h1>
    <div class="mascotte">
      <input type="datetime-local" name="startDate" v-model="dateStart">
      <input type="datetime-local" name="endDate" v-model="dateEnd">
      <button class="button" @click="filterLocalizations()"><span>FILTRER</span></button>
      <p > test : {{ Date.parse(dateStart) }}, {{ Date.parse(dateEnd) }}</p>
      <li v-for="loc in filteredLocalizations" :key="loc.id">{{ loc.createdAt }}</li>
    </div>
    <GmapMap
      :center="{lat:45.7484600, lng:4.8467100}"
      :zoom="13"
      map-type-id="terrain"
      style="padding-left: 5%; width: 65%; height: 700px;"
    >
      <GmapMarker
        :key="m.id"
        v-for="m in filteredLocalizations"
        :position="{ lat: m.lat, lng: m.long }"
        :clickable="true"
        :draggable="false"
        @click="getMarkerInfo(m)"
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
        {lat: 45.7484600, long: 4.8467100, id: 0, createdAt: 0},
        {lat: 45.7784600, long: 4.8467100, id: 1, createdAt: 0}],
      filteredLocalizations: [],
      dateStart: new Date(),
      dateEnd: new Date()
    }

  },
  methods: {
    filterLocalizations() {
      this.filteredLocalizations = [];
      let ds = Date.parse(this.dateStart);
      let de = Date.parse(this.dateEnd);
      for (let i=0; i<this.localizations.length; i++){
        if ((ds <= this.localizations[i].createdAt)&&(this.localizations[i].createdAt <= de)) {
          console.log(this.localizations[i].createdAt);
          this.filteredLocalizations.push(this.localizations[i]);
          console.log(this.filteredLocalizations[0].lat);
        }
      }
    },
    getMarkerInfo: function ({createdAt}) {
      console.log(createdAt);
    }

  },
  apollo: {
    localizations: {
      query: GET_LOCALIZATIONS,
    },
  },
}
</script>
