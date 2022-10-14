import { ref } from "vue"
import  {auth}  from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const error = ref(null)

const login = async (email, password)=>{
try{

  const res =  await signInWithEmailAndPassword(auth, email, password)

  if(!res){
    throw new Error('Could not login')
   }
   error.value = null
   return res

}catch(err){
  console.log(err.message)
  error.value = err.message
}
}

const useLogin = ()=>{
  return {error, login}
}

export default useLogin