import { CheckIcon } from "@heroicons/react/outline"
import { CheckCircleIcon, DotsHorizontalIcon } from "@heroicons/react/solid"
import {useState} from "react"
import Image from 'next/image'
import moment from 'moment'

function ChatBubbleSender({ key, read, user, data}) {
    const [optionsMenu, setOptions] = useState(false)
    // console.log(user, sender)
    // return <ChatBubbleSender data={message.event_id} user = 
    // {user} sender={message.sender} key={Math.random() * (1 - 2000000000) + 1} message={message.content.body} time={moment(message.origin_server_ts).format('LT')} msgtype={message.content.msgtype} content={message.content} read={read}/>

    let message = data.content.body
    let time = moment(data.origin_server_ts).format('LT')
    let msgtype = data.content.msgtype
    let content = data.content
    let sender = data.sender

    console.log(msgtype)

    return (
        <div className={`${user == sender? "justify-end":"justify-start"} flex space-x-1 mb-2 w-full`}>
            <div className={`${user == sender? 'bg-[#3db422]': 'text-black bg-gray-200 rounded-br-2xl'} flex p-2 pl-3 rounded-2xl space-y-3 max-w-xl`}>
                {
                   
                    msgtype === 'm.text'? <>
                    <div className="flex flex-row">
                        {
                            message ? <p className="text-sm">{message}</p> : <p className="text-sm"><i>This message was deleted</i></p>
                        }
                    </div>
                    <div className={`flex flex-grow w-28 space-x-3 items-center justify-end`}>
                        <p className="text-xs ml-2">{time}</p>
                        <div className={`${user == sender? "block":"hidden"}`}>
                            {
                                read ? <CheckCircleIcon className="h-4 w-4 text-white"/> : <CheckIcon className="h-4 w-4"/>
                            }
                        </div>
                        
                    </div>
                    </> : <>
                    <div className="flex flex-row">
                    {
                       msgtype === 'm.image'?  <Image src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${content.url.slice(6,)}?height=64&width=64`} height={236} width={236}  className="text-sm rounded-2xl"/> : <p className="text-sm"><i>This message was deleted</i></p>
                    }
                    </div>
                    <div className={`flex flex-grow w-28 space-x-3 items-center justify-end`}>
                        <p className="text-xs ml-2">{time}</p>
                        <div className={`${user == sender? "block":"hidden"}`}>
                            {
                                read ? <CheckCircleIcon className="h-4 w-4 text-white"/> : <CheckIcon className="h-4 w-4"/>
                            }
                        </div>
                        
                    </div>
                    </>
                }
                    
            </div>
        
            {/* <div className="flex items-center w-12 mt-2 justify-center h-12  bg-gray-100 rounded-full cursor-pointer group-hover:flex">
                <DotsHorizontalIcon className="h-6 w-6 text-gray-500" onClick={() => {
                    if(optionsMenu == false){
                        setOptions(true);
                    }else{
                        setOptions(false);
                    }
                }}/>
            </div> */}
            
        </div>
    )
}

export default ChatBubbleSender
