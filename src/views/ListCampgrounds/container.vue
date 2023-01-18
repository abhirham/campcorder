<template>
    <div>
        <v-row>
            <v-col md="4" xl="3" sm="6" v-for="camp in camps" :key="camp.id">
                <CampgroundCard :camp="camp" compact />
            </v-col>
        </v-row>
        <ViewCampgroundModal :showModal="showModal" :camp="camps[campgroundId]" />
    </div>
</template>

<script>
    import CampgroundCard from "@/views/CampgroundCard";
    import ViewCampgroundModal from "@/views/ViewCampgrounds/ViewCampgroundModal.vue";
    
    export default {
        name: "ListCampgrounds",
        components: { ViewCampgroundModal, CampgroundCard },
        props: ['campgroundId'],
        computed: {
            showModal() {
                return this.campgroundId !== undefined
            }
        },
        data: () => ({
            camps: {
                1: {
                    src: "https://images.unsplash.com/photo-1612832021026-375ae70f24bf?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80",
                    id: 1,
                    title: 'My Camp ground',
                    createdBy: 'abhirham',
                    price: 30,
                    currency: '$',
                    rating: 3.5,
                    amenities: ['Wifi'],
                    contact: '12345678',
                    description: 'adasdasdasd',
                    createdAt: 'August 6 2018',
                    comments: [{
                        comment: 'This is so nice!',
                        from: 'Prasuna',
                        commented_on: 'March 21 2021',
                        replies: [],
                        docId: '123'
                    }]
                }
            },
        })
    };
</script>
