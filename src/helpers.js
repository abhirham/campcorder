export function userPromiseAction(fn) {
    return function(ctx, payload) {
        let _resolve, _reject;

        ctx.commit(
            "userModule/setCreatingUserPromise",
            new Promise((res, rej) => {
                _resolve = res;
                _reject = rej;
            }),
            { root: true }
        );

        return fn(ctx, { ...payload, _resolve, _reject });
    };
}

export function firebaseErrorMessage(key) {
    let errorMap = {
        "auth/email-already-in-use": "Email is already taken.",
        "auth/user-not-found": "Invalid email or password.",
        "auth/wrong-password": "Invalid email or password."
    };

    return errorMap[key] ?? "Something went wrong. Please try again.";
}
