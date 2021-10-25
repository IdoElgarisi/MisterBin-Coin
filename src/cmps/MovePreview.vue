<template>
  <article class="flex column">
    <div class="move-preview flex">
      <div class="from flex column align-center">
        <img :src="`https://robohash.org/${user.name}.png`" />
        <p>{{ user.name }}</p>
      </div>
      <strong>→</strong>
      <div
        class="to flex column align-center"
        @click="clickToProfile(move.contact._id)"
      >
        <img :src="`https://robohash.org/${move.contact.name}.png`" />
        <p>{{ move.contact.name }}</p>
      </div>
      <div class="footer flex">
        <p>{{ move.amount }} {{ move.amount > 1 ? "BITS" : "BIT" }}</p>
        <p>{{ new Date(move.transferedAt).toLocaleString() }}</p>
        <p>balance:{{ move.balanceBefore }}</p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ["move", "user"],
  methods: {
    clickToProfile(contactId) {
      if (!this.$router.history.current.path.includes("contacts")) {
        this.$router.push(`/contacts/${contactId}`);
      }
    },
  },
};
</script>
