<template>
    <v-card :to="{ name: 'viewCampground', params: { campgroundId: camp.id } }">
        <v-img :src="(camp.image || {}).small" max-height="200px"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="primary--text">{{ camp.title }}</h3>
                </v-col>
                <v-col cols="2" align="end" class="black--text">
                    <span>$</span>
                </v-col>
            </v-row>
            <RatingsComponent
                class="mt-1"
                :totalRatings="camp.numRatings"
                :avgRating="camp.avgRating"
            />
        </v-card-text>
    </v-card>
</template>

<script>
    import RatingsComponent from "@/views/campgrounds/RatingsComponent.vue";

    export default {
        name: "CampgroundCard",
        props: {
            camp: {
                type: Object,
                required: true
            }
        },
        components: { RatingsComponent }
    };
</script>
