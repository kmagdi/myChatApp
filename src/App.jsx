import { useState,useRef } from 'react'
import Cookies from 'universal-cookie'
import { Auth } from './components/Auth'
import { Chat } from './components/Chat'
import {auth} from './firebase_config'
import { signOut } from 'firebase/auth'
import './App.css'

const cookies=new Cookies()

function App() {
  const [isAuth,setIsAuth] =useState(cookies.get('auth-token'))
  const [room,setRoom]=useState(null)

  const roomInputRef=useRef(null)

  const handleSignOut=async ()=>{
    await signOut(auth)
    cookies.remove()
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth){
    return(
      <div>
        <Auth  setIsAuth={setIsAuth}/>
      </div>
    )
  } 
  return (
    <div className="App">
     {room ? <Chat room={room} setRoom={setRoom} /> : 
     <>
      <div>Enter the room name:</div>
      <input type="text" ref={roomInputRef}/>
      <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
     </>
    
     }
     <div class="signout" onClick={handleSignOut}>sign out</div>
    </div>
  )
}

export default App
