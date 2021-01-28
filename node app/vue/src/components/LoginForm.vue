<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">


      <b-form-group label="Username:" >
        <b-form-input v-model="form.username" placeholder="Enter username"></b-form-input>
      </b-form-group>
 
      <label for="text-password">Password</label>
        <b-form-input type="password" v-model="form.password" placeholder="Enter password"></b-form-input>

      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button  variant="primary" href="/register">Register</b-button>
    </b-form>

  </div>
</template>

<script>
import router from '@/router';  
import { mapActions } from 'vuex';
import bcrypt from 'bcryptjs';

  export default {
    props: {
        users : Array
    },
    data() {
      return {
        errors:[],
        form: {
          username:'',
          password: '',
        },
        show: true
      }
    },
    methods: {
      ...mapActions(['change_user']),

      onSubmit: function(evt) {

                //validacija
                this.found = false;
                this.user=null;
                this.errors=[];

                if(this.form.username===''){
                    this.errors.push('Username required.');
                }
                else if(this.form.password===''){
                    this.errors.push('Password required.');
                }
                else{
                    for (let i = 0; i < this.users.length; i++) {

                      if(this.users[i].username === this.form.username){  
                        let decPassword = this.users[i].password
                        bcrypt.compare(this.form.password, decPassword, (err, same) => {
                              if (same===true) {
                                  this.found=true;
                                  this.user=this.users[i];
                                  this.user.is_active = true;
                                  const msg = JSON.stringify({is_active: this.user.is_active, orders:this.user.orders})
                                  this.change_user({id: this.user.id, msg: msg});
                                  router.push({path:'/home'});
                                    
                              } 
                        })
                      }
      
                      
                    }
                    if(this.found === false){
                      this.errors.push("Username or password does not exists")
                    }
                  
                }

                evt.preventDefault();

                
                

                

      },


      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
      }
    }
  }
</script>
