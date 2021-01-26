<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Header  v-bind:activeUser="activeUser" v-bind:foods="foods"/>
    <b-container>
      <b-row>
          <b-col cm="6">
              MENI
              <FoodList v-if="foods.length" v-bind:foods="foods" v-bind:activeUser="activeUser"/>
          </b-col>
          <b-col cm="6">
              LOKACIJE
              <LocationList v-if="locations.length" v-bind:locations="locations"/>
          </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import FoodList from '../components/FoodList.vue'
import LocationList from '../components/LocationList.vue'
import Header from '../components/Header.vue'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'Home',
  components: {
    LocationList,
    FoodList,
    Header
  },
  data() {
    return{
        activeUser:{}
    }
  },
  computed: {
        ...mapState(['users','foods','locations']),
        
  },
  methods: {
        ...mapActions(['load_users','load_foods','load_locations']),
  },
  mounted: function() {
    
    for (let i = 0; i < this.users.length; i++){
          if(this.users[i].is_active){
              this.activeUser=this.users[i]
          }
      }
  },
  updated: function () {
    for (let i = 0; i < this.users.length; i++){
          if(this.users[i].is_active){
              this.activeUser=this.users[i]
          }
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
