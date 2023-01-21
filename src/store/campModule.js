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
        createCamp({ rootState }, { title, description, price }) {
            let { userId, firstName } = rootState.userModule;

            let doc = db.collection("camps").doc();

            let payload = {
                title,
                description,
                id: doc.id,
                createdBy: userId,
                creatorName: firstName,
                price,
                createdAt: moment.utc().format()
            };

            return doc.set(payload).then(res => payload);
        },
        fetchCamps({}) {
            return db
                .collection("camps")
                .get()
                .then(res => {
                    let arr = [];
                    res.forEach(doc => {
                        arr.push(doc.data());
                    });

                    return arr;
                });
        },
        addComment({ rootState }, { text, rating, campId }) {
            let { userId, firstName } = rootState.userModule;
            let doc = db.collection("comments").doc();

            let payload = {
                text,
                rating,
                id: doc.id,
                userId: userId,
                userName: firstName,
                campId,
                createdAt: moment.utc().format()
            };

            return doc.set(payload).then(res => payload);
        },
        fetchCommentsForCamp(ctx, { campId }) {
            return db
                .collection("comments")
                .where("campId", "==", campId)
                .get()
                .then(res => {
                    let arr = [];

                    res.forEach(doc => {
                        arr.push(doc.data());
                    });

                    return arr;
                });
        }
    }
};
