<template>
    <v-card color="grayBackground" flat max-width="600px">
        <v-btn
            @click="$router.push({ name: 'viewCampground' })"
            fixed
            left
            icon
            color="black"
            class="mt-4 d-none d-md-inline-flex"
        >
            <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-card-title class="text-h4 font-weight-bold">
            Personal info</v-card-title
        >
        <v-card-text>
            <v-list class="grayBg">
                <EditWrapper
                    title="Email address"
                    :value="email"
                    readonly
                ></EditWrapper>
                <v-divider />
                <EditWrapper
                    title="Legal name"
                    :cb="updateName"
                    :value="legalName"
                    @onCancel="resetFnameAndLname"
                >
                    <v-row class="mt-1">
                        <v-col cols="6">
                            <validatedFirstName
                                backgroundColor="white"
                                filled
                                v-model="firstName"
                            />
                        </v-col>
                        <v-col cols="6">
                            <validatedLastName
                                backgroundColor="white"
                                filled
                                v-model="lastName"
                            />
                        </v-col>
                    </v-row>
                </EditWrapper>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                @click="$router.push({ name: 'viewCampground' })"
                class="d-md-none"
                >back</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
    import EditWrapper from "@/views/userDetails/EditWrapper.vue";
    import validatedFirstName from "@/views/shared/validatedFirstName.vue";
    import validatedLastName from "@/views/shared/validatedLastName.vue";

    export default {
        name: "UserDetails",
        components: {
            EditWrapper,
            validatedFirstName,
            validatedLastName
        },
        data: () => ({
            email: "",
            firstName: "",
            lastName: ""
        }),
        computed: {
            legalName() {
                return `${this.firstName} ${this.lastName}`.trim();
            }
        },
        methods: {
            updateName() {
                return this.$store
                    .dispatch("userModule/updateUser", {
                        lastName: this.lastName,
                        firstName: this.firstName
                    })
                    .then(res => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage: "Changes have been saved."
                        });
                    })
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage:
                                "Something went wrong. Please try again",
                            error: true
                        });

                        throw e;
                    });
            },
            resetFnameAndLname() {
                ["firstName", "lastName"].forEach(x => {
                    this[x] = this.$store.state.userModule[x];
                });
            }
        },
        mounted() {
            ["email", "firstName", "lastName"].forEach(x => {
                this[x] = this.$store.state.userModule[x];
            });
        }
    };
</script>
