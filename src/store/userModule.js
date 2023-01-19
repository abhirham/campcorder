import { auth, db } from "@/firebase";

export default {
    name: "userModule",
    namespaced: true,
    state() {
        return {
            userId: "",
            firstName: "",
            lastName: "",
        };
    },
    mutations: {
        setUser(state, { userId, firstName, lastName }) {
            state.userId = userId;
            state.firstName = firstName;
            state.lastName = lastName;
        },
    },
    getters: {},
    actions: {
        async createUserWithEmailAndPassword(
            { commit },
            { email, password, firstName, lastName }
        ) {
            let { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            let payload = { userId: user.uid, firstName, lastName };

            await db.collection("users").doc(payload.userId).set(payload);
            commit("setUser", payload);
        },
    },
};
