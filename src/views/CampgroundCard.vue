<template>
    <v-card :to="{ name: 'viewCampground', params: { campgroundId: camp.id } }">
        <v-img :src="camp.src" max-height="200px"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="indigo--text">{{ camp.title }}</h3>
                </v-col>
                <v-col cols="2" align="end" class="black--text">
                    <span>$</span>
                </v-col>
            </v-row>
            <RatingsComponent class="mt-1" :comments="camp.comments" />
        </v-card-text>
    </v-card>
</template>

<script>
    import RatingsComponent from "@/views/RatingsComponent.vue";

    export default {
        name: "CampgroundCard",
        props: {
            camp: {
                type: Object,
                required: true,
                validator(val) {
                    return !["id", "src", "title", "price"].some(
                        key => val[key] === undefined
                    );
                }
            }
        },
        components: { RatingsComponent }
    };
</script>
