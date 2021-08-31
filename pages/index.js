import {Login,Agenda} from './../components/'
import {useEffect, useState} from 'react'
import {firebaseClient} from './../config/firebase/client'

export default function Home(){
  const [auth,setAuth] = useState({
    loading:true,
    user:false,
  })
    

  useEffect(()=>{
    firebaseClient.auth().onAuthStateChanged(user=>{
      setAuth({
        loading:false,
        user
      })
    })
  },[])
  if(auth.loading){
    return 'Loading....'
  }
 
  return auth.user ? <Agenda /> : <Login />
}