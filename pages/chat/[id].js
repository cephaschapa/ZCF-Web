import { EmojiHappyIcon, FilmIcon, InformationCircleIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, VideoCameraIcon, XIcon } from '@heroicons/react/outline'
import { DocumentTextIcon, DotsVerticalIcon, MusicNoteIcon, PhoneIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Midpanel from '../../components/Midpanel/Midpanel'
import ChatSection from '../../components/Chat/ChatSection'
import ChatGroups from '../../components/Chat/ChatGroups'
import ChatBubbleSender from '../../components/Chat/ChatBubbleSender'
import axios from 'axios'
import Cookies from 'cookies'
import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TypingAnimation } from 'react-native-typing-animation';

function Chat(props) {
    const router = useRouter()
    const {u, id} = router.query
    
    const [openPanel, setOpenPanel] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const room_id = router.query.id
    // console.log(props)
    

    const [input, setInput] = useState('')
    const scrollToBottom = useRef(null)

    const sendMessage = async (e) => {
        e.preventDefault()
        console.log(input)
        if(input===''){
            toast.warning('Oops ... you cannot send an empty message')
        }
        else{
            const data = await axios.put(`https://chat.dazmessenger.com/_matrix/client/r0/rooms/${room_id}/send/m.room.message/${Math.random() * (1 - 20000000000000000000000000) + 1}`,{
                "msgtype":"m.text",
                "body": input
            }, {
                headers:{
                    "Content-Type": "application/json",
                    "accept": '*/*',
                    "Authorization": `Bearer ${props.accessToken}`
                }
            })
            setInput('')
            scrollToBottom.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    

    const updateTypingState = (e) => {
        console.log("cephas")
    }


    // const room_id = context.query.id
    
    // useEffect(async () => {
    //     const data = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/rooms/${room_id}/messages?from=t7-1004_0_0_0_0_0_0_0_0`, {
    //        headers:{
    //            "Content-Type": "application/json",
    //            "accept": '*/*',
    //            "Authorization": `Bearer ${props.accessToken}`
    //        }
    //     })

    // get user typing state

    useEffect(async () => {
        const data = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/rooms/${room_id}/messages?from=t7-1004_0_0_0_0_0_0_0_0&limit=10000000000000000000000000000`, {
           headers:{
               "Content-Type": "application/json",
               "accept": '*/*',
               "Authorization": `Bearer ${props.accessToken}`
           }
        })


    console.log(data.data.chunk)
    // const messages = data.data.chunk
    
        setMessages(messages)
    }, [messages])
    
    return (
        <div className="h-screen">
            <Head>
                <title>ZCF | Chat</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/logo.jpeg" />
            </Head>
            <main className="flex h-screen w-full">
                {/* Container wrapper */}
                <div className="flex w-full">
                    {/* Left navigation Panel */}
                        <Navbar data={props}/>
                    {/* Mid items panel */}
                        <Midpanel  data={props}/>
                    {/* Chat section */}
                    {/* <ChatSection /> */}
                    {/* Chat first use and no active chat section */}
                        {/* <ChatSection  data={props}/> */}
                        <div className="flex w-full h-screen text-white bg-gray-100 rounded-2xl">
                        <div className="flex flex-col w-full justify-between transition duration-150 ease-in-out">
                            {/* Chat Header */}
                            <div className="flex p-3 bg-[#198A00] h-20 rounded-br-2xl rounded-bl-2xl">
                                <div className="p-1">
                                    <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={52} width={52} />
                                    <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>
                                </div>
                                <div className="flex flex-col ml-2 p-2 h-full">
                                    <p className="font-bold text-sm">{props.profile_name}</p>
                                    <p className="text-xs text-gray-200">Online</p>
                                </div>
                                <div className="flex ml-2 p-3 h-full justify-end w-full space-x-8 items-center">
                                    <VideoCameraIcon className="h-6"/>
                                    <PhoneIcon className="h-6"/>
                                    <DotsVerticalIcon className="h-6 cursor-pointer" onClick={() => {
                                        if(openMenu == false){
                                            setOpenMenu(true);
                                        }else{
                                            setOpenMenu(false);
                                        }
                                    }}/>
                                    <InformationCircleIcon className="h-6" title="" onClick={()=>{
                                        if(openPanel == false) {
                                            setOpenPanel(true);
                                        }
                                        else {
                                            setOpenPanel(false);
                                        }
                                    }}/>
                                </div>
                                {/* Chat options */}
                                <div className={`${openMenu ? "transition duration-100 scale-100":"transition duration-100 scale-0"} flex flex-col shadow-lg text-gray-500 text-sm p-4 -ml-48 right-10 h-40 relative top-12 rounded-2xl w-60 bg-gray-100`}>
                                    <ul className="space-y-2">
                                        <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Delete Conversation</li>
                                        <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Reply</li>
                                        <li className="transition duration-150 transform hover:bg-gray-300 p-2 rounded-2xl cursor-pointer">Info</li>
                                    </ul>
                                </div>
                                
                            </div>
                            {/* Chat area */}
                            <div className="p-1 pr-0 h-full overflow-auto">
                                <div className=" rounded-2xl h-full  bg-white w-full p-2 pl-2 overflow-auto pb-12 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-4">
                                    {
                                        messages.map(message=>{
                                            // console.log(message)

                                            if(message.type === "m.room.message"){
                                                return <ChatBubbleSender user = {props.user_id} sender={message.sender} key={Math.random() * (1 - 2000000000) + 1} message={message.content.body} time={moment(message.origin_server_ts).format('LT')} read={false}/>
                                            }
                                            if(!message.type === "m.room.message"){
                                                return <p className="text-gray-500">Loading messages</p>
                                            }
                                        })
                                    }
                                    <div ref={scrollToBottom}></div>
                                    <div className={`${isTyping? "block": "hidden"} text-black`}>
                                        <div className="chat-bubble">
                                            <div className="typing">
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="flex sticky p-1 pl-0 h-24 space-x-4 bottom-2">
                                <div className="flex bg-white rounded-2xl mt-1 h-full w-full space-x-1 items-center p-3">
                                    <PaperClipIcon className="h-8 p-1 text-gray-500 cursor-pointer hover:text-[#198A00] hover:bg-gray-100 rounded-full"/>
                                    <EmojiHappyIcon className="h-8 p-1 text-gray-500 cursor-pointer hover:text-[#198A00] hover:bg-gray-100 rounded-full"/>
                                    <form className="w-full" onSubmit={
                                            sendMessage
                                        }>
                                        <div className="flex w-full space-x-2">
                                        <ToastContainer 
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            position="bottom-right"
                                        />
                                            <input onChange={(e)=>{ 
                                                setInput(e.target.value);
                                                if(e.target.value != ""){
                                                    setIsTyping(true);
                                                    updateTypingState()
                                                }else{
                                                    setIsTyping(false);
                                                    
                                                }
                                            }} value={input} className="bg-white p-3 w-full h-12 rounded-3xl items-center active:outline-none focus:outline-none border-2 text-gray-600 transition transform duration-150 border-gray-500" type="text" placeholder="Aa"/>
                                            <MicrophoneIcon className={`${input==''? 'block':'hidden'} h-8 p-1 text-gray-500 hover:text-[#198A00] hover:bg-gray-100 rounded-fullm-2 mt-2 cursor-pointer`}/>
                                            <button className="">
                                                <PaperAirplaneIcon className={`${input == ''? 'transition transform duration-150 scale-0': 'transition transform duration-150 scale-100'} h-8 p-1 text-gray-500 hover:text-[#198A00] hover:bg-gray-100 rounded-full mt- rotate-90 ml-2 cursor-pointer`}/>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={`${openPanel ? "hidden":"block"} flex-grow w-1/3 p-2 bg-white m-1 rounded-2xl`}>
                            {/* <div className="flex flex-col items-start h-12 pt-3">
                                <XIcon className="h-8 w-8 text-[#198A00] bg-gray-100 rounded-full p-2 cursor-pointer"/>
                            </div> */}
                            <div className="flex flex-col items-center h-24">
                               <div className="h-24 w-24 bg-gray-200 rounded-full"></div>{/* <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={80} width={80} /> */}
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-gray-500 text-sm">{props.profile_name}</p>
                                <p className="text-sm text-gray-400">{props.profileId}</p>
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
                </div>
            </main>
        </div>
    )
}

export default Chat


export async function getServerSideProps(context) {
    // const accessToken = localStorage.getItem('access_token')
    // get user information
    const cookies = new Cookies(context.req, context.res)
    const accessToken = cookies.get('access_token')
    console.log(accessToken)
    if(!accessToken){
        console.log("No token")
        return {
            redirect: {
                permanent: false,
                destination: "/"
              }
        }
    }else{

    // Sync room state - Cradle of chat
    
    const syncData = await axios.get('https://chat.dazmessenger.com/_matrix/client/r0/sync',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    // console.log(syncData)
    // get user id
    const res = await axios.get('https://chat.dazmessenger.com/_matrix/client/r0/account/whoami',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    const user_id = res.data.user_id

    // User Profile Information - Display Name
    const res1 = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/profile/${user_id}`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })  

    // User Profile Information - Avatar Url
    const res2 = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/profile/${user_id}/avatar_url`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    }) 
    // const profileId = context.query.u
    // // Chat information - 
    // const res3 = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/profile/${profileId}`,{
    //     headers: {
    //             'Content-Type': 'application/json',
    //              accept: '*/*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //     }
    // })

    // Get messages 
    // const room_id = context.query.id
    // const data = await axios.get(`https://chat.dazmessenger.com/_matrix/client/r0/rooms/${room_id}/messages?from=t7-1004_0_0_0_0_0_0_0_0`, {
    //        headers:{
    //            "Content-Type": "application/json",
    //            "accept": '*/*',
    //            "Authorization": `Bearer ${accessToken}`
    //        }
    //     })

    // console.log(data.data.chunk)
    // const messages = data.data.chunk

    // const profile_name = res3.data.displayname
    const displayname = res1.data.displayname
    const avatar_url = res2.data.avatar_url
    console.log("hello ==="+context.query.id)
    const accountData = syncData.data.account_data
    const deviceList = syncData.data.device_lists
    const presenceList = syncData.data.presence
    const rooms = syncData.data.rooms
    const groups = syncData.data.groups

    return {
        props: {
            user_id,
            displayname,
            accessToken,
            // profileId,
            // profile_name,
            accountData,
            deviceList,
            presenceList,
            rooms,
            groups,
            // messages
        }
    }
  }
}

