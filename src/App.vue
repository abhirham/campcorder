<template>
    <v-app>
        <AppBar />
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import AppBar from "./AppBar";
import "./App.css";

export default {
    name: "App",

    components: {
        AppBar
    },

    data: () => ({
        //
    })
};
</script>
