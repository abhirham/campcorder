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
                <template v-if="isUserLoggedIn">
                    <v-btn
                        class="mr-2"
                        v-if="$route.name !== 'createCamp'"
                        @click="$router.push({ name: 'createCamp' })"
                        rounded
                        text
                        >Add new Camp</v-btn
                    >
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                rounded
                                color="white"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon color="primary" left>mdi-menu</v-icon>
                                <v-icon md color="primary"
                                    >mdi-account-circle</v-icon
                                >
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in accountActions"
                                :key="index"
                                @click="item.onClick"
                            >
                                <v-list-item-title>{{
                                    item.text
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                <template v-else>
                    <v-btn
                        text
                        color="white"
                        @click="$router.push({ name: 'login' })"
                        >Login</v-btn
                    >
                    <v-btn
                        @click="$router.push({ name: 'signup' })"
                        text
                        color="white"
                        >Sign Up</v-btn
                    >
                </template>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "AppBar",
        components: {},
        computed: {
            ...mapGetters("userModule", ["isUserLoggedIn"])
        },
        data() {
            return {
                accountActions: [
                    {
                        text: "Account",
                        onClick: () => {
                            this.$router.push({ name: "userDetails" });
                        }
                    },
                    {
                        text: "Log out",
                        onClick: () => {
                            this.$store
                                .dispatch("userModule/logoutUser")
                                .catch(e =>
                                    this.$store.commit(
                                        "notificationModule/setAlert",
                                        {
                                            alertMessage:
                                                "Something went wrong. Please try again.",
                                            error: true
                                        }
                                    )
                                );
                        }
                    }
                ]
            };
        }
    };
</script>
