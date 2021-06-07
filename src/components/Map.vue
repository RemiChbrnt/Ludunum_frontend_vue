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
          :position="{ lat: m.lat, lng: m.lng }"
          :clickable="true"
          :draggable="false"
          @click="getMarkerInfo(m)"
        />.addListener="click, toggleBounce"
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
        <div style="width: 90%; background-color: #faebd780 ; align-self: center; margin-top: 5%">
          <p style="align-self: center; text-align: center; font-size: 150%; padding-left: 5%; padding-right: 5%">
            Affichage des Joueurs connectés entre le
            <br> {{ convertDate2String(new Date(dateStart)) }}
            <br> et le {{ convertDate2String(new Date(dateEnd)) }}</p>
        </div>

        <div style="width: 90%; align-self: center; margin-top: 5%">
          <div>
            <p style="width: 100%; text-align: justify; font-size: 130%; padding-left: 5%; padding-right: 5%; margin-top: 2%">
              Nombre de localisations: {{ filteredLocalizations.length }}
              <br> Nombre de joueurs différents: {{ nbUsers }}
            </p>
          </div>
          <div>
            <p style="background-color: #faebd780; align-self: center; text-align: center; font-size: 150%; padding-left: 5%; padding-right: 5%">
            Marqueur sélectionné
            </p>
          </div>
          <div>
            <p style="width: 100%; text-align: justify; font-size: 130%; padding-left: 5%; padding-right: 5%">
              ID Utilisateur: {{ selectedMarker.userId }}
              <br> Date: {{ dateSelectedMarker }}
              <br> Longitude: {{ selectedMarker.lng }}
              <br> Latitude: {{ selectedMarker.lat }}
            </p>
          </div>
        </div>
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
        {lat: 45.7484600, lng: 4.8467100, id: 0, createdAt: ''},
        {lat: 45.7784600, lng: 4.8467100, id: 1, createdAt: ''}],
      filteredLocalizations: [],
      dateStart: new Date('01/01/2021'),
      dateEnd: new Date(),
      selectedMarker: {lat: null, lng: null, userId: null, createdAt: new Date()},
      dateSelectedMarker: '',
      nbUsers: 0
    }
  },
  methods: {
    filterLocalizations() {
      this.filteredLocalizations = [];
      let ds = Date.parse(this.dateStart);
      let de = Date.parse(this.dateEnd);
      for (let i = 0; i < this.localizations.length; i++) {
        if ((ds <= this.localizations[i].createdAt) && (this.localizations[i].createdAt <= de)) {
          this.filteredLocalizations.push(this.localizations[i]);
        }
      }
      this.calcNumberUsers();
    },
    calcNumberUsers(){
      this.nbUsers = 0;
      let usersFound = []
      for (let i=0; i<this.filteredLocalizations.length; i++){
        if(usersFound.indexOf(this.filteredLocalizations[i].userId) == -1) {
          this.nbUsers += 1;
          usersFound.push(this.filteredLocalizations[i].userId);
        }
      }
    },
    getMarkerInfo(m) {
      this.selectedMarker = m;
      this.dateSelectedMarker = this.convertDate2String(new Date(parseInt(m.createdAt)));
    },
    convertDate2String(d) {
      let day = d.getDate();
      if (day < 10) {
        day = "0" + day.toString();
      }
      let month = d.getMonth() + 1;
      if (month < 10) {
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
