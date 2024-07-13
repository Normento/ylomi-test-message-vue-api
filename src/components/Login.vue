<template>
  <div class="login-container">
    <input v-model="phone" placeholder="Numéro de téléphone" type="text" />
    <input v-model="password" placeholder="Mot de passe" type="password" />
    <button @click="login">Se connecter</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      phone: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    login() {
      axios.post('http://127.0.0.1:8000/api/auth/login', {
        phone_number: this.phone,
        password: this.password
      }).then(response => {
        localStorage.setItem('authToken', response.data.access_token);
        localStorage.setItem('userId', response.data.data.id);
        console.log(response);
        this.$router.push('/chat');
      }).catch(error => {
        console.error('Login failed:', error);
        alert("Login failed. Please check your credentials.");
      });
    }
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 20px;
}
input, button {
  margin-bottom: 10px;
}
</style>
