<template>
    <div class="d-flex">
        <v-rating
            hover
            half-increments
            length="5"
            small
            dense
            :value="avgRating"
            background-color="primary"
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
        },
        computed: {
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
            }
        }
    };
</script>
