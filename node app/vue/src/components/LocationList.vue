<template>
  <div>
    
    <li v-for="location in locations" :key="location.id">
        <b-card no-body class="overflow-hidden" style="max-width: 540px;" footer-tag="footer">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="location.slika" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body :title="location.naziv">
                <b-card-text>
                    Adresa: {{location.adresa}}
                </b-card-text>
                <b-card-text>
                    Telefon: {{location.telefon}}
                </b-card-text>
                    
                </b-card-body>
            </b-col>
            </b-row>

        </b-card>
    </li>
  </div>
</template>

<script>
export default {
    name:"LocationList",
    props: {
        locations : Array
    }

}
</script>

<style>

</style>