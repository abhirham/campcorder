<template>
    <v-card
        elevation="3"
        @click="
            $router.push({
                name: 'viewCampground',
                params: { campgroundId: 123 }
            })
        "
    >
        <v-img
            src="https://images.unsplash.com/photo-1612832021026-375ae70f24bf?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80"
            height="200px"
        ></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="indigo--text">Title</h3>
                    <v-row class="pa-3">
                        <v-rating
                            hover
                            half-increments
                            length="5"
                            small
                            dense
                            :value="3.1"
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
    components: {}
};
</script>
