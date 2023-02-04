<template>
    <v-card class="grayBg" flat max-width="600px">
        <v-card-title>
            Create New Campground
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        filled
                        background-color="white"
                        dense
                        v-model="title"
                        hide-details="auto"
                        label="Title"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        filled
                        background-color="white"
                        dense
                        v-model="description"
                        hide-details="auto"
                        label="Description"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-text-field
                        filled
                        background-color="white"
                        class="hide-arrows"
                        dense
                        v-model="price"
                        hide-details="auto"
                        type="number"
                        label="Price"
                        placeholder="0"
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                :disabled="disableCreate"
                :loading="loading"
                @click="createCamp"
                >Create</v-btn
            >
            <v-btn
                class="ml-5"
                @click="$router.push({ name: 'viewCampground' })"
                text
                color="primary"
                >Cancel</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "CreateCampGround",
        data: () => ({
            title: "",
            description: "",
            price: null,
            loading: false
        }),
        computed: {
            disableCreate() {
                return (
                    [this.title, this.description].some(x => x.length === 0) ||
                    this.price === null
                );
            }
        },
        methods: {
            createCamp() {
                this.loading = true;
                let { title, description, price } = this;
                this.$store
                    .dispatch("campModule/createCamp", {
                        title,
                        description,
                        price
                    })
                    .then(res => {
                        this.$router.push({ name: "viewCampground" });
                    })
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage:
                                "Unable to create camp. Please try again.",
                            error: true
                        });
                    })
                    .finally(() => (this.loading = false));
            }
        }
    };
</script>
