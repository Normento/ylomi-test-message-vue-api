// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    userId: null,  // Stocker l'ID de l'utilisateur
  },
  mutations: {
    setAuth(state, { status, userId }) {
      state.isAuthenticated = status;
      state.userId = userId;  // Stocker ou effacer l'ID utilisateur
    }
  },
  actions: {
    login({ commit }, { userId }) {
      commit('setAuth', { status: true, userId });  // Passer l'ID de l'utilisateur lors de la connexion
    },
    logout({ commit }) {
      commit('setAuth', { status: false, userId: null });  // Effacer l'ID utilisateur lors de la déconnexion
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userId: state => state.userId
  }
});
