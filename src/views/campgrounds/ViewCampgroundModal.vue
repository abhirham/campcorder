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
                :src="camp.image.regular"
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
                        <template
                            v-if="
                                userId !== null &&
                                    (!hasUserCommented || editMode)
                            "
                        >
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
                                        background-color="action"
                                        color="action"
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
                                :items="commentsToShow"
                            >
                                <template v-slot:default="{ item, index }">
                                    <v-list-item
                                        :three-line="item.userId === userId"
                                        :two-line="item.userId !== userId"
                                        v-if="
                                            !(
                                                editMode &&
                                                item.userId === userId
                                            )
                                        "
                                    >
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="d-flex flex-row align-center"
                                            >
                                                <v-rating
                                                    hover
                                                    half-increments
                                                    length="5"
                                                    x-small
                                                    dense
                                                    :value="item.rating"
                                                    background-color="action"
                                                    color="action"
                                                    readonly
                                                ></v-rating>
                                                <span
                                                    :class="[
                                                        'ml-2 mr-1',
                                                        {
                                                            'primary--text font-weight-bold':
                                                                item.userId ===
                                                                userId
                                                        }
                                                    ]"
                                                >
                                                    {{ item.userName }}
                                                </span>
                                                on

                                                {{
                                                    dateFormatter(
                                                        item.createdAt,
                                                        "MMM D, YYYY"
                                                    )
                                                }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>{{
                                                item.text
                                            }}</v-list-item-subtitle>
                                            <div
                                                class="d-flex flex-row"
                                                v-if="item.userId === userId"
                                            >
                                                <v-btn
                                                    color="#3498db"
                                                    text
                                                    x-small
                                                    @click="
                                                        handleEditClick(item)
                                                    "
                                                    class="font-weight-black text-capitalize"
                                                    >Edit</v-btn
                                                >
                                                <v-btn
                                                    color="error"
                                                    text
                                                    x-small
                                                    :loading="
                                                        deletingCommentObj[
                                                            item.id
                                                        ]
                                                    "
                                                    @click="deleteComment(item)"
                                                    class="font-weight-black text-capitalize"
                                                    >Delete</v-btn
                                                >
                                            </div>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider
                                        v-if="
                                            index !== commentsToShow.length - 1
                                        "
                                    />
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
            commentsToShow() {
                if (this.editMode) {
                    return this.comments.slice(1);
                }

                return this.comments;
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
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage:
                                "Could not add comment. Please try again.",
                            error: true
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
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage:
                                "Could not delete comment. Please try again.",
                            error: true
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
                    .catch(e => {
                        this.$store.commit("notificationModule/setAlert", {
                            alertMessage:
                                "Could not edit comment. Please try again.",
                            error: true
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
