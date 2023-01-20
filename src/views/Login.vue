<template>
    <v-row justify="center" align="center">
        <v-card id="Login" class="text-center" width="400px">
            <v-card-text>
                <h2>Login</h2>
                <v-text-field
                    class="mt-5"
                    outlined
                    dense
                    hide-details="auto"
                    label="Email"
                    v-model="email"
                />
                <v-text-field
                    class="mt-3"
                    outlined
                    dense
                    hide-details="auto"
                    label="Password"
                    v-model="password"
                    type="password"
                />
                <v-btn
                    class="mt-5"
                    :disabled="disableLogin"
                    @click="loginUser"
                    color="primary"
                    :loading="isLoading"
                    >Login</v-btn
                >
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
    export default {
        name: "Login",
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
                    .finally(() => (this.isLoading = false));
            }
        }
    };
</script>
