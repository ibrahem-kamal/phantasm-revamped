export default {
    computed: {
        socket: {
            get() {
                return this.$store.state.SocketModule.socket
            },
            set(value) {
                this.$store.commit('SocketModule/updateSocket', value)
            }
        }
    }
}