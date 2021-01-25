<template>
    <div>
    <b-jumbotron header="Kod Mikice" lead="Restoran za narucivanje hrane">
        <p>Dobrodosao {{activeUser.first_name}}!</p>
        <p>Orders: {{activeUser.orders}}</p>
        <b-button v-on:click="logout" variant="primary">Logout</b-button>
    </b-jumbotron>
    </div>
</template>

<script>
import router from '@/router';  
import { mapActions } from 'vuex';

export default {
    name:"Header",
    props: {
        activeUser : {},
        foods: Array
    },
    methods:{
        ...mapActions(['change_user','change_food']),

        logout: function(){

            //postavljamo usera da nije aktivan
            this.activeUser.is_active=false;
            const msg = JSON.stringify({is_active: this.activeUser.is_active, orders:this.activeUser.orders});
            this.change_user({id: this.activeUser.id, msg: msg});

                 

            //updateujemo ocene hrane
            for(let i=0;i<this.foods.length;i++){
                const msg = JSON.stringify({ocena: this.foods[i].ocena});    
                this.change_food({id: this.foods[i].id, msg: msg});
            }


            router.push({path:'/'});
        }
    }

}
</script>