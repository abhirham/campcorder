<template>
    <v-row>
        <v-col sm="2">
            <v-row>
                <h4>{{ campground.title }}</h4>
            </v-row>
            <v-row>
                <v-card outlined flat>
                    <v-card-title>Amenities</v-card-title>
                    <v-card-text>
                        {{ campground.amenities.join(",") }}
                    </v-card-text>
                </v-card>
            </v-row>
            <v-row>
                <v-card outlined flat>
                    <v-card-title>Contact</v-card-title>
                    <v-card-text>
                        {{ campground.amenities.join(",") }}
                    </v-card-text>
                </v-card>
            </v-row>
        </v-col>
        <v-col sm="10">
            <CampgroundCard :camp="campground" />
        </v-col>
    </v-row>
</template>
<script>
    import CampgroundCard from "@/views/CampgroundCard";

    export default {
        name: "ViewCampground",
        props: {
            campgroundId: { required: true }
        },
        components: { CampgroundCard },
        computed: {
            campground() {
                return this.$store.state.campsModule.camps[this.campgroundId];
            }
        }
    };
</script>
