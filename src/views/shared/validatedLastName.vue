<template>
    <ValidationProvider rules="required" v-slot="{ errors }">
        <v-text-field
            :outlined="outlined"
            :filled="filled"
            :background-color="backgroundColor"
            :dense="dense"
            :error-messages="errors"
            hide-details="auto"
            label="Last Name"
            v-model="lastName"
            :class="className"
        />
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";

    export default {
        name: "validatedLastName",
        components: { ValidationProvider },
        props: {
            outlined: { type: Boolean, default: false },
            filled: { type: Boolean, default: false },
            dense: { type: Boolean, default: false },
            backgroundColor: { type: String },
            className: { type: String },
            value: { required: true }
        },
        computed: {
            lastName: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit("input", val);
                }
            }
        }
    };
</script>
