<template>
    <v-card
        elevation="3"
        @click="
            $router.push({
                name: 'viewCampground',
                params: { campgroundId: camp.id }
            })
        "
    >
        <v-img :src="camp.src" height="200px"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="indigo--text">{{ camp.title }}</h3>
                    <v-row class="pa-3">
                        <v-rating
                            hover
                            half-increments
                            length="5"
                            small
                            dense
                            :value="camp.rating"
                            background-color="primary"
                            readonly
                        ></v-rating>
                        <span class="ml-3">2 Reviews</span>
                    </v-row>
                </v-col>
                <v-col cols="2" align="end">
                    <span>$</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: "CampgroundCard",
        props: {
            camp: {
                type: Object,
                required: true,
                validator(val) {
                    return !["id", "src", "title", "rating", "price"].some(
                        key => val[key] === undefined
                    );
                }
            }
        },
        components: {}
    };
</script>
