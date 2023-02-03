<template>
    <v-snackbar
        v-model="showAlert"
        :color="error ? 'error' : 'success'"
        timeout="3000"
    >
        <span class="white--text">{{ alertMessage }}</span>
    </v-snackbar>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Alerts",
        components: {},
        computed: {
            ...mapState("notificationModule", ["alertMessage", "error"]),
            showAlert: {
                get() {
                    return this.alertMessage.length > 0;
                },
                set() {
                    this.$store.commit("notificationModule/setAlert", {
                        alertMessage: ""
                    });
                }
            }
        }
    };
</script>
