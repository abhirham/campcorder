<template>
    <v-app-bar app color="primary" dark dense>
        <v-container>
            <v-row>
                <v-toolbar-title>
                    <router-link
                        class="white--text customLink"
                        :to="{ name: 'Home' }"
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

<style scoped>
.customLink {
    text-decoration: none;
}
</style>
<script>
export default {
    name: "AppBar",
    components: {}
};
</script>
