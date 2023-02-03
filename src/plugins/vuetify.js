import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#2c3e50",
                action: "#f39c12",
                error: "#e74c3c",
                success: "#2ecc71"
            }
        }
    }
});
