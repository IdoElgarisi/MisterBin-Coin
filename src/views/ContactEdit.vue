<template>
  <section v-if="contact" class="edit-page flex column align-center">
    <img :src="`https://robohash.org/${contact.name ? contact.name : 'new'}`" />
    <p v-if="!isEdit">Add new contact</p>
    <p v-if="isEdit">Edit contact</p>
    <form @submit.prevent="submit" v-if="contact">
      <input
        type="text"
        v-model.trim="contact.name"
        placeholder="Name"
        required
      />
      <input
        type="email"
        v-model="contact.email"
        placeholder="Email"
        required
      />
      <input
        type="text"
        v-model.trim="contact.phone"
        placeholder="Phone"
        required
      />
      <button>save</button>
      <router-link to="/contacts">
        <button>back</button>
      </router-link>
    </form>
    <button v-if="isEdit" @click="remove">delete</button>
  </section>
</template>

<script>
import { contactService } from "../services/contact.service";
export default {
  data() {
    return {
      contact: { name: "", email: "", phone: "" },
      isEdit: true,
    };
  },
  created() {
    this.loadContact();
  },
  methods: {
    async loadContact() {
      const { contactId } = this.$route.params;
      if (!contactId) {
        this.isEdit = false;
        return (this.contact = { name: "", email: "", phone: "" });
      }
      this.contact = { ...(await contactService.getById(contactId)) };
    },
    async submit() {
      await contactService.save(this.contact);
      this.$router.push("/contacts");
    },
    async remove() {
      await contactService.remove(this.contact._id);
      this.$router.push("/contacts");
    },
  },
};
</script>
