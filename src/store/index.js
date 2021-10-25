import Vue from 'vue';
import Vuex from 'vuex';
import userModule from '@/store/modules/user.module';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    cartItems: []
  },
  getters: {
    cart(state) {
      return state.cartItems;
    },
    cartLength(state) {
      return state.cartItems.reduce((acc, item) => {
        return acc + item.count;
      }, 0);
    }
  },

  mutations: {
    addToCart(state, { car }) {
      const item = state.cartItems.find(cartItem => {
        return cartItem.item._id === car._id;
      });
      if (item) item.count++;
      else state.cartItems.push({ item: car, count: 1 });
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
  actions: {
    async addToCart({ commit }, { car }) {
      // service stuff
      commit({ type: 'addToCart', car });
    }
  },
  modules: {
    userModule
  }
});
