<template>
    <v-card
        :to="
            compact
                ? { name: 'viewCampground', params: { campgroundId: camp.id } }
                : null
        "
        :hover="compact"
    >
        <v-img :src="camp.src" :max-height="compact ? '200px' : '50vh'"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="indigo--text">{{ camp.title }}</h3>
                </v-col>
                <v-col cols="2" align="end" class="black--text">
                    <span v-if="compact">$</span>
                    <span v-else>${{ camp.price }}/Night</span>
                </v-col>
            </v-row>

            <div class="d-flex mt-1">
                <v-rating
                    hover
                    half-increments
                    length="5"
                    small
                    dense
                    :value="camp.rating"
                    background-color="primary"
                    readonly
                ></v-rating>
                <span class="ml-3">2 Reviews</span>
            </div>
            <template v-if="!compact">
                <div class="mt-3">{{ camp.description }}</div>
                <v-divider class="my-3"></v-divider>
                <div>
                    Submitted by
                    <span class="primary--text">{{ camp.createdBy }}</span> on
                    {{ camp.createdAt }}
                </div>
                <v-divider class="my-3"></v-divider>
                <div class="commentSection">
                    <v-card
                        flat
                        v-for="comment in camp.comments"
                        :key="comment.docId"
                    >
                        <v-card-text>
                            <h3 class="font-weight-bold">{{ comment.from }}</h3>
                            {{ comment.comment }}
                        </v-card-text>
                    </v-card>
                    <v-text-field
                        placeholder="Leave a Review"
                        append-icon="mdi-send"
                        outlined
                        rounded
                        dense
                        v-model="comment"
                        @keyup.enter="handleCommentSubmit"
                        @click:append="handleCommentSubmit"
                    >
                    </v-text-field>
                </div>
            </template>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "CampgroundCard",
        props: {
            camp: {
                type: Object,
                required: true,
                validator(val) {
                    return !["id", "src", "title", "price"].some(
                        key => val[key] === undefined
                    );
                }
            },
            compact: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        data() {
            return {
                comment: ""
            };
        },
        methods: {
            handleCommentSubmit() {
                console.log("ii-i", this.comment);
            }
        }
    };
</script>
