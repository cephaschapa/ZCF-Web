import {useState} from "react"
import Image from 'next/image'
import Link from 'next/link'
function PersonalChats(props) {
    console.log(props)
    
    
    return (
        // <div> { ChatData.length < 1 ? <p className="text-gray-400 bg-white p-2 h-28 rounded-2xl">You currently have no chats. Begin a new one by clicking the plus button.</p> :
            
           <div> <ul>
           
                <Link  key={props.id}  href={`/chat/`} className="focus:bg-gray-400">
                    <li  id="link1">
                        <div className={` text-gray-500 mb-2 bg-white rounded-2xl flex items-center p-2 transition duration-200 transform hover:shadow-md cursor-pointer z-0 focus:bg-[#9fd493]`}>
                            <div className="flex flex-col w-24 h-full">
                                {/* <Image src={data.profileImage} alt="userpicture" height="60" width="60"/> */}
                                <div className="h-16 w-16 bg-gray-100 rounded-full">
                                    
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="font-bold text-sm text-gray-700">{props.display_name}</p>
                                    <p className="text-xs"></p>
                                </div>
                                {/* <div className="flex flex-row w-full justify-between">
                                    <p className="text-gray-400 text-sm">{isTyping? 'Typing...' : data.messageSnippet}</p>
                                    <p className={`${data.hasRead == false ? 'p-2 bg-[#198A00] rounded-full h-2 w-2': 'bg-none'}`}></p>
                                </div> */}
                            </div>
                        </div>
                    </li>
                </Link>
                        
                    
            </ul>
            
        </div>
    )
}

export default PersonalChats
