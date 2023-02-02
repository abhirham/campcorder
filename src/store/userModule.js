import { auth, db } from "@/firebase";
import moment from "moment";
import { userPromiseAction } from "@/helpers.js";
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
        createUserWithEmailAndPassword: userPromiseAction(
            async ({}, { email, password, firstName, lastName, _resolve }) => {
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
        }
    }
};
