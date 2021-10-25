<template>
  <div v-if="moves" class="move-list">
    <h2>Recent Activity</h2>
    <MovePreview
      v-for="move in user.moves"
      :key="move.id"
      :move="move"
      :user="user"
    />
    <!-- <article
      v-for="move in user.moves"
      :key="move.id"
      class="flex column"
    >
    <div class="move-preview flex ">
      <div class="from flex column align-center ">
        <img :src="`https://robohash.org/${user.name}.png`" />
        <p>{{ user.name }}</p>
      </div>
      TO
      <div class="to flex column align-center ">
        <img :src="`https://robohash.org/${move.contact.name}.png`" />
        <p>{{ move.contact.name }}</p>
      </div>
      <div class="footer flex">
        <p>Amount: {{ move.amount }}</p>
        <p>On: {{ new Date(move.transferedAt).toLocaleString() }}</p>
      </div>
      </div>
    </article> -->
  </div>
</template>

<script>
import MovePreview from "./MovePreview.vue";
export default {
  data() {
    return {
      moves: this.user.moves,
    };
  },
  props: ["user"],
  components: { MovePreview },
};
</script>
