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

const signup = async (email, password, displayName) => {
  error.value = null

  try {
   const res =  await  createUserWithEmailAndPassword(auth,email, password)
   if(!res){
    throw new Error('Could not complete the signup')
   }
   await res.user.updateProfile({displayName})
   error.value = null
   return res

  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }

}
const useSignup = () => {
  return {error, signup}
}

export default useSignup