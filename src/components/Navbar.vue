<template>
   <nav>
    <div>
      <p>Hey there... Anes</p>
      <p class="email">Currently logged in as ... email</p>
    </div>
    <button @click = "handleSubmit">Logout</button>
   </nav>

</template>

<script>
import { useRouter } from 'vue-router'
import useLogout from '../composables/useLogout'

export default {
  setup(){
    const{error, logout} = useLogout()

    const router = useRouter()

    const handleSubmit = async () => {
      await logout()
      if(!error.value){
        console.log('User logged out')
        router.push({path: '/'})
      }
    }

    return {handleSubmit}


  }

}
</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>