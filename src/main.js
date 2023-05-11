import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ErrorMessage from "@/components/partials/ErrorMessage";

Vue.config.productionTip = false
Vue.component('error-msg',ErrorMessage)
new Vue({
    render: h => h(App),
    store:store
}).$mount('#app')
