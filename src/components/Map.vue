<template>
  <div id="map">
    <h1> LUGDUNUM MAP </h1>
    <div class="mascotte">
      <img class="mascotte" src="./img/mascotte_01.png" alt="mascotte rhino">
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
    }
  },
  methods: {
    getMarkerInfo() {

    }

  },
  apollo: {
    localizations: {
      query: GET_LOCALIZATIONS,
    },
  },
}
</script>
