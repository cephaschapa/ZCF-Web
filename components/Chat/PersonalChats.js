import {useState, useEffect} from "react"
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router"
import axios from 'axios'

function PersonalChats(props) {   
    // console.log(props.notifictions)
    // console.log(props)
    useEffect(() => {
        router.prefetch(`/chat/${props.room_id}`)
    }, [])
    const router = useRouter()
    return (
        // <div> { ChatData.length < 1 ? <p className="text-gray-400 bg-white p-2 h-28 rounded-2xl">You currently have no chats. Begin a new one by clicking the plus button.</p> 
           <div>
               {/* <Link  key={props.id}  href={`/chat/${props.room_id}`} className="focus:bg-gray-400"> */}
                    <li key={props.id}  id="link1" onClick={() => {
                        router.push(`/chat/${props.room_id}`)
                    }}>
                        <div className="text-gray-500 bg-white rounded-2xl flex items-center p-2 transition duration-200 transform hover:shadow-md cursor-pointer z-0 focus:bg-[#9fd493]">
                            <div className="flex flex-col w-24 h-full">
                                <div className="flex items-center h-16 w-16 rounded-full bg-[#198A00] text-white">
                                <div className="block font-bold h-7 mx-auto text-3xl">
                                {props.contact.charAt(0).toUpperCase()}
                                </div>
                                    {/* <span className="bg-[#41d420] border-2 border-white h-4 w-4 rounded-full mt-10 absolute"></span> */}
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="font-bold text-sm text-gray-700 truncate">{props.contact.charAt(0).toUpperCase()+props.contact.slice(1)}</p>
                                    <p className="text-xs"></p>
                                </div>
                               
                            </div>
                            <div className="flex items-center">
                                {
                                    props.notifictions === undefined || props.notifictions == 0? '': props.notifictions == 0? '': <div className="flex bg-red-400 min-w-max p-2 h-5 rounded-full text-white items-center"><p className="mx-auto text-xs">{props.notifictions}</p></div>
                                }
                            </div>
                        </div>
                    </li> 
                {/* </Link>                    */}
        </div>
    )
}

export default PersonalChats
