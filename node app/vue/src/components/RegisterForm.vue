<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      
      
      <b-form-group label="Username:" >
        <b-form-input v-model="form.username" placeholder="Enter username" ></b-form-input>
      </b-form-group>
 
      <label for="text-password">Password</label>
        <b-form-input type="password" v-model="form.password" placeholder="Enter password" ></b-form-input>

    <b-form-group label="First Name:" >
        <b-form-input v-model="form.first" placeholder="Enter first name"></b-form-input>
      </b-form-group>

      <b-form-group label="Last Name:">
        <b-form-input v-model="form.last" placeholder="Enter last name"></b-form-input>
      </b-form-group>


    <b-form-group label="Email address:">
     <b-form-input v-model="form.email" type="email" placeholder="Enter email"></b-form-input>
    </b-form-group>
    
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button variant="primary" href="/">Login</b-button>
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
        errors: [],
        form: {
          username:'',
          password: '',
          first: '',
          last: '',
          email: '',
          is_active:false,
          orders:0
        }
      }
    },
    methods: {

      ...mapActions(['new_user']),

      onSubmit(evt) {

            //validacija
            this.ok=false;
            this.errors = [];


            if(this.form.username===''){
                this.errors.push('Username required.');
            }
            else if(this.form.password===''){
                this.errors.push('Password required.');
            }
            else if(this.form.password.length > 20){
                this.errors.push('Password too long.');
            }
            else if(this.form.first===''){
                this.errors.push('First name required.');
            }
            else if(this.form.last===''){
                this.errors.push('Last name required.');
            }
            else if(this.form.email===''){
                this.errors.push('Email required.');
            }
            else if(this.form.username.length < 4){
                this.errors.push('Username too short');
            }
            else if(this.form.username.length > 12){
                this.errors.push('Username too long');
            }
            else{
                this.ok=true;
            }

            for(let i=0;i<this.users.length;i++){
                if(this.form.username === this.users[i].username){
                    this.errors.push('Username is already used.');
                    this.ok=false;
                    break;
                }
            }


            if (this.ok) {
                let encPassword;
                encPassword = this.encryptPassword(this.form.password);

                const msg =JSON.stringify({username: this.form.username, password: encPassword, first_name: this.form.first, last_name: this.form.last, email: this.form.email, is_active: this.form.is_active, orders: this.form.orders});
                this.new_user(msg);
                router.push({path:'/'});
                
            }
            else{
                 evt.preventDefault();
            }                        
      },
      encryptPassword(password)  {        
          const salt = bcrypt.genSaltSync(10)
          return bcrypt.hashSync(password, salt)
        },
        
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.username = '';
        this.form.password = '';
        this.form.first = '';
        this.form.last = '';
        this.form.email = '';

      }
    }
}
</script>

<style>

</style>