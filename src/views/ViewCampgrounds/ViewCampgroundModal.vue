<template>
    <v-dialog content-class="ViewCampgroundModal" :value="showModal" persistent no-click-animation width="70%">
        <v-card>
            <v-card-title>
                {{camp.title}} 
                <v-btn @click="$router.push({name: 'viewCampground'})" icon absolute right><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>
<script>
    import CampgroundCard from "@/views/CampgroundCard";

    export default {
        name: "ViewCampgroundModal",
        props: {
            camp: { required: true, default:() => ({}) },
            showModal: {required: true, type: Boolean}
        },
        components: { CampgroundCard },
    };
</script>
