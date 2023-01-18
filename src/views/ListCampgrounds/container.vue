<template>
    <div>
        <v-row>
            <v-col md="4" xl="3" sm="6" v-for="camp in camps" :key="camp.id">
                <CampgroundCard :camp="camp" compact />
            </v-col>
        </v-row>
        <ViewCampgroundModal
            :showModal="showModal"
            :camp="camps[campgroundId]"
        />
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
                return this.campgroundId !== undefined;
            },
        },
        data: () => ({
            camps: {
                1: {
                    src: "https://images.unsplash.com/photo-1612832021026-375ae70f24bf?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80",
                    id: 1,
                    title: "My Camp ground",
                    createdBy: "abhirham",
                    price: 30,
                    currency: "$",
                    rating: 3.5,
                    amenities: ["Wifi"],
                    contact: "12345678",
                    description: `You will feel like you're a thousand miles from Toronto. Your own private space with several ponds for swimming, gazebo, fire pits, running water, hot shower, mtn bike and hiking trails. With 300 acres at your door step, you can choose not to see another soul during your stay or venture to a nearby winery, restaurants, shopping, horse farms, golf courses or ski hills! We are just 1 hour from Toronto with easy access off the 407. We also have an amazing log cabin for rent on the same 300 acres. The space The Tree House is fully disinfected after and before each guest arrival. We take cleanliness very importantly and your well being is our first priority. The tree house is situated on 300 acres of private forest with walking, hiking, X Country Skiing , MTN Bike Trails and Swimming Ponds. This beautiful Tree House over looks expansive green space and natural spring water ponds. If you need more space and love log cabins check out our 1820 log cabin http://abnb.me/EVmg/fxraMC3Q3B Guest access The treehouse rental includes full access to the property around the treehouse, BBQ, gas stove top, convection toaster oven, fridge with ice maker, electicity, running water cold and hot water, shower, flush toilet, outside fire pit, inside fireplace, double bed in the treehouse loft. Fresh sheets, towels, blankets all provided. Other things to note Please also check out our amazing Log Cabin for rent (URL HIDDEN) on airb&b which is hidden away on a different location on the property. This cabin also has access to the same 300 acres of private forest. http://abnb.me/EVmg/fxraMC3Q3B`,
                    createdAt: "August 6 2018",
                    comments: [
                        {
                            comment: "This is so nice!",
                            from: "Prasuna",
                            commented_on: "March 21 2021",
                            rating: 4,
                            docId: "123",
                        },
                        {
                            comment: "This is so nice!",
                            from: "Prasuna",
                            commented_on: "March 21 2021",
                            rating: 2,
                            docId: "123",
                        },
                        {
                            comment: "This is so nice!",
                            from: "Prasuna",
                            commented_on: "March 21 2021",
                            rating: 2,
                            docId: "123",
                        },
                        {
                            comment: "This is so nice!",
                            from: "Prasuna",
                            commented_on: "March 21 2021",
                            rating: 5,
                            docId: "123",
                        },
                    ].map((x, i) => ({ ...x, docId: i })),
                },
            },
        }),
    };
</script>
