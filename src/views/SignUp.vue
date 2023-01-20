<template>
    <v-row justify="center" align="center">
        <v-card id="SignUp" class="text-center" width="400px">
            <v-card-text>
                <h2>Sign up</h2>
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
                <v-divider class="mt-4" />
                <v-text-field
                    class="mt-3"
                    outlined
                    dense
                    hide-details="auto"
                    label="First Name"
                    v-model="firstName"
                />
                <v-text-field
                    class="mt-5"
                    outlined
                    dense
                    hide-details="auto"
                    label="Last Name"
                    v-model="lastName"
                />
                <v-btn
                    class="mt-5"
                    :disabled="disableSignUp"
                    @click="signUpUser"
                    color="primary"
                    :loading="isLoading"
                    >sign up</v-btn
                >
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
    export default {
        name: "SignUp",
        data: () => ({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            isLoading: false
        }),
        computed: {
            disableSignUp() {
                return [
                    this.email,
                    this.password,
                    this.lastName,
                    this.firstName
                ].some(x => x.length === 0);
            }
        },
        methods: {
            signUpUser() {
                this.isLoading = true;
                let { email, password, firstName, lastName } = this;
                this.$store
                    .dispatch("userModule/createUserWithEmailAndPassword", {
                        email,
                        password,
                        firstName,
                        lastName
                    })
                    .finally(() => (this.isLoading = false));
            }
        }
    };
</script>
