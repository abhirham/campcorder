<template>
    <v-card
        :to="{ name: 'viewCampground', params: { campgroundId: camp.id } }"
        :hover="compact"
    >
        <v-img :src="camp.src" max-height="200px"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="10">
                    <h3 class="indigo--text">{{ camp.title }}</h3>
                </v-col>
                <v-col cols="2" align="end" class="black--text">
                    <span>$</span>
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
                <div class="commentSection">
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
                        (key) => val[key] === undefined
                    );
                },
            },
            compact: {
                type: Boolean,
                default: false,
            },
        },
        components: {},
        data() {
            return {
                comment: "",
            };
        },
        methods: {
            handleCommentSubmit() {
                console.log("ii-i", this.comment);
            },
        },
    };
</script>
