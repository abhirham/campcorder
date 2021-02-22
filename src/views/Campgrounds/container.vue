<template>
    <v-row>
        <v-col md="4" xl="3" sm="6">
            <CampgroundCard />
        </v-col>
    </v-row>
</template>
<script>
import CampgroundCard from "./CampgroundCard";
export default {
    name: "ListCampgrounds",
    components: { CampgroundCard }
};
</script>
