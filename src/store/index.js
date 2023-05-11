import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import SocketModule from './modules/socket';


export default new Vuex.Store({
    modules: {
        SocketModule
    }
})