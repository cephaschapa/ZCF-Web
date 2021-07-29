import { CheckIcon } from "@heroicons/react/outline"
import { CheckCircleIcon, DotsHorizontalIcon } from "@heroicons/react/solid"
import {useState} from "react"

function ChatBubbleSender({message, time, read, user, sender}) {
    const [optionsMenu, setOptions] = useState(false)

    return (
        <div className={`${user == sender? "justify-end":"justify-start"} flex space-x-1 mb-2 w-full`}>
            <div className={`${user == sender? 'bg-[#3db422]': 'text-black bg-gray-200 rounded-br-2xl'} flex p-2 rounded-2xl space-y-3 max-w-xl`}>
                <div className="flex flex-row">
                    <p className="text-sm">{message}</p>
                </div>
                <div className="flex flex-grow w-28 space-x-3 items-center justify-end">
                    <p className="text-xs ml-2">{time}</p>
                    {
                        read ? <CheckCircleIcon className="h-4 w-4 text-[#198A00]"/> : <CheckIcon className="h-4 w-4"/>
                    }
                </div>
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
