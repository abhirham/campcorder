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
                        class="mr-2 d-none d-sm-inline-flex"
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
                            <template v-for="(item, index) in accountActions">
                                <v-divider
                                    v-if="item.divider"
                                    :class="item.class"
                                    :key="index"
                                />
                                <v-list-item
                                    v-else
                                    :key="index"
                                    @click="item.onClick"
                                    :class="item.class"
                                >
                                    <v-list-item-title>{{
                                        item.text
                                    }}</v-list-item-title>
                                </v-list-item>
                            </template>
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
            ...mapGetters("userModule", ["isUserLoggedIn"]),
            accountActions() {
                return [
                    {
                        text: "Add new Camp",
                        onClick: () => {
                            this.$router.push({ name: "createCamp" });
                        },
                        class: "d-sm-none",
                        show: this.$route.name !== "createCamp"
                    },
                    {
                        divider: true,
                        class: "d-sm-none",
                        show: this.$route.name !== "createCamp"
                    },
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
                                .then(res =>
                                    this.$store.commit(
                                        "notificationModule/setAlert",
                                        {
                                            alertMessage:
                                                "You have been logged out."
                                        }
                                    )
                                )
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
                ].filter(x => x.show !== false);
            }
        }
    };
</script>
