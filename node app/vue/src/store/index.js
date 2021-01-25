import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    foods: []
  },


  mutations: {
    set_users: function (state, users) {
      state.users = users;
    },

    set_foods: function (state, foods) {
      state.foods = foods;
    },

    add_user: function (state, user) {
      state.users.push(user);
    },

    update_user: function (state, payload) {
      for (let m = 0; m < state.users.length; m++) {
        if (state.users[m].id === parseInt(payload.id)) {
          state.users[m].is_active = payload.user.is_active;
          state.users[m].orders = payload.user.orders;
          break;
        }
      }
    },

    update_food: function (state, payload) {
      for (let m = 0; m < state.foods.length; m++) {
        if (state.foods[m].id === parseInt(payload.id)) {
          state.foods[m].ocena = payload.food.ocena;
          break;
        }
      }
    }
  },



  actions: {
    load_users: function ({ commit }) {
      fetch('http://localhost/api/users', { method: 'get' }).then((response) => {
      if (!response.ok)
        throw response;

      return response.json()
      }).then((jsonData) => {
        commit('set_users', jsonData)
      }).catch((error) => {
      if (typeof error.text === 'function')
        error.text().then((errorMessage) => {
          alert(errorMessage);
        });
      else
        alert(error);
      });
    },

    load_foods: function ({ commit }) {
      fetch('http://localhost/api/foods', { method: 'get' }).then((response) => {
      if (!response.ok)
        throw response;

      return response.json()
      }).then((jsonData) => {
        commit('set_foods', jsonData)
      }).catch((error) => {
      if (typeof error.text === 'function')
        error.text().then((errorMessage) => {
          alert(errorMessage);
        });
      else
        alert(error);
      });
    },

    new_user: function({ commit }, msg) {
      fetch('http://localhost/api/users', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: msg
                }).then((response) => {
                    if (!response.ok)
                        throw response;

                    return response.json();
                }).then((jsonData) => {
                  commit('add_user', jsonData);
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error);
                });
    },

    change_user: function({ commit }, payload) {
      fetch(`http://localhost/api/user/${payload.id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({username: this.user.username, password: this.user.password, first_name: this.user.first_name, last_name: this.user.last_name, email: this.user.email, is_active: this.user.is_active, orders: this.user.orders})
                    body: payload.msg
                }).then((response) => {
                    if (!response.ok)
                        throw response;

                    return response.json();
                }).then((jsonData) => {
                  commit('update_user', {id: payload.id, user:jsonData});
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error);
                 
                });
    },
    

    change_food: function({ commit }, payload) {
      fetch(`http://localhost/api/food/${payload.id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({username: this.user.username, password: this.user.password, first_name: this.user.first_name, last_name: this.user.last_name, email: this.user.email, is_active: this.user.is_active, orders: this.user.orders})
                    body: payload.msg
                }).then((response) => {
                    if (!response.ok)
                        throw response;

                    return response.json();
                }).then((jsonData) => {
                  commit('update_food', {id: payload.id, food:jsonData});
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error);
                 
                });
    }

  }
})
