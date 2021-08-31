import {Login,Agenda} from './../components/'
import {useEffect, useState} from 'react'
import firebase from './../config/firebase'

export default function Home(){
  const [auth,setAuth] = useState({
    loading:true,
    user:false
  })
  

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
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