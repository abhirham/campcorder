<template>
    <div class="d-flex">
        <v-rating
            hover
            half-increments
            length="5"
            small
            dense
            :value="avgRating"
            background-color="action"
            color="action"
            readonly
        ></v-rating>
        <span class="ml-3">{{ totalRatings }} Reviews</span>
    </div>
</template>

<script>
    export default {
        name: "RatingsComponent",
        props: {
            avgRating: { type: Number, required: true },
            totalRatings: { type: Number, required: true }
        }
    };
</script>
