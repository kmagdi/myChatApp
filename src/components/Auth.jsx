import React from 'react'
import {auth,provider} from '../firebase_config'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookies=new Cookies()

export const Auth=({setIsAuth})=> {
    const handleClick=async ()=>{
        try{
            const result=await signInWithPopup(auth,provider)
            console.log(result.user.refreshToken)
            cookies.set('auth-token',result.user.refreshToken)
            setIsAuth(true)

        }catch(err){
           
            
        }
    }

  return (
    <div>
      <p>Sign in with Google to continue.</p>
      <button onClick={handleClick}>Sign in</button>
    </div>
  )
}
