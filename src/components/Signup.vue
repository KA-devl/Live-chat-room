<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="password" v-model ="password">
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup(){
    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = () =>{
      console.log(displayName.value, email.value, password.value)
    }

    return {displayName, email, password}
  }

}
</script>

<style>

</style>