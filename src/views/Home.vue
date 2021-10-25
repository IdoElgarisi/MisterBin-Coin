<template>
  <section class="home">
    <section v-if="loggedInUser">
      <div class="user-info flex align-center">
        <img :src="`https://robohash.org/${loggedInUser.name}.png`" />
        <div class="flex column">
          <p>Hi {{ loggedInUser.name }}</p>
          <p>Balance:</p>
          <p>
            {{ loggedInUser.balance }} BITS <span>( ${{ getBtcToUsd }} )</span>
          </p>
        </div>
      </div>
      <div class="logout-btn-container flex justify-center">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </section>
    <div v-else-if="!loggedInUser" class="no-user-section">
      <login-modal :isSignup="isSignup" @login="login" />
      <div>
      <button v-if="!isSignup" @click="onOpenSignup">Signup</button>
      </div>

    </div>
    <MoveList v-if="loggedInUser" :user="loggedInUser" />
  </section>
</template>

<script>
import { getUser } from "../services/user.service";
import { getRate } from "../services/bitcoin.service";
import MoveList from "../cmps/MoveList.vue";
import loginModal from "../cmps/login-modal.vue";
export default {
  data() {
    return {
      rate: null,
      isSignup:false
    };
  },
  methods: {
    async loadUser() {
      try {
        this.user = await getUser();
      } catch (err) {
        console.log("error", err);
      }
    },
    async getRate() {
      try {
        this.rate = await getRate();
      } catch (err) {}
    },
    async login(creds) {
      await this.$store.dispatch({ type: "login", creds });
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
    },
    onOpenSignup(){
      this.isSignup=true
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    getBtcToUsd() {
      return (this.loggedInUser.balance / this.rate).toLocaleString("en-US");
    },
  },

  async created() {
    // this.loadUser();
    this.getRate();
    this.$store.dispatch({ type: "loadUser" });
  },
  components: {
    MoveList,
    loginModal,
  },
};
</script>
