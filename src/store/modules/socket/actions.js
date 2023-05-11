export default {
    updateSocket({commit}, socket) {
        commit('updateSocket', socket);
    },
    updateSocketKey({commit}, {key, value}) {
        commit('updateSocketKey', {key, value});
    },
}