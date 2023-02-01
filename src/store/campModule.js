import { db } from "@/firebase";
import moment from "moment";

export default {
    name: "campModule",
    namespaced: true,
    state() {
        return {
            camps: {}
        };
    },
    mutations: {
        setCamps(state, payload) {
            state.camps = payload;
        },
        updateCamp(state, { campId, ...payload }) {
            state.camps[campId] = { ...state.camps[campId], ...payload };
        }
    },
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
        addComment({ rootState, commit }, { text, rating, campId }) {
            let { userId, firstName } = rootState.userModule;

            let campref = db.collection("camps").doc(campId);
            let commentRef = db.collection("comments").doc();

            return commentUpdateHlpr({
                campref,
                campPayloadCb({ numRatings, avgRating }) {
                    let newNumRating = numRatings + 1;
                    let newAvgRating =
                        (avgRating * numRatings + rating) / newNumRating;

                    return {
                        numRatings: newNumRating,
                        avgRating: newAvgRating
                    };
                },
                commentCb({ transaction }) {
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
                }
            }).then(({ campPayload, payload }) => {
                commit("updateCamp", {
                    campId,
                    ...campPayload
                });

                return payload;
            });
        },
        editComment(
            { commit },
            { text, oldRating, newRating, campId, commentId }
        ) {
            let campref = db.collection("camps").doc(campId);
            let commentRef = db.collection("comments").doc(commentId);

            return commentUpdateHlpr({
                campref,
                campPayloadCb({ numRatings, avgRating }) {
                    let newAvgRating =
                        (avgRating * numRatings + (newRating - oldRating)) /
                        numRatings;

                    return {
                        avgRating: newAvgRating
                    };
                },
                commentCb({ transaction }) {
                    let payload = {
                        text,
                        rating: newRating,
                        editedAt: moment.utc().format()
                    };

                    transaction.update(commentRef, payload);

                    return payload;
                }
            }).then(({ campPayload, payload }) => {
                commit("updateCamp", {
                    campId,
                    ...campPayload
                });

                return payload;
            });
        },
        async deleteComment({ commit }, { rating, campId, commentId }) {
            let campref = db.collection("camps").doc(campId);
            let commentRef = db.collection("comments").doc(commentId);

            return commentUpdateHlpr({
                campref,
                campPayloadCb({ numRatings, avgRating }) {
                    let newNumRating = numRatings - 1;
                    let newAvgRating =
                        (avgRating * numRatings - rating) / (newNumRating || 1);

                    return {
                        numRatings: newNumRating,
                        avgRating: newAvgRating
                    };
                },
                commentCb({ transaction }) {
                    transaction.delete(commentRef);
                }
            }).then(({ campPayload }) => {
                commit("updateCamp", {
                    campId,
                    ...campPayload
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

function commentUpdateHlpr({ campref, campPayloadCb, commentCb }) {
    return db.runTransaction(transaction => {
        return transaction.get(campref).then(res => {
            let { numRatings, avgRating } = res.data();

            let campPayload = campPayloadCb({ numRatings, avgRating });

            transaction.update(campref, campPayload);

            let payload = commentCb({ transaction });

            return { campPayload, payload };
        });
    });
}
