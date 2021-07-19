import { EmojiHappyIcon, FilmIcon, InformationCircleIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, VideoCameraIcon, XIcon } from '@heroicons/react/outline'
import { DocumentTextIcon, DotsVerticalIcon, MusicNoteIcon, PhoneIcon } from '@heroicons/react/solid'
import Image from 'next/image';
// import Picker from 'emoji-picker-react';
import {useState} from 'react'
import ChatBubbleSender from './ChatBubbleSender';
import ChatGroups from './ChatGroups';

function ChatSection() {
    const [openPanel, setOpenPanel] = useState(false)
    // const [chosenEmoji, setChosenEmoji] = useState(null)
    // const onEmojiClick = (e, emojiObject) => {
    //     setChosenEmoji(emojiObject);
    // }
    return (
        <div className="flex w-full h-screen text-white bg-gray-100 rounded-2xl">
            <div className="flex flex-col w-full justify-between transition duration-150 ease-in-out">
                {/* Chat Header */}
                <div className="flex p-3 bg-[#198A00] h-20 rounded-br-2xl rounded-bl-2xl">
                    <div className="p-1">
                        <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={52} width={52} />
                        <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col ml-2 p-2 h-full">
                        <p className="font-bold text-sm">Matt</p>
                        <p className="text-xs text-gray-200">Online</p>
                    </div>
                    <div className="flex ml-2 p-3 h-full justify-end w-full space-x-8 items-center">
                        <VideoCameraIcon className="h-6"/>
                        <PhoneIcon className="h-6"/>
                        <DotsVerticalIcon className="h-6"/>
                        <InformationCircleIcon className="h-6" title="" onClick={()=>{
                            if(openPanel == false) {
                                setOpenPanel(true);
                            }
                            else {
                                setOpenPanel(false);
                            }
                        }}/>
                    </div>
                    
                </div>
                {/* Chat area */}
                <div className="p-1 h-full">
                    <div className=" rounded-2xl h-full  bg-white w-full p-2">
                        <ChatBubbleSender message="Hey hello world, from blue origin." time="09:30" read={false}/>
                    </div>
                </div>
                <div className="flex sticky p-1 h-24 space-x-4 bottom-2">
                    <div className="flex bg-white rounded-2xl mt-1 h-full w-full space-x-4 items-center p-3">
                        <PaperClipIcon className="h-6 text-[#198A00] cursor-pointer"/>
                        <EmojiHappyIcon className="h-6 text-[#198A00] cursor-pointer"/>
                         
                        <div className="flex w-full space-x-2">
                            <input className="bg-white p-3 w-full h-12 rounded-3xl items-center active:outline-none focus:outline-none border-2 focus:border-[#198A00] text-gray-600" type="text" placeholder="Aa"/>
                            <MicrophoneIcon className="h-6 text-[#198A00] m-2 cursor-pointer"/>
                            <PaperAirplaneIcon className="h-6 text-[#198A00] rotate-90 m-2 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${openPanel ? "hidden":"block"} flex-grow w-1/3 p-2 bg-white m-1 rounded-2xl`}>
                {/* <div className="flex flex-col items-start h-12 pt-3">
                    <XIcon className="h-8 w-8 text-[#198A00] bg-gray-100 rounded-full p-2 cursor-pointer"/>
                </div> */}
                <div className="flex flex-col items-center h-24">
                    <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={80} width={80} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-gray-500 text-sm">Matt Thomson</p>
                    <p className="text-sm text-gray-400">matt@somemail.com</p>
                </div>
                <div className="flex flex-row justify-center items-center w-full border-b border-gray-300 pb-6">
                    <button className="bg-[#198A00] m-2 p-2 rounded-full"><VideoCameraIcon className="h-7"/></button>
                    <button className="bg-[#198A00] m-2 p-2 rounded-full"><PhoneIcon className="h-7"/></button>
                </div>
                <div className="flex flex-col items-center mt-10 border-b border-gray-300 pb-6">
                    <p className="text-gray-500 font-bold text-sm">Shared Attachments</p>
                    <div className="flex flex-row mt-5">
                        <button className="flex text-sm flex-col items-center space-y-2 pt-5 text-[#198A00] bg-gray-100 m-2 p-2 rounded-3xl h-20 w-1/3"><DocumentTextIcon className="h-7"/> <span>Docs</span></button>
                        <button className="flex text-sm flex-col items-center space-y-2 pt-5 text-[#198A00] bg-gray-100 m-2 p-2 rounded-3xl h-20 w-24"><FilmIcon className="h-7"/><span>Videos</span></button>
                        <button className="flex text-sm flex-col items-center space-y-2 pt-5 text-[#198A00] bg-gray-100 m-2 p-2 rounded-3xl h-20 w-24"><MusicNoteIcon className="h-7"/><span>Audio</span></button>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <p className="text-gray-500 font-bold text-sm">Groups</p>
                    <ChatGroups name="ZCF Committee"/>
                    <ChatGroups name="Pareza Tech"/>
                    <ChatGroups name="Gamers Association"/>
                </div>

            </div>
        </div>
    )
}

export default ChatSection
