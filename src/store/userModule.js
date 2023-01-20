import { auth, db } from "@/firebase";

export default {
    name: "userModule",
    namespaced: true,
    state() {
        return {
            userId: null,
            firstName: "",
            lastName: "",
            creatingUserPromise: null
        };
    },
    mutations: {
        setUser(state, { userId, firstName, lastName }) {
            state.userId = userId;
            state.firstName = firstName;
            state.lastName = lastName;
        },
        clearUserData(state) {
            state.userId = null;
            state.firstName = "";
            state.lastName = "";
        },
        setCreatingUserPromise(state, promise) {
            state.creatingUserPromise = promise;
        }
    },
    getters: {
        isUserLoggedIn(state) {
            return state.userId !== null;
        }
    },
    actions: {
        async createUserWithEmailAndPassword(
            { state, commit },
            { email, password, firstName, lastName }
        ) {
            let resolve, reject;

            commit(
                "setCreatingUserPromise",
                new Promise((res, rej) => {
                    resolve = res;
                    reject = rej;
                })
            );

            let { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            let payload = { userId: user.uid, firstName, lastName };

            await db
                .collection("users")
                .doc(payload.userId)
                .set(payload);

            resolve();
        },
        signInWithEmailAndPassword({}, { email, password }) {
            return auth.signInWithEmailAndPassword(email, password);
        },
        logoutUser() {
            return auth.signOut();
        },
        fetchUserFromFirestore({ commit }, { userId }) {
            return db
                .collection("users")
                .doc(userId)
                .get()
                .then(res => {
                    let data = res.data();
                    commit("setUser", data);
                    return data;
                });
        }
    }
};
