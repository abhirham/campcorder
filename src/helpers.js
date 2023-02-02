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
