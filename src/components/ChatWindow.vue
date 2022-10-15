<template>
  <div class="chat-window">
    <div v-if="documents" class="messages" ref="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
          <span class="created-at">{{doc.createdAt}} ago</span>
          <span class="name">{{doc.name}}</span>
          <span class="message">{{doc.message}}</span>

        </div>
    </div>
  </div>
  
</template>

<script>

import { db} from '../firebase/config'
import { onSnapshot, collection, orderBy, query} from "firebase/firestore";
import { computed, ref, onUpdated, watchEffect } from 'vue'
import { formatDistanceToNow } from 'date-fns'
export default {
  setup(){
   const documents = ref([])

    const formattedDocuments = computed(()=>{
      if(documents.value){
        return documents.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return {...doc, createdAt : time}
        })
      }
    })

   const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'))
   const unsub= onSnapshot(q, snap=>{
    console.log('snapshot')
    let results =[]
     snap.docs.forEach(doc=>{
      //On ne veut pas modifier le data jusqua ce que le serveur crée le timestamp et nous le renvoi
       doc.data().createdAt && results.push({...doc.data(), id:doc.id})
    })
    console.log('documents: ', results)
    documents.value = results
   })
   
   //When component unmount, we unsub from prev collection (To avoid extra snapshots)
   watchEffect((onInvalidate)=>{
    onInvalidate(()=>unsub())
   })

   //scroll to recent messages
   const messages = ref(null)
   onUpdated(()=>{
    messages.value.scrollTop= messages.value.scrollHeight
   })
   
   return {documents, formattedDocuments, messages}
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