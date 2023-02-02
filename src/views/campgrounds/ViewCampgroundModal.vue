<template>
    <v-dialog
        content-class="ViewCampgroundModal"
        :value="true"
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
                    Posted by
                    <span class="primary--text mx-1">{{
                        camp.creatorName
                    }}</span>
                    on
                    {{ dateFormatter(camp.createdAt, "D MMM, YYYY") }}
                    <v-spacer />
                    <div class="text-subtitle-1">${{ camp.price }}/Night</div>
                </v-row>
                <RatingsComponent
                    class="mt-2 mb-3"
                    :totalRatings="camp.numRatings"
                    :avgRating="camp.avgRating"
                    :comments="comments"
                />
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
                        <template v-if="!hasUserCommented || editMode">
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
                                        v-model="review"
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
                                        :disabled="review.length === 0"
                                        :loading="loading"
                                        @click="
                                            editMode
                                                ? updateComment()
                                                : addComment()
                                        "
                                    >
                                        {{ editMode ? "Update" : "Submit" }}
                                    </v-btn>
                                    <v-btn
                                        class="ml-2"
                                        text
                                        color="primary"
                                        :disabled="loading"
                                        @click="cancelRating"
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
                                :items="comments"
                            >
                                <template v-slot:default="{ item }">
                                    <v-list-item
                                        two-line
                                        v-if="
                                            !(
                                                editMode &&
                                                item.userId === userId
                                            )
                                        "
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <div
                                                    :class="[
                                                        'd-flex flex-row',
                                                        {
                                                            'primary--text font-weight-bold':
                                                                item.userId ===
                                                                userId
                                                        }
                                                    ]"
                                                >
                                                    {{ item.userName }}
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
                                                        item.createdAt,
                                                        "D MMM, YYYY"
                                                    )
                                                }})
                                            </div>
                                            <v-list-item-subtitle>{{
                                                item.text
                                            }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-row>
                                                <v-btn
                                                    icon
                                                    @click="
                                                        handleEditClick(item)
                                                    "
                                                    ><v-icon
                                                        >mdi-pencil</v-icon
                                                    ></v-btn
                                                >
                                                <v-btn
                                                    icon
                                                    color="error"
                                                    :loading="
                                                        deletingCommentObj[
                                                            item.id
                                                        ]
                                                    "
                                                    @click="deleteComment(item)"
                                                    ><v-icon
                                                        >mdi-delete</v-icon
                                                    ></v-btn
                                                >
                                            </v-row>
                                        </v-list-item-action>
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
    import CampgroundCard from "@/views/campgrounds/CampgroundCard";
    import RatingsComponent from "@/views/campgrounds/RatingsComponent.vue";
    import moment from "moment";
    import { mapState } from "vuex";

    export default {
        name: "ViewCampgroundModal",
        props: {
            camp: { required: true, default: () => ({}) }
        },
        components: { CampgroundCard, RatingsComponent },
        data: () => ({
            tab: 0,
            rating: 0,
            review: "",
            comments: [],
            loading: false,
            deletingCommentObj: {},
            editingComment: null
        }),
        computed: {
            ...mapState("userModule", ["userId"]),
            editMode() {
                return this.editingComment !== null;
            },
            overallRating() {
                let sum = 0;
                let count = 0;
                let avg = 0;

                (this.comments ?? []).forEach(x => {
                    sum += x.rating;
                    count++;
                });

                if (count > 0) {
                    avg = sum / count;
                }

                return { avg, total: count };
            },
            hasUserCommented() {
                return (this.comments ?? [{}])[0]?.userId === this.userId;
            }
        },
        methods: {
            cancelRating() {
                this.rating = 0;
                this.editingComment = null;
            },
            dateFormatter(date, format) {
                return moment(date).format(format);
            },
            addComment() {
                this.loading = true;
                this.$store
                    .dispatch("campModule/addComment", {
                        text: this.review,
                        rating: this.rating,
                        campId: this.camp.id
                    })
                    .then(res => {
                        this.comments = [res, ...this.comments];
                        this.review = "";
                        this.rating = 0;
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage: "Your comment has been added!"
                        });
                    })
                    .finally(() => (this.loading = false));
            },
            deleteComment({ rating, id }) {
                this.deletingCommentObj = {
                    ...this.deletingCommentObj,
                    [id]: true
                };
                this.$store
                    .dispatch("campModule/deleteComment", {
                        rating,
                        campId: this.camp.id,
                        commentId: id
                    })
                    .then(res => {
                        this.comments = this.comments.filter(x => x.id !== id);
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage: "Comment has been removed."
                        });
                    })
                    .finally(
                        () =>
                            (this.deletingCommentObj = {
                                ...this.deletingCommentObj,
                                [id]: false
                            })
                    );
            },
            handleEditClick({ rating, id, text }) {
                this.editingComment = { rating, id };
                this.rating = rating;
                this.review = text;
            },
            updateComment() {
                this.loading = true;
                this.$store
                    .dispatch("campModule/editComment", {
                        text: this.review,
                        commentId: this.editingComment.id,
                        oldRating: this.editingComment.rating,
                        newRating: this.rating,
                        campId: this.camp.id
                    })
                    .then(res => {
                        this.comments[0] = { ...this.comments[0], ...res };
                        this.editingComment = null;
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage: "Your comment has been added!"
                        });
                    })
                    .finally(() => (this.loading = false));
            }
        },
        mounted() {
            this.$store
                .dispatch("campModule/fetchCommentsForCamp", {
                    campId: this.camp.id
                })
                .then(res => (this.comments = res));
        }
    };
</script>
