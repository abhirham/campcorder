<template>
    <div>
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
        computed: {
            showModal() {
                return (
                    this.campgroundId !== undefined &&
                    Object.keys(this.camps).length > 0
                );
            }
        },
        data: () => ({
            camps: {}
        }),
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

                this.camps = obj;
            });
        }
    };
</script>
