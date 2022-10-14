<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Display name" v-model="displayName">
    <input type="email" required placeholder="Email" v-model="email">
    <input type="password" required placeholder="password" v-model ="password">
    <div class="error"> {{error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'

export default {
  setup(){
    //use the composables like this
    const {error, signup} = useSignup()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () =>{
      await signup(email.value, password.value, displayName.value)
      console.log('user signed up')
    }

    return {displayName, email, password, handleSubmit, error}
  }

}
</script>

<style>

</style>