import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie'
export async function login(username, password) {
    const url = 'https://chat.dazmessenger.com/_matrix/client/r0/login'
    const user = await axios.post(url,
      {
        "identifier": {
            "type": "m.id.user",
            "user": username
          },
          
          "password": password,
          "type": "m.login.password"
      
      },
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    })
    const cookies = new Cookies();
    const userSession = user.data
    console.log(user)
    if (userSession) {
      // console.log(userSession)
      const accessToken = userSession.access_token
      // localStorage.setItem('access_token', accessToken)
      // console.log(accessToken)
      let c = cookies.set('access_token',accessToken, {path: '/'})
      console.log(c)
      return true
      
    }else {
      toast.error("Either username or password is incorrect.")
      return false
    }
      
}


export async function register(username, password) {
      console.log(username, password)
      const url = 'https://chat.dazmessenger.com/_matrix/client/r0/register'
      const user = await axios.post(url,
        {
          "auth": {
            "type": "m.login.dummy"
          },
          "inhibit_login": false,
          "password": password,
          "username": username
        },
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json'
        }
      })
    const cookies = new Cookies()
    const userSession = user.data
    console.log(user)
    if (userSession) {
      console.log(userSession)
      const accessToken = userSession.access_token
      console.log(accessToken)
      let c = cookies.set('access_token',accessToken, {path: '/'})
      console.log(c)
      return true     
    } else return false
    
  }

  export async function logout() {
    const accessToken = localStorage.getItem('access_token')
    const url = 'https://chat.dazmessenger.com/_matrix/client/r0/logout'
    const user = await axios.post(url,
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const userSession = user.data
    console.log(userSession)
}
