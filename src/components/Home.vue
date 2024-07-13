<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <router-link to="/chat">Go to Chat</router-link>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const token = localStorage.getItem('authToken');

    if (token) {
      router.push('/chat');
    }
  }
}
</script>
