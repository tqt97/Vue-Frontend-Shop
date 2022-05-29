import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment';


axios.defaults.baseURL = 'https://tqt-rest-djshop.herokuapp.com/'

createApp(App).use(store).use(router, axios).mount('#app')
