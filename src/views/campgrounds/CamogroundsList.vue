<template>
    <div>
        <v-row justify="end">
            <v-col class="animate" sm="12" :md="textWidth">
                <v-text-field
                    placeholder="Start your search"
                    outlined
                    rounded
                    background-color="white"
                    hide-details
                    v-model="searchText"
                    @focus="textWidth = 12"
                    @blur="textWidth = 4"
                    append-icon="mdi-close"
                    @click:append="
                        searchText.length > 0 ? (searchText = '') : null
                    "
                >
                    <template #append v-if="searchText.length === 0">
                        <v-avatar size="40" class="mt-n2 mr-n4" color="primary">
                            <v-icon color="white">mdi-magnify</v-icon>
                        </v-avatar>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <template v-if="loading">
                <v-col md="4" xl="3" sm="6">
                    <v-skeleton-loader type="card"></v-skeleton-loader>
                </v-col>
            </template>
            <v-col
                v-else
                md="4"
                xl="3"
                sm="6"
                v-for="camp in filteredCamps"
                :key="camp.id"
            >
                <CampgroundCard :camp="camp" />
            </v-col>
        </v-row>
        <ViewCampgroundModal v-if="showModal" :camp="camps[campgroundId]" />
    </div>
</template>

<script>
    import CampgroundCard from "@/views/campgrounds/CampgroundCard";
    import ViewCampgroundModal from "@/views/campgrounds/ViewCampgroundModal.vue";

    export default {
        name: "ListCampgrounds",
        components: { ViewCampgroundModal, CampgroundCard },
        props: ["campgroundId"],
        data: () => ({
            searchText: "",
            textWidth: 4,
            loading: false
        }),
        computed: {
            showModal() {
                return (
                    this.campgroundId !== undefined &&
                    Object.keys(this.camps).length > 0
                );
            },
            camps() {
                return this.$store.state.campModule.camps;
            },
            filteredCamps() {
                let camps = Object.values(this.camps);

                if (this.searchText.length > 0)
                    return camps.filter(
                        x =>
                            x.title
                                .toLowerCase()
                                .indexOf(this.searchText.toLowerCase()) > -1
                    );

                return camps;
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch("campModule/fetchCamps")
                .then(res => {
                    let obj = {};

                    res.forEach(camp => {
                        obj[camp.id] = camp;
                    });

                    this.$store.commit("campModule/setCamps", obj);
                })
                .catch(e => {
                    this.$store.commit("notificationModule/setAlert", {
                        alertMessage: "Something went wrong. Please try again.",
                        error: true
                    });
                })
                .finally(() => (this.loading = false));
        }
    };
</script>

<style scoped>
    .animate {
        transition: all 0.3s ease;
    }
</style>
