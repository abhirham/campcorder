import { db } from "@/firebase";
import moment from "moment";

export default {
    name: "campModule",
    namespaced: true,
    state() {
        return {};
    },
    mutations: {},
    getters: {},
    actions: {
        createCamp(
            { rootState },
            { userId = undefined, title, description, price }
        ) {
            if (userId === undefined) {
                userId = rootState.userModule.userId;
            }

            let doc = db.collection("camps").doc();

            let payload = {
                title,
                description,
                id: doc.id,
                createdBy: userId,
                price,
                createdAt: moment.utc().format()
            };

            return doc.set(payload).then(res => payload);
        }
    }
};
