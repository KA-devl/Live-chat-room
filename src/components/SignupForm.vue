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
  //must use context to use emit()
  setup(props,context){
    //use the composables like this
    const {error, signup} = useSignup()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () =>{
      await signup(email.value, password.value, displayName.value)
      if(!error.value){
        console.log('user signed up successfully')
        context.emit('signup')
      }
    }

    return {displayName, email, password, handleSubmit, error}
  }

}
</script>

<style>

</style>