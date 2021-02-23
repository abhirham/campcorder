<template>
    <v-row>
        <v-col md="4" xl="3" sm="6" v-for="camp in camps" :key="camp.id">
            <CampgroundCard :camp="camp" />
        </v-col>
    </v-row>
</template>
<script>
    import CampgroundCard from "@/views/CampgroundCard";
    import vuex from "vuex";
    export default {
        name: "ListCampgrounds",
        components: { CampgroundCard },
        computed: {
            ...vuex.mapState("campsModule", ["camps"])
        }
    };
</script>
