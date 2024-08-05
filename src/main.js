import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createYmaps } from 'vue-yandex-maps';

createApp(App)
    .use(createYmaps({
        apikey: '2f56120e-7a04-40fd-a0d2-02a46944b4b8',
        importModules: ['@yandex/ymaps3-controls@0.0.1'],
    }))
    .mount('#app');
