import { EmojiHappyIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon, PhoneIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import Picker from 'emoji-picker-react';
import {useState} from 'react'

function ChatSection() {
    const [chosenEmoji, setChosenEmoji] = useState(null)
    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
    }
    return (
        <div className="flex w-full h-screen text-white bg-gray-100 rounded-2xl">
            <div className=" w-full">
                {/* Chat Header */}
                <div className="flex p-3 bg-[#198A00] h-24 rounded-br-2xl rounded-bl-2xl">
                    <div className="pt-2">
                        <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={70} width={70} />
                        <div className="p-2 h-2 w-2 bg-[#44c526] float-right mt-10 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col ml-2 p-3 h-full">
                        <p className="font-bold">Matt</p>
                        <p>Online</p>
                    </div>
                    <div className="flex ml-2 p-3 h-full justify-end w-full space-x-8 items-center">
                        <VideoCameraIcon className="h-8"/>
                        <PhoneIcon className="h-8"/>
                        <DotsVerticalIcon className="h-8"/>
                    </div>
                    
                </div>
                {/* Chat area */}
                <div className="p-1 h-3/4">
                    <div className=" rounded-2xl mt-1 h-full">

                    </div>
                </div>
                <div className="flex p-1 h-28 space-x-4 mt-4">
                    <div className="flex bg-white rounded-2xl mt-1 h-full w-full space-x-4 items-center p-3">
                        <PaperClipIcon className="h-8 text-[#198A00] cursor-pointer"/>
                        <EmojiHappyIcon className="h-8 text-[#198A00] cursor-pointer"/>
                         
                        <div className="flex w-full space-x-2">
                            <input className="bg-white p-3 w-full h-12 rounded-3xl items-center border-2 active:outline-none focus:outline-none border-2 focus:border-[#198A00] text-gray-600" type="text" placeholder="Aa"/>
                            <MicrophoneIcon className="h-8 text-[#198A00] m-2 cursor-pointer"/>
                            <PaperAirplaneIcon className="h-8 text-[#198A00] rotate-90 m-2 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow w-2/4 bg-white m-1 rounded-2xl">

            </div>
        </div>
    )
}

export default ChatSection
