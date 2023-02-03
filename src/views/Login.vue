<template>
    <v-row justify="center" align="center">
        <v-card id="Login" class="text-center" width="400px">
            <v-card-text>
                <h2>Login</h2>
                <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="loginUser">
                        <validatedEmail
                            className="mt-5"
                            outlined
                            dense
                            v-model="email"
                        />
                        <validatedPassword
                            className="mt-3"
                            outlined
                            dense
                            v-model="password"
                        />
                        <v-btn
                            class="mt-5"
                            :disabled="invalid"
                            type="submit"
                            color="primary"
                            :loading="isLoading"
                            >Login</v-btn
                        >
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
    import { firebaseErrorMessage } from "@/helpers.js";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import validatedEmail from "@/views/shared/validatedEmail.vue";
    import validatedPassword from "@/views/shared/validatedPassword.vue";

    export default {
        name: "Login",
        components: {
            ValidationProvider,
            ValidationObserver,
            validatedEmail,
            validatedPassword
        },
        data: () => ({
            email: "",
            password: "",
            isLoading: false
        }),
        computed: {
            disableLogin() {
                return [this.email, this.password].some(x => x.length === 0);
            }
        },
        methods: {
            loginUser() {
                this.isLoading = true;
                let { email, password } = this;
                this.$store
                    .dispatch("userModule/signInWithEmailAndPassword", {
                        email,
                        password
                    })
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage: firebaseErrorMessage(e.code),
                            error: true
                        });
                    })
                    .finally(() => (this.isLoading = false));
            }
        }
    };
</script>
