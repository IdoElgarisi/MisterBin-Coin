<template>
  <ul class="contact-list flex column align-center">
    <ContactPreview
      v-for="contact in contacts"
      :key="contact._id"
      :contact="contact"
    />
  </ul>
</template>

<script>
import ContactPreview from "./ContactPreview.vue";
export default {
  props: ["contacts"],
  components: { ContactPreview },
};
</script>
