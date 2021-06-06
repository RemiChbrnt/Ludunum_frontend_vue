<template>
  <div id="map">
    <h1> CARTE LUGDUNUM </h1>
    <div class="map">
      <GmapMap
        :center="{lat:45.7484600, lng:4.8467100}"
        :zoom="13"
        map-type-id="terrain"
        style="padding-left: 5%; width: 125%; height: 700px;"
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
      <div class="settings">
        <div style="align-self: center;">
          <h1>Filtrer les positions des joueurs</h1>
        </div>
        <div class="dateSelector">
          <h1 style="width: 10%;"> De: </h1>
          <input type="datetime-local" name="startDate" v-model="dateStart">
        </div>
        <div class="dateSelector">
          <h1 style="width: 10%;"> A: </h1>
          <input type="datetime-local" name="endDate" v-model="dateEnd">
        </div>

        <button class="button" @click="filterLocalizations()"><span>AFFICHER</span></button>
        <div style="background-color: #faebd780 ; align-self: center; margin-top: 5%">
          <h1 style="text-align: center">Affichage des...</h1>
          <p style="align-self: center; text-align: center; font-size: 150%; padding-left: 5%; padding-right: 5%">
            ... Joueurs connectés entre le
            <br> {{ convertDate2String(new Date(dateStart)) }}
            <br> et le {{ convertDate2String(new Date(dateEnd)) }}</p>
        </div>

        <li v-for="loc in filteredLocalizations" :key="loc.id">{{ loc.createdAt }}</li>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_USER,
  GET_LOCALIZATIONS,
  LOGIN,
} from "./graphql_util.js"

export default {
  data: function(){
    return {
      user: { username: 'user' },
      localizations: [
        {lat: 45.7484600, long: 4.8467100, id: 0, createdAt: ''},
        {lat: 45.7784600, long: 4.8467100, id: 1, createdAt: ''}],
      filteredLocalizations: [],
      dateStart: new Date('01/01/2021'),
      dateEnd: new Date(),
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
    },
    convertDate2String(d){
      let day = d.getDate();
      if (day < 10){
        day = "0" + day.toString();
      }
      let month = d.getMonth()+1;
      if (month < 10){
        month = "0" + month.toString();
      }
      let hour = d.getHours();
      if (hour < 10) {
        hour = "0" + hour.toString();
      }
      let minute = d.getMinutes();
      if (minute < 10) {
        minute = "0" + minute.toString();
      }
      return day + "/" + month + "/" + d.getFullYear()
      + " à " + hour + ":" + minute;
    }


  },
  apollo: {
    localizations: {
      query: GET_LOCALIZATIONS,
    },
  }
}
</script>
