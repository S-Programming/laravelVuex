require('./bootstrap');
import VueRouter from 'vue-router';
import VueEvents from 'vue-events';
import MainApp from './components/MainApp';
import store from './store/index';
window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(VueEvents);
import { routes } from "./routes";
let router = new VueRouter({
    mode: 'history',
    routes,
    store
});
const app = new Vue({
    el: '#app',
    components: { MainApp },
    router,
    store
});
