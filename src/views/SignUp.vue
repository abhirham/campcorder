<template>
    <v-row justify="center" align="center">
        <v-card id="SignUp" class="text-center" width="400px">
            <v-card-text>
                <h2>Sign up</h2>
                <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="signUpUser">
                        <validatedEmail
                            v-model="email"
                            className="mt-5"
                            outlined
                            dense
                        />
                        <validatedPassword
                            v-model="password"
                            className="mt-3"
                            outlined
                            dense
                        />
                        <v-divider class="mt-4" />
                        <validatedFirstName
                            v-model="firstName"
                            className="mt-3"
                            outlined
                            dense
                        />
                        <validatedLastName
                            v-model="lastName"
                            className="mt-5"
                            outlined
                            dense
                        />

                        <v-btn
                            class="mt-5"
                            :disabled="invalid"
                            type="submit"
                            color="primary"
                            :loading="isLoading"
                            >sign up</v-btn
                        >
                    </form>
                </ValidationObserver>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import validatedEmail from "@/views/shared/validatedEmail.vue";
    import validatedPassword from "@/views/shared/validatedPassword.vue";
    import validatedFirstName from "@/views/shared/validatedFirstName.vue";
    import validatedLastName from "@/views/shared/validatedLastName.vue";

    export default {
        name: "SignUp",
        data: () => ({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            isLoading: false
        }),
        components: {
            ValidationProvider,
            ValidationObserver,
            validatedEmail,
            validatedPassword,
            validatedFirstName,
            validatedLastName
        },
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
