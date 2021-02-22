export default function (fn) {
    return function (ctx, payload) {
        ctx.commit('loaderModule/setLoading', true, {
            root: true
        });
        return fn(ctx, payload).catch(e => {
            console.error(e);
            throw e;
        }).finally(() => ctx.commit('loaderModule/setLoading', false, {
            root: true
        }))
    }
}