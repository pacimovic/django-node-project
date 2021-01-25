<template>
  <div id="app">
    <b-container>
      <b-row>
          <b-col cm="6">
              <RegisterForm v-if="users.length" v-bind:users="users"/>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Register',
  components: {
    RegisterForm
  },
  computed: {
        ...mapState(['users']),
  },
  methods: {
        ...mapActions(['load_users']),
  },


}
</script>

<style>

</style>