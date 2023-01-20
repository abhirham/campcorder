<template>
    <v-app>
        <AppBar />
        <v-main>
            <v-container :fill-height="fillHeight">
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import AppBar from "./AppBar";
    import "./App.css";
    import { auth } from "@/firebase";

    export default {
        name: "App",

        components: {
            AppBar
        },
        computed: {
            fillHeight() {
                return this.$route.meta.fillHeight;
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

                    await this.$store.dispatch(
                        "userModule/fetchUserFromFirestore",
                        {
                            userId: user.uid
                        }
                    );

                    if (this.$route.meta.noAuth) {
                        this.$router.push({ name: "viewCampground" });
                    }
                } else {
                    this.$store.commit("userModule/clearUserData");
                }
            });
        }
    };
</script>
