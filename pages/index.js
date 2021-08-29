import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useRef, useState, useEffect} from 'react'
import{useRouter} from 'next/router'
import {login} from '../helpers/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as sdk from 'matrix-js-sdk'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  
  function submitForm(e) {
    e.preventDefault()
    login(username, password).then(
      (result)=> {
        if(result == true){
          router.push('chat/')
        }
      },
      (error)=> {
        if(error){
          toast.error('Something went wrong. Please try again.')
        }
      }
    )
   
    
  }
 


  return (
    <div>
      <Head>
        <title>ZCF | Welcome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.jpeg"/>
        {/* <script src="/sw.js"></script> */}
        <link rel="manifest" href="/manifest.json"/>
      </Head>

      <main>
          {/* Container */}
          <div className="flex items-center">
            {/* Left section*/}
            <div className="w-full p-4 lg:w-1/2  sm:px-20 md:px-56 rounded-full">
              <div className="grid justify-center">
                  <Image src="/logo.jpeg" alt="ZCF LOGO" height={200} width={200} className=""/>
               </div>
              {/* <h1 className="font-bold text-[#198A00] text-4xl">ZCF Web</h1> */}
              <p className="w-full pt-10 text-4xl font-bold text-[#198A00]">Login</p>
              {/* <p className="text-[#198A00] pt-3 w-full">Be part of the best social experience.</p> */}
              <div className="items-center py-4">
                
                <form className="w-full" method="post" onSubmit={submitForm}>
                  {/* <p className="text-red-500">{message}</p> */}
                  <ToastContainer 
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <p className="pt-2 pb-2 text-gray-500">Username*</p>
                  <input value={username} onChange={e=>setUsername(e.target.value)} type="username" className="flex w-full border-[#198A00] border p-4 rounded-full focus:outline-none transition duration-150 transform focus:border-2" placeholder="i.e johndoe100" required/>
                  <p className="pt-6 pb-2 text-gray-500">Password*</p>
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="flex w-full border-[#198A00] border p-4 rounded-full focus:outline-none focus:border-[#198A00] transition duration-150 transform focus:border-2" placeholder="Min 8 Characters" minLength="8" required/>

                  <div className="flex items-center">
                     <span className="mt-4 text-gray-500">Forgot Password?</span>
                  </div>
                  <button type="submit" className="border-2 mt-2 w-full border-[#198A00] bg-[#198A00] border-2 p-4 rounded-full items-center text-white shadow-md transition duration-150 transform hover:shadow-xl">LOGIN</button>
                  
                </form>
                <div className="mt-4 mx-auto center">
                     <span className="mt-4 text-gray-500">You do not have an account? </span><Link href="/register"><span className="text-[#198A00] font-bold cursor-pointer">Sign up here</span></Link>
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="hidden lg:inline-flex flex items-center flex-grow h-screen contrast-1 rounded-l-full shadow-2xl opacity-90 mix-blend-multiply bg-[#198A00]" 
              style={{ 
                    backgroundImage: `url("/assets/pexel (3).jpg")` ,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition: 'center',
                }}>
              <h1 className="justify-center"></h1>
              
            </div>
          </div>
      </main>
    </div>
  )
}
