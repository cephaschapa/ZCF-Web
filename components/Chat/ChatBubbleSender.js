import { CheckIcon } from "@heroicons/react/outline"
import { CheckCircleIcon } from "@heroicons/react/solid"

function ChatBubbleSender({message, time, read}) {
    return (
        <div className="bg-gray-100 w-auto text-gray-700 p-2 rounded-2xl rounded-br-none float-right space-y-3">
            <div className="flex flex-row">
                <p>{message}</p>
            </div>
            <div className="flex flex-row space-x-3 items-center justify-end">
                <p className="text-xs">{time}</p>
                {
                    read ? <CheckCircleIcon className="h-4 w-4 text-[#198A00]"/> : <CheckIcon className="h-4 w-4"/>
                }
            </div>
        </div>
    )
}

export default ChatBubbleSender
