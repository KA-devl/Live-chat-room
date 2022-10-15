<template>
  <form>
    <textarea
    placeholder="Type a message and hit enter to send"
    v-model="message" 
    @keypress.enter.prevent="handleSubmit">
  </textarea>

  </form>
</template>

<script>
import {ref} from 'vue'
import getUser from '../composables/getUser'
import {timestamp} from '../firebase/config'
import { db} from '../firebase/config'
import {addDoc, collection} from 'firebase/firestore'
export default {
  setup(){
    const {user} = getUser()
     const message = ref('')

    const handleSubmit = async() =>{
      const colRef = collection(db, 'messages')

      const chat = {
        name : user.value.displayName,
        message : message.value,
        createdAt : timestamp

      }
      await addDoc(colRef, chat)
      
      //reset form
        message.value =''
    
      
    }
    return {message, handleSubmit}
  }

}
</script>

<style scoped>
form {
  margin : 10px;
}
textarea{
  width: 100%;
  max-width:100%;
  margin-bottom:6px;
  padding:10px;
  box-sizing: border-box;
  border:0;
  font-family:inherit;
  outline: none;
}

</style>