<template>
    <v-app class="grayBg">
        <AppBar />
        <v-main>
            <v-container :fill-height="fillHeight || loading">
                <v-row justify="center" v-if="loading">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </v-row>
                <router-view v-else></router-view>
            </v-container>
            <Alerts />
        </v-main>
    </v-app>
</template>

<script>
    import AppBar from "./AppBar";
    import Alerts from "@/views/Alerts.vue";
    import "./App.css";
    import { auth } from "@/firebase";
    import { extend } from "vee-validate";
    import { required, email, min } from "vee-validate/dist/rules";

    extend("required", {
        ...required,
        message: "This field cant be empty."
    });

    extend("email", {
        ...email,
        message: "Invalid email."
    });

    extend("min", {
        ...min,
        message: "{_field_} must be atleast {length} characters long"
    });

    export default {
        name: "App",

        components: {
            AppBar,
            Alerts
        },
        data: () => ({
            loading: true
        }),
        computed: {
            fillHeight() {
                return this.$route.meta.fillHeight;
            },
            routeWatcher() {
                return [this.$route, this.loading];
            }
        },
        beforeMount() {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    let creatingUserPromise = this.$store.state.userModule
                        .creatingUserPromise;

                    if (creatingUserPromise) {
                        await creatingUserPromise;
                        this.$store.commit(
                            "userModule/setCreatingUserPromise",
                            null
                        );
                    }
                    this.loading = true;

                    await this.$store
                        .dispatch("userModule/fetchUserFromFirestore", {
                            userId: user.uid
                        })
                        .catch(e => {
                            this.$store.commit("notificationModule/setAlert", {
                                alertMessage:
                                    "Unable to retrieve user profile. Please try again.",
                                error: true
                            });
                        })
                        .finally(() => (this.loading = false));

                    if (this.$route.meta.noAuth) {
                        this.$router.push({ name: "viewCampground" });
                    }
                } else {
                    if (this.$route.meta.authRequired) {
                        this.$router.push({ name: "viewCampground" });
                    }
                    this.$store.commit("userModule/clearUserData");
                    this.loading = false;
                }
            });
        },
        watch: {
            routeWatcher([route, loading]) {
                if (loading) return;

                if (
                    route.meta.authRequired &&
                    !this.$store.getters["userModule/isUserLoggedIn"]
                ) {
                    this.$router.push({ name: "viewCampground" });
                }
            }
        }
    };
</script>
