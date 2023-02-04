<template>
    <ValidationProvider
        name="Password"
        rules="required|min:6"
        v-slot="{ errors }"
    >
        <v-text-field
            :outlined="outlined"
            :filled="filled"
            :background-color="backgroundColor"
            :dense="dense"
            :error-messages="errors"
            hide-details="auto"
            label="Password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :class="className"
            :append-icon="`mdi-eye${showPassword ? '' : '-off'}-outline`"
            @click:append="showPassword = !showPassword"
        />
    </ValidationProvider>
</template>

<script>
    import { ValidationProvider } from "vee-validate";

    export default {
        name: "validatedPassword",
        props: {
            outlined: { type: Boolean, default: false },
            filled: { type: Boolean, default: false },
            dense: { type: Boolean, default: false },
            backgroundColor: { type: String },
            className: { type: String },
            value: { required: true }
        },
        components: { ValidationProvider },
        data: () => ({
            showPassword: false
        }),
        mounted() {},
        computed: {
            password: {
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
