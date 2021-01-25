<template>
  <div>

    <li v-for="food in foods" :key="food.id">
        <b-card no-body class="overflow-hidden" style="max-width: 540px;" footer-tag="footer">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="food.slika" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body :title="food.naziv">
                <b-card-text>
                    {{food.komentar}}
                </b-card-text>
                <b-card-text>
                    {{food.cena}}$
                </b-card-text>
                 <b-button variant="primary" v-on:click="activeUser.orders += 1">Naruci</b-button>       
                </b-card-body>
            </b-col>
            </b-row>
            <template #footer>
                <b-form-rating v-model="food.ocena"></b-form-rating>
                <p class="mt-2">Ocena: {{ food.ocena }}</p>
            </template>
        </b-card>
    
    </li>
  </div>
</template>

<script>
export default {
    name:"FoodList",
    props: {
        foods : Array,
        activeUser : {}
    }

}
</script>

<style>

</style>