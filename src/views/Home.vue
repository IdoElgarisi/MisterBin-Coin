<template>
  <section class="home">
    <div v-if="user" class="user-info flex align-center">
      <img :src="`https://robohash.org/${user.name}.png`" />
      <div class="flex column">
        <p>Hi {{ user.username }}</p>
        <p>Balance:</p>
        <p>
          {{ user.balance }} BITS <span>( ${{ getBtcToUsd }} )</span>
        </p>
      </div>
    </div>
    <MoveList v-if="user" :user="user" />
  </section>
</template>

<script>
import { getUser } from "../services/user.service";
import { getRate } from "../services/bitcoin.service";
import MoveList from "../cmps/MoveList.vue";
export default {
  data() {
    return {
      user: null,
      rate: null,
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
  },
  computed: {
    getBtcToUsd() {
      return (this.user.balance / this.rate).toLocaleString("en-US");
    },
  },
  created() {
    this.loadUser();
    this.getRate();
  },
  components: { MoveList },
};
</script>
