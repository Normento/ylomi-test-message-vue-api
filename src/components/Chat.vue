<template>
  <div>
    <!-- Champ pour l'ID du destinataire -->
    <input
      type="text"
      v-model="receiverId"
      placeholder="ID du destinataire"
    />
    <!-- Champ pour saisir le message à envoyer -->
    <input
      type="text"
      v-model="newMessage"
      placeholder="Écrire un message..."
    />
    <!-- Bouton pour envoyer le message -->
    <button @click="sendMessage">Envoyer</button>
    <!-- Affichage des messages -->
    <div v-for="message in messages" :key="message.id" class="message">
      <p><strong>{{ message.sender.first_name }}:</strong> {{ message.message }}</p>
      <p><strong>{{ message.receiver.first_name }}:</strong> {{ message.message }}</p>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router';
import axios from 'axios';
import Echo from 'laravel-echo';
import { onBeforeMount, ref } from 'vue';

export default {
  name: 'Chat',
  setup() {
    const router = useRouter();
    const token = localStorage.getItem('authToken');

    onBeforeMount(() => {
      if (!token) {
        router.push('/login');
      }
    });

    const newMessage = ref('');
    const messages = ref([]);
    const receiverId = ref('');

    // function listenForMessages() {
    //   const userId = localStorage.getItem('userId');
    //   if (userId) {
    //     let listener = new Echo({
    //       broadcaster: 'pusher',
    //       key: import.meta.env.VITE_REVERB_APP_KEY,
    //       wsHost: import.meta.env.VITE_REVERB_HOST,
    //       wsPort: import.meta.env.VITE_REVERB_PORT,
    //       wssPort: import.meta.env.VITE_REVERB_PORT,
    //       forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    //       authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    //       auth: {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           Accept: 'application/json'
    //         }
    //       },
    //     });

    //       listener.private('support.'+ userId).listen('TestEvent', (e) => {
    //           if (e.message && e.message.sender && e.message.sender.first_name) {
    //               this.messages.push(e.message);

    //               console.log('Received message:', e.message);
    //           }
    //       });
    //   }
    // }

    function sendMessage() {
      if (!newMessage.value.trim() || !receiverId.value.trim()) {
        alert("Le message ne peut pas être vide et doit avoir un destinataire.");
        return;
      }
      const apiUrl = 'http://127.0.0.1:8000/api/chat';
      axios.post(apiUrl, {
        message: newMessage.value,
        receiver_id: receiverId.value
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        console.log(response);
        if (response.data && response.data.message) {
          messages.value.push(response.data.message);
        } else {
          messages.value.push(response.data);
        }
        newMessage.value = '';
      }).catch(error => {
        console.error('Erreur lors de lenvoi du message:', error);
        alert("Erreur lors de envoi du message. Veuillez réessayer.");
      });
    }

    return { newMessage, messages, receiverId, sendMessage, };
  }
}
</script>


<style scoped>
.message {
  margin-bottom: 10px;
}
</style>
