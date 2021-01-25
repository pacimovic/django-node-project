<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    
    <b-container>
      <b-row>
          <b-col cm="6">
              <LoginForm v-if="users.length" v-bind:users="users"/>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  computed: {
        ...mapState(['users']),
  },
  methods: {
        ...mapActions(['load_users']),
  }
}
</script>