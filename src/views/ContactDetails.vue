<template>
  <div class="contact-details-wrapper">
    <section
      class="contact-details flex column align-center justify-center"
      v-if="contact"
    >
      <img :src="`https://robohash.org/${contact.name}`" />
      <strong
        ><p>{{ contact.name }}</p></strong
      >
      <p>{{ contact.email }}</p>
      <p>{{ contact.phone }}</p>
      <p>balance: {{ contact.balance }}</p>
      <div class="actions flex">
        <router-link to="/contacts">
          <button>back</button>
        </router-link>
        <router-link :to="`/contacts/edit/${contact._id}`">
          <button>edit</button>
        </router-link>
        <button @click="toggleTransfer">
          {{ !isTransfer ? "Transfer" : "Close" }}
        </button>
      </div>
      <div v-if="isTransfer" class="transfer-box fade-in">
        <form @submit.prevent="transfer">
          <input
            v-model="transferAmount"
            type="number"
            required
            placeholder="Amount to transfer"
          />
          <button>send bits</button>
        </form>
      </div>
      <p>{{ transferStatus }}</p>
      <MoveList v-if="loggedInUser" :user="getFilteredMoves" />
    </section>
  </div>
</template>
<script>
import { contactService } from "../services/contact.service";
import { getUser } from "../services/user.service";
import { transferBits } from "../services/bitcoin.service";
import MoveList from "../cmps/MoveList.vue";
export default {
  data() {
    return {
      contact: null,
      transferAmount: 0,
      isTransfer: false,
      transferStatus: "",
      user: null,
    };
  },
  created() {
    this.loadContact();
  },
  methods: {
    async loadContact() {
      const { contactId } = this.$route.params;
      if (!contactId) return;
      this.contact = await contactService.getById(contactId);
    },
 
    async transfer() {
      if (this.transferAmount <= 0) return;
      try {
        await transferBits(this.contact._id, this.transferAmount);
        this.transferStatus = "Complete";
        this.loadContact();
        this.toggleTransfer();
        this.transferAmount = 0;
      } catch (err) {
        this.transferStatus = "Insufficient funds";
      }
    },
    toggleTransfer() {
      this.isTransfer = !this.isTransfer;
    },
  },
  computed: {
      loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    getFilteredMoves() {
      const user = this.loggedInUser()
      user.moves = user.moves.filter(
        (move) => move.contact._id === this.contact._id
      );
      return user;
    },
  },
  components: {
    MoveList,
  },
};
</script>
