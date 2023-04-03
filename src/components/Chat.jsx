import React, { useEffect, useState,useRef } from 'react'
import {db,auth} from '../firebase_config'

import {addDoc,collection,serverTimestamp,query,where,onSnapshot,orderBy} from 'firebase/firestore'


export const Chat=({room,setRoom})=> {

    const [messages,setMessage]=useState([])
    
    const newMsgRef=useRef(null)

    const messageRef=collection(db,'messages')

    useEffect(()=>{
        const queryMsg=query(messageRef,where('room','==',room),orderBy('createdAT'))
        const unsubscribe=onSnapshot(queryMsg,(snapShot)=>{
            let messages=[];
            snapShot.forEach(doc=>{
                messages.push({...doc.data(),id:doc.id})
            })
            setMessage(messages)
        })
        return ()=>unsubscribe()
    },[])

    const handleSubmit=async (e)=>{
        e.preventDefault();
       console.log('ref:', newMsgRef.current.value)
       const newMessage=newMsgRef.current.value
       if(newMessage=='') return
       await addDoc(messageRef,{
            text:newMessage,
            room,
            createdAT:serverTimestamp(),
            user:auth.currentUser.displayName
        })
        newMsgRef.current.value=''
    }
console.log(messages)

  return (
    <div>

      <h3>Üdv a {room.toUpperCase()} szobában!</h3>
      <div>
        {messages.map(obj=>
            <div key={obj.id} className='msg'>{obj.text} - <b>{obj.user}</b></div>
            )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea placeholder='type here your mesages...' ref={newMsgRef} cols="30" rows="10"></textarea>
        <button type="submit">send</button>
      </form>
    </div>
  )
}
