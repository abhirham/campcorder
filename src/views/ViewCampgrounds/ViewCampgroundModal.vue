<template>
    <v-dialog content-class="ViewCampgroundModal" :value="showModal" persistent no-click-animation width="70%">
        <v-card>
            <v-img gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.7)" class="white--text align-end" :src="camp.src"
                max-height="50vh">
                <v-btn @click="$router.push({ name: 'viewCampground' })" elevation="16" absolute icon top right
                    color="white">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title>{{ camp.title }}</v-card-title>
            </v-img>
            <v-card-text class="black--text pt-5">
                <v-row class="mb-3 mt-1 mx-0">
                    Submitted by
                    <span class="primary--text mx-1">{{ camp.createdBy }}</span>
                    on
                    {{ camp.createdAt }}
                    <v-spacer />
                    <div class="text-subtitle-1">${{ camp.price }}/Night</div>
                </v-row>
                <div>{{ camp.description }}</div>
                <v-divider class="my-3" />
                <v-row></v-row>
                <v-list dense>
                    <v-list-item two-line v-for="comment in camp.comments" :key="comment.docId">
                        <v-list-item-content>
                            <v-list-item-title></v-list-item-title>
                            <div class="d-flex flex-row">
                                {{ comment.from }} <v-rating hover half-increments length="5" x-small dense
                                    :value="comment.rating" class="ml-3" background-color="primary" readonly></v-rating>
                            </div>
                            </v-list-item-title>

                            <v-list-item-subtitle>{{
                                comment.comment
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import CampgroundCard from "@/views/CampgroundCard";

export default {
    name: "ViewCampgroundModal",
    props: {
        camp: { required: true, default: () => ({}) },
        showModal: { required: true, type: Boolean },
    },
    components: { CampgroundCard },
};
</script>
