<template>
  <section class="login-modal">
    <form @submit.prevent="$emit('login',creds)" class="flex column align-center">
      <h3>login</h3>
      <input v-model="creds.email" type="text" placeholder="Email" />
      <input v-if="isSignup" v-model="creds.name" type="text" placeholder="Username" />
      <input v-model="creds.password" type="password" placeholder="Password" />
      <button  v-if="!isSignup">Login</button>
      <button  v-if="isSignup">Signup</button>
    </form>
  </section>
</template>

<script>
export default {
  props:["isSignup"],
  data() {
    return {
      creds: {
        email: '',
        password: '',
        name:''
      },
    };
  },
};
</script>

