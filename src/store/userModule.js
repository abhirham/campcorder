import { auth, db } from "@/firebase";
import moment from "moment";
import { userPromiseAction, firebaseErrorMessage } from "@/helpers.js";

export default {
    name: "userModule",
    namespaced: true,
    state() {
        return {
            userId: null,
            email: "",
            firstName: "",
            lastName: "",
            creatingUserPromise: null
        };
    },
    mutations: {
        setUser(state, { userId, firstName, lastName, email }) {
            state.userId = userId;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
        },
        updateUser(state, { firstName, lastName }) {
            state.firstName = firstName;
            state.lastName = lastName;
        },
        clearUserData(state) {
            state.userId = null;
            state.firstName = "";
            state.lastName = "";
            state.email = "";
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
        createUserWithEmailAndPassword: userPromiseAction(
            async (
                { commit },
                { email, password, firstName, lastName, _resolve }
            ) => {
                try {
                    let { user } = await auth.createUserWithEmailAndPassword(
                        email,
                        password
                    );

                    let payload = {
                        userId: user.uid,
                        firstName,
                        lastName,
                        email,
                        createdAt: moment.utc().format(),
                        lastLogIn: moment.utc().format()
                    };

                    await db
                        .collection("users")
                        .doc(payload.userId)
                        .set(payload);

                    _resolve();
                } catch (e) {
                    console.log("ii-i", e.code, e);

                    commit(
                        "notificationModule/setAlert",
                        {
                            alertMessage: firebaseErrorMessage(e.code),
                            error: true
                        },
                        { root: true }
                    );
                }
            }
        ),
        signInWithEmailAndPassword({}, { email, password }) {
            return auth
                .signInWithEmailAndPassword(email, password)
                .then(({ user }) => {
                    db.collection("users")
                        .doc(user.uid)
                        .update({ lastLogIn: moment.utc().format() });
                });
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
        },
        updateUser({ state, commit }, payload) {
            return db
                .collection("users")
                .doc(state.userId)
                .update(payload)
                .then(res => {
                    commit("updateUser", payload);
                    return payload;
                });
        }
    }
};
