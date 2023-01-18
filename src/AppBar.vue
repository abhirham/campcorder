<template>
    <v-app-bar app color="primary" dark dense>
        <v-container>
            <v-row>
                <v-toolbar-title>
                    <router-link
                        class="white--text td-n"
                        :to="{ name: 'viewCampground' }"
                    >
                        YelpCamp
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text color="white">Login</v-btn>
                <v-btn text color="white">Sign Up</v-btn>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBar",
        components: {}
    };
</script>
