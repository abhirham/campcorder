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
                numRatings: 0,
                avgRating: 0,
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

            let campref = db.collection("camps").doc(campId);
            let commentRef = db.collection("comments").doc();
            return db.runTransaction(transaction => {
                return transaction.get(campref).then(res => {
                    let { numRatings, avgRating } = res.data();

                    let newNumRating = numRatings + 1;
                    let newAvgRating =
                        (avgRating * numRatings + rating) / newNumRating;

                    transaction.update(campref, {
                        numRatings: newNumRating,
                        avgRating: newAvgRating
                    });

                    let payload = {
                        text,
                        rating,
                        id: commentRef.id,
                        userId: userId,
                        userName: firstName,
                        campId,
                        createdAt: moment.utc().format()
                    };

                    transaction.set(commentRef, payload);

                    return payload;
                });
            });
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
