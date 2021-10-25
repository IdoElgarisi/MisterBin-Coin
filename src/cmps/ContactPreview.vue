<template>
  <li class="contact-preview flex align-center" @click="goToPage">
    <img :src="`https://robohash.org/${contact.name}`" />
    <div class="info">
      <p><strong>{{ contact.name }}</strong></p>
      <p>Balance : {{contact.balance}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["contact"],
  methods: {
    goToPage() {
      this.$router.push(`/contacts/${this.contact._id}`)
    }
  }
};
</script>
