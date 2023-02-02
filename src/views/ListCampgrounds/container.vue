<template>
    <div>
        <v-row justify="end">
            <v-col class="animate" :cols="textWidth">
                <v-text-field
                    placeholder="Start your search"
                    outlined
                    rounded
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
            <v-col md="4" xl="3" sm="6" v-for="camp in camps" :key="camp.id">
                <CampgroundCard :camp="camp" />
            </v-col>
        </v-row>
        <ViewCampgroundModal v-if="showModal" :camp="camps[campgroundId]" />
    </div>
</template>

<script>
    import CampgroundCard from "@/views/CampgroundCard";
    import ViewCampgroundModal from "@/views/ViewCampgrounds/ViewCampgroundModal.vue";

    export default {
        name: "ListCampgrounds",
        components: { ViewCampgroundModal, CampgroundCard },
        props: ["campgroundId"],
        data: () => ({
            searchText: "",
            textWidth: 4
        }),
        computed: {
            showModal() {
                return (
                    this.campgroundId !== undefined &&
                    Object.keys(this.camps).length > 0
                );
            },
            camps() {
                let camps = Object.values(this.$store.state.campModule.camps);

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
            this.$store.dispatch("campModule/fetchCamps").then(res => {
                let obj = {};

                res.forEach(camp => {
                    obj[camp.id] = {
                        ...camp,
                        src:
                            "https://images.unsplash.com/photo-1612832021026-375ae70f24bf?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80"
                    };
                });

                this.$store.commit("campModule/setCamps", obj);
            });
        }
    };
</script>

<style scoped>
    .animate {
        transition: all 0.3s ease;
    }
</style>
