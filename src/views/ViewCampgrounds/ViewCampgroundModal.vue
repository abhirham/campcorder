<template>
    <v-dialog
        content-class="ViewCampgroundModal"
        :value="showModal"
        persistent
        no-click-animation
        width="70%"
    >
        <v-card>
            <v-img
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.7)"
                class="white--text align-end"
                :src="camp.src"
                max-height="50vh"
            >
                <v-btn
                    @click="$router.push({ name: 'viewCampground' })"
                    elevation="16"
                    absolute
                    icon
                    top
                    right
                    color="white"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title>{{ camp.title }}</v-card-title>
            </v-img>
            <v-card-text class="black--text pt-5">
                <v-row class="mt-1 mx-0">
                    Submitted by
                    <span class="primary--text mx-1">{{ camp.createdBy }}</span>
                    on
                    {{ camp.createdAt }}
                    <v-spacer />
                    <div class="text-subtitle-1">${{ camp.price }}/Night</div>
                </v-row>
                <RatingsComponent class="mt-2 mb-3" :comments="camp.comments" />
                <v-tabs v-model="tab">
                    <v-tab>Description</v-tab>
                    <v-tab>Reviews</v-tab>
                </v-tabs>
                <v-tabs-items class="mt-2" v-model="tab">
                    <v-tab-item>
                        <div>{{ camp.description }}</div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="text-subtitle-1 ml-4">Customer Reviews</div>
                        <template v-if="!hasUserCommented">
                            <v-divider />
                            <v-card width="500" flat class="mx-0">
                                <v-card-text>
                                    <div class="text-subtitle-2">
                                        Rate your experience
                                    </div>
                                    <v-rating
                                        hover
                                        length="5"
                                        dense
                                        v-model="rating"
                                        background-color="primary"
                                    ></v-rating>
                                    <v-textarea
                                        v-show="rating > 0"
                                        class="mt-2"
                                        v-model="description"
                                        height="90"
                                        label="Write a review"
                                        outlined
                                        hide-details
                                    />
                                </v-card-text>
                                <v-card-actions
                                    class="pt-0 mb-2"
                                    v-show="rating > 0"
                                >
                                    <v-btn
                                        class="ml-2"
                                        color="primary"
                                        :disabled="description.length === 0"
                                        @click="addComment"
                                        >Submit</v-btn
                                    >
                                    <v-btn
                                        class="ml-2"
                                        text
                                        color="primary"
                                        @click="rating = 0"
                                        >Cancel</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                            <v-divider />
                        </template>

                        <v-list dense>
                            <v-virtual-scroll
                                height="300"
                                item-height="70"
                                :items="camp.comments"
                            >
                                <template v-slot:default="{ item }">
                                    <v-list-item two-line>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div class="d-flex flex-row">
                                                    {{ item.from }}
                                                    <v-rating
                                                        hover
                                                        half-increments
                                                        length="5"
                                                        x-small
                                                        dense
                                                        :value="item.rating"
                                                        class="ml-3"
                                                        background-color="primary"
                                                        readonly
                                                    ></v-rating>
                                                </div>
                                            </v-list-item-title>
                                            <div class="text-caption">
                                                ({{
                                                    dateFormatter(
                                                        item.created_at
                                                    )
                                                }})
                                            </div>
                                            <v-list-item-subtitle>{{
                                                item.text
                                            }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-virtual-scroll>
                        </v-list>
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
    import CampgroundCard from "@/views/CampgroundCard";
    import RatingsComponent from "@/views/RatingsComponent.vue";
    import moment from "moment";

    export default {
        name: "ViewCampgroundModal",
        props: {
            camp: { required: true, default: () => ({}) },
            showModal: { required: true, type: Boolean },
        },
        components: { CampgroundCard, RatingsComponent },
        data: () => ({
            tab: 0,
            rating: 0,
            description: "",
        }),
        computed: {
            overallRating() {
                let sum = 0;
                let count = 0;
                let avg = 0;

                (this.camp.comments ?? []).forEach((x) => {
                    sum += x.rating;
                    count++;
                });

                if (count > 0) {
                    avg = sum / count;
                }

                return { avg, total: count };
            },
            hasUserCommented() {
                return this.camp.comments[0].from === "Abhirham";
            },
        },
        methods: {
            dateFormatter(date) {
                return moment(date).format("D MMM, YYYY");
            },
            addComment() {
                let commentObj = {
                    text: this.description,
                    from: "Abhirham",
                    created_at: moment(),
                    rating: this.rating,
                    docId: "123",
                };

                this.camp.comments = [commentObj, ...this.camp.comments];
            },
        },
    };
</script>
