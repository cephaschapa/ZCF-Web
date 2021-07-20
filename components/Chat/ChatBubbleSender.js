import { CheckIcon } from "@heroicons/react/outline"
import { CheckCircleIcon, DotsHorizontalIcon } from "@heroicons/react/solid"
import {useState} from "react"

function ChatBubbleSender({message, time, read}) {
    const [optionsMenu, setOptions] = useState(false)

    return (
        <div className="flex float-right space-x-1">
            <div className={`${optionsMenu ? "transition duration-100 scale-100":"transition duration-100 scale-0"} flex flex-col shadow-sm text-gray-500 text-sm p-4 absolute -ml-28 h-18 rounded-2xl w-28 bg-gray-100`}>
                <ul className="space-y-2">
                    <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Delete</li>
                    <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Reply</li>
                    <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Info</li>
                </ul>
            </div>
            <div className="flex items-center w-12 mt-2 justify-center h-12  bg-gray-100 rounded-full cursor-pointer group-hover:flex">
                <DotsHorizontalIcon className="h-6 w-6 text-gray-500" onClick={() => {
                    if(optionsMenu == false){
                        setOptions(true);
                    }else{
                        setOptions(false);
                    }
                }}/>
            </div>
            <div className="bg-gray-100 w-auto text-gray-700 p-2 rounded-2xl rounded-br-none float-right space-y-3">
                <div className="flex flex-row">
                    <p className="text-sm">{message}</p>
                </div>
                <div className="flex flex-row space-x-3 items-center justify-end">
                    <p className="text-xs">{time}</p>
                    {
                        read ? <CheckCircleIcon className="h-4 w-4 text-[#198A00]"/> : <CheckIcon className="h-4 w-4"/>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default ChatBubbleSender
