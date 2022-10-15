<template>
  <div class="chat-window">
    <div v-if="documents" class="messages">
        <div v-for="doc in documents" :key="doc.id" class="single">
          <span class="created-at" v-if="doc.createdAt.toDate()">{{doc.createdAt.toDate()}}</span>
          <span class="name">{{doc.name}}</span>
          <span class="message">{{doc.message}}</span>

        </div>
    </div>
  </div>
  
</template>

<script>

import { db} from '../firebase/config'
import { onSnapshot, collection, orderBy, query} from "firebase/firestore";
import { ref } from 'vue'
export default {
  setup(){
   const documents = ref([])
   const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
   onSnapshot(q, snap=>{
    console.log('Snapshot', snap)
    let docs = snap.docs.map(doc=>{
      return {...doc.data(), id:doc.id}
    })
    console.log('documents: ', docs)
    documents.value = docs
   })
   return {documents}
  }

}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }

</style>