<template>
    <v-list-item class="px-0" two-line>
        <v-list-item-content>
            <v-list-item-title class="mb-2"
                >{{ title }}
                <v-btn
                    absolute
                    right
                    v-if="!readonly"
                    color="black"
                    class="font-weight-black editBtn text-capitalize"
                    text
                    small
                    @click="editMode = !editMode"
                >
                    {{ editMode ? "Cancel" : "Edit" }}
                </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle v-if="!editMode">
                {{ value || "Not provided" }}
            </v-list-item-subtitle>
            <template v-if="editMode">
                <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="handleSave">
                        <slot></slot>
                        <v-row>
                            <v-col class="pt-0">
                                <v-btn
                                    :loading="loading"
                                    type="submit"
                                    color="primary"
                                    :disabled="invalid"
                                    >Save</v-btn
                                >
                            </v-col>
                        </v-row>
                    </form>
                </ValidationObserver>
            </template>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    import { ValidationObserver } from "vee-validate";

    export default {
        name: "EditWrapper",
        components: { ValidationObserver },
        props: {
            title: { type: String },
            value: { type: String },
            cb: { type: Function },
            readonly: { type: Boolean, default: false }
        },
        data: () => ({
            editMode: false,
            loading: false
        }),
        methods: {
            handleSave() {
                this.loading = true;
                this.cb()
                    .then(res => (this.editMode = false))
                    .catch(e => {})
                    .finally(() => (this.loading = false));
            }
        }
    };
</script>

<style scoped>
    .editBtn {
        right: 0;
    }
</style>
