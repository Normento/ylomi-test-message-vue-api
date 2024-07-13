import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import router from './router';

const app = createApp(App); // Ceci crée une instance de l'application
app.use(router); // Ceci est correct si `app` est une instance de Vue valide
app.mount('#app');
//Pusher.logToConsole = true;
const userId = localStorage.getItem('userId')
let listener = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    //cluster: import.meta.env.VITE_REVERB_CLUSTER,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            Accept: 'application/json'
        }
    },
});

listener.listen('support.'+ userId, 'TestEvent', (e) => {
    console.log('Event =>', e);
    console.log('Received message:', e.message);
})

// listener.private('chat.' + userId)
//     .listen('NewMessageEvent', (e) => {
//         console.log(e);
//         console.log('Received message:', e.message);
//     });



app.use(router);
