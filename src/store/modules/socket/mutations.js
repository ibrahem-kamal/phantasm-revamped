export default {
    updateSocket: (state, socket) => state.socket = socket,
    updateSocketKey: (state, {key, value}) => state.socket[key] = value
}