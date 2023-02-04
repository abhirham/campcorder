<template>
    <ValidationProvider rules="required|email" v-slot="{ errors }">
        <v-text-field
            :outlined="outlined"
            :filled="filled"
            :background-color="backgroundColor"
            :dense="dense"
            :error-messages="errors"
            hide-details="auto"
            label="Email"
            type="email"
            v-model="email"
            :class="className"
        />
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";

    export default {
        name: "validatedEmail",
        props: {
            outlined: { type: Boolean, default: false },
            filled: { type: Boolean, default: false },
            dense: { type: Boolean, default: false },
            backgroundColor: { type: String },
            className: { type: String },
            value: { required: true }
        },
        components: { ValidationProvider },
        computed: {
            email: {
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
