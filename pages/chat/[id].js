import matrixcs, * as sdk from 'matrix-js-sdk'
import { EmojiHappyIcon, FilmIcon, InformationCircleIcon, MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon, VideoCameraIcon, XIcon, PhotographIcon, CameraIcon, DocumentIcon, LockClosedIcon} from '@heroicons/react/outline'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import {BulletList} from 'react-content-loader'



import { 
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider} from 'react-query'
import { MatrixHttpApi } from 'matrix-js-sdk'

function Chat(props) {
    const router = useRouter()
    const room_id = router.query.id
    const [openPanel, setOpenPanel] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const queryClient = new QueryClient()
    const [input, setInput] = useState('')
    const scrollToBottom = useRef(null)
    const [isTyping, setIsTyping] = useState(false)
    const [attatchFiles, setAttachFiles] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false)
    const [addEmoji, setAddEmoji] = useState(false)
    const [showRecorder, setShowRecorder] = useState(false)
    const [recordState, setRecordState] = useState(null)
    const [onStop, setOnStop] = useState(false)
    const [sentMarker, setSentMarker] = useState(true)
    const [message, setMessages] = useState([])
    const [mypresence, setmypresence] = useState()
    const [active, setActive] = useState(false)
    const [timeAgo, setTimeAgo] = useState()
    const [getRooms, setGetRooms] = useState([])
    const [invites, setInvites] = useState([])
    const [memberName, setMemberName] = useState()
    const [memberAvatar, setMemberAvatar] = useState()
    const [chatNum, setChatNum] = useState('')
    const [uploadModal, setUploadModal] = useState(false)
    const [mo, setMo] = useState(false)
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState('/i (3).svg');
    const [filename, setFilename] = useState('')
    const [uploading, setUploading] = useState(false)
    const avatar_url = props.avatarUrl

    const client = sdk.createClient({
        baseUrl: "https://chat.zcfchat.com",
        accessToken: props.accessToken,
        userId: props.user_id,
    });

    // const api = new MatrixHttpApi

    useEffect(() => {
        async function f (){
            await client.startClient({lazyLoadMembers: true, pollTimeout:10000})
        }
        f()
    }, []);
    useEffect(() =>{
        async function t () {
            client.once('sync', async function(state, prevState, res) {
                if(state === 'PREPARED') {
                    let allRooms = await client.getRooms()
                    console.log(allRooms.length)
                    setChatNum(allRooms.length)
                    const ms = await client.roomInitialSync(room_id, 10000000000000)
                        
                    const presence = ms.presence
                    if(presence[0].content.user_id !== props.user_id){
                        setmypresence(presence[0]?.content.presence)
                        setTimeAgo( presence[0]?.content.last_active_ago)
                        setActive(presence[0]?.content.currently_active)
                    }else{
                        setmypresence(presence[1]?.content.presence)
                        setTimeAgo( presence[1]?.content.last_active_ago)
                        setActive(presence[1]?.content.currently_active)
                    }
                }else{
    
                }
            })
        }
        t()
                
        const invites = Object.entries(props.invites)
        console.log(invites)
        setInvites(invites)
    },[])
    

    // useEffect( () => {
    //     window.addEventListener("load",()=>{
    //         scrollToBottom.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start"
    //         })
    //     })
    // }, [])

    // const sendMessage = async (e) => {
    //     e.preventDefault()
    //     if(input===''){
    //         toast.warning('Oops ... you cannot send an empty message')
    //     }
    //     else{
    //         const data = await axios.put(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${room_id}/send/m.room.message/${Math.random() * (1 - 20000000000000000000000000) + 1}`,{
    //             "msgtype":"m.text",
    //             "body": input
    //         }, {
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 "accept": '*/*',
    //                 "Authorization": `Bearer ${props.accessToken}`
    //             }
    //         })
    //         setInput('')
    //         scrollToBottom.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start"
    //         })
    //     }
    // }
    const sendMessage = async (e) => {
        e.preventDefault()
        // console.log(input)
        if(input===''|| input == null){
            toast.warning('Oops ... you cannot send an empty message')
        }
        else{
            
            client.sendMessage(room_id, {
                msgtype: "m.text",
                body: input,
            })
            setInput('')
            scrollToBottom.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }

    const leaveRoom = async () =>{
        setOpenMenu(false);
        await fetch(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${room_id}/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Authorization': `Bearer ${props.accessToken}`
            }
        }).then(res=>{
            console.log(res)
            if(res.status == 200){
                router.back()
                toast.success("You have left this chat")
            }
        })
    }

    // Send Image handler 
    const sendImage = () => {
        setUploadModal(true);
        setAttachFiles(false);
    }

    const uploadToClient = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
          
        }
      };

      const uploadToServer = async (event) => {
        event.preventDefault();
          console.log(image)
          setUploading(true);
        
        // console.log(body)
        // body.append("file", image);
        // console.log(body)
        const st = await client.uploadContent(image)
        setUploadModal(false)
        setUploadModal(false);
        setCreateObjectURL('')
        console.log(st)
        if(st){
            await axios.put(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${room_id}/send/m.room.message/${Math.random() * (1 - 20000000000000000000000000) + 1}`,{
            "msgtype":"m.image",
            "body": filename,
            "filename": image.name,
            "url": st,
            "info": {
                        "mimetype": image.type,
                        "size": image.size,
                        "w": 720,
                        "h": 960,
                        "xyz.amorgan.blurhash": "KFH_x#IV.m?Gf6RP~oMyvf"
                    }
            
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
        
        // const response = await axios.post(`https://chat.zcfchat.com/_matrix/media/r0/upload?filename=${filename}`, {body}, {
        //     headers: {
        //         'Content-Type': 'image/jpeg',
        //         accept: '*/*',
        //         Authorization: `Bearer ${props.accessToken}`
        //     },
        // }).then(async (response) => {
        //     console.log(response);
        
            

        // })
        
        // alert("Upload")
      };
    // const url = `http://chat.zcfchat.com/_matrix/client/r0/rooms/${room_id}/typing/${props.user_id}`
    
    return (
        <div className="h-screen">
            <Head>
                <title>ZCF | Chat</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/logo.jpeg" />
            </Head>
            <main className="flex h-screen w-full">
                <ToastContainer 
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                {/* Container wrapper */}
                <div className="flex w-full">
                    {/* Left navigation Panel */}
                        <Navbar data={props} chatNum={chatNum}/>
                    {/* Mid items panel */}
                        <Midpanel memberId={props.memberId} room={room_id} userId={props.user_id} token={props.accessToken} data={props} rooms={getRooms} invites={invites}/>
                    {/* Chat section */}
                    {/* <ChatSection /> */}
                    {/* Chat first use and no active chat section */}
                        {/* <ChatSection  data={props}/> */}
                        <div className="flex w-full h-screen text-white bg-gray-100 rounded-2xl">
                        <div className="flex flex-col w-full justify-between transition duration-150 ease-in-out">
                            {/* Chat Header */}
                            <div className="flex p-3 bg-[#198A00] h-20 rounded-br-2xl rounded-bl-2xl">
                                <div className="p-1">
                                {
                                    avatar_url === null ? <Image height={64} width={64} alt="image" src="/u.svg" className="bg-white rounded-full mb-4"/> : <>
                                        {props.user_id != props.memberId ? 
                                        <>
                                            <Image src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${props.memberAvatar.avatar_url.slice(6,)}?height=64&width=64`}  alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={60} width={60}/>
                                            {active? <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>:<div className="p-1 h-1 w-1 bg-gray-400 float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>}
                                        </> : 
                                        
                                        <>
                                            <Image src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${props?.avatar_url.slice(6,)}?height=64&width=64`}  alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={60} width={60}/>
                                            <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>
                                        </>}
                                    </>                                   
                                }
                                
                                    
                                </div>
                                <div className="flex flex-col ml-2 p-2 h-full w-52">
                                    {
                                        props.memberId === props.user_id ? <p>Empty Room</p> : <p className="font-bold text-sm">{!props.profile_name? "Empty Room": props.profile_name}</p>
                                    }
                                    {
                                        !mypresence ? '': <>
                                            <p className="text-xs text-gray-200">{
                                                mypresence !="online"? 'Last seen a while ago' : mypresence
                                            }</p>
                                        </>
                                    }
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
                                <div className={`${openMenu ? "transition duration-100 scale-100":"transition duration-100 scale-0"} flex flex-col shadow-lg text-gray-500 text-sm p-2 -ml-48 right-10 h-36 relative top-12 rounded-2xl w-72 bg-gray-100`}>
                                    <ul className="space-y-2">
                                        <li className="transition duration-150 transform hover:bg-gray-200 p-2 rounded-xl cursor-pointer" onClick={leaveRoom}>Leave Chat</li>
                                        <li className="transition duration-150 transform hover:bg-gray-200 p-2 rounded-xl cursor-pointer">Report {props.user_id===props.memberId? '': <> {!props.profile_name? '': props.profile_name}</>}</li>
                                        <li className="transition duration-150 transform hover:bg-gray-200 p-2 rounded-xl cursor-pointer">Info</li>
                                    </ul>
                                </div>
                                
                            </div>
                            {/* Chat area */}
                            <div className="p-1 pr-0 h-full overflow-auto">
                                <div className=" rounded-2xl h-full  bg-white w-full p-2 pl-2 overflow overflow-x-hidden pb-12 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-4">
                                    <QueryClientProvider client={queryClient}>
                                        <Messages id={room_id} token={props.accessToken} user={props.user_id} read={true}/>
                                        <div className={`${isTyping? "block": "hidden"} text-black`}>
                                        <div className="chat-bubble">
                                            <p className="text-xs">Someone is typing</p>
                                            <div className="typing">
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                            <div className="dot"></div>
                                        </div>
                                        </div>
                                    </div>
                                    </QueryClientProvider>
                                    {/* {
                                        message.map((message, index)=>{
                                            // console.log(message)
                
                                            if(message.type === "m.room.message"){
                                                return <ChatBubbleSender key={data.event_id} user = {props.user_id} sender={message.sender} key={Math.random() * (1 - 2000000000) + 1} message={message.content.body} time={moment(message.origin_server_ts).format('LT')} msgtype={message.content.msgtype} content={message.content}/>
                                            }
                                            if(!message.type === "m.room.message"){
                                                return <p className="text-gray-500">Loading messages</p>
                                            }
                                        })
                                    } */}
                                    
                                    <div ref={scrollToBottom}></div>
                                </div>
                                
                            </div>
                            
                            {/* <div className={`${!props.user_id ? 'block':'hidden'}`}> */}
                            
                            
                            <div className="flex sticky p-1 pl-0 h-24 space-x-4 bottom-2 ml-1 mr-1">
                                
                                <div className="flex bg-white rounded-2xl mt-1 h-full w-full space-x-1 items-center p-3 text-sm">
                                <div className={`${!attatchFiles ? "scale-0":"scale-100"} transition duration-100 h-26 w-52 p-2 space-y-1 bg-white shadow-lg absolute bottom-20 rounded-2xl right-0`}>
                                    <div className="flex flex-row space-x-2 text-gray-500 cursor-pointer p-2 rounded-2xl transition duration-150 hover:bg-gray-100" onClick={sendImage}>
                                        <PhotographIcon className="h-5 w-5"/>
                                        <p className="">Send Image</p>
                                    </div>
                                    <div className="flex flex-row space-x-2 text-gray-500 cursor-pointer p-2 rounded-2xl transition duration-150 hover:bg-gray-100">
                                        <CameraIcon className="h-5 w-5"/>
                                        <p className="">Capture</p>
                                    </div>
                                    <div className="flex flex-row space-x-2 text-gray-500 cursor-pointer p-2 rounded-2xl transition duration-150 hover:bg-gray-100">
                                        <DocumentIcon className="h-5 w-5"/>
                                        <p className="">Send Document</p>
                                    </div>
                                    
                                </div>
                                <div className={`${!showEmojis ? "scale-0":"scale-100"} transition duration-100  p-2 space-y-1 bg-white shadow-lg absolute bottom-20 rounded-2xl right-0`}>
                                    <Picker set='apple' onSelect={(emoji)=>{
                                        setInput(input + emoji.native)
                                    }}/>
                                </div>
                                <div className={`${!showRecorder ? "scale-0":"scale-100"} transition duration-100  p-2 space-y-1 bg-white shadow-lg absolute bottom-20 rounded-2xl right-0`}>
                                    
                                </div>
                                    
                                <div className="flex w-full space-x-2">
                                
                                <div className="flex items-center w-full h-12 pl-2 pr-2 rounded-3xl border-2 text-gray-600 transition transform duration-150 border-gray-200 justify-between">
                                    <form onSubmit={sendMessage} className="w-full">
                                        <input onChange={(e)=>{ 
                                            setInput(e.target.value);
                                        }} value={input} className="bg-transparent w-full p-3 active:outline-none focus:outline-none" type="text" placeholder="Aa"/>
                                        </form>
                                        <button onClick={
                                            (e)=>{
                                                e.preventDefault()
                                                if(attatchFiles == false){
                                                    setAttachFiles(true);
                                                }else{
                                                    setAttachFiles(false);
                                                }
                                            }
                                        }>
                                            <PaperClipIcon className="h-8 p-1 text-gray-500 cursor-pointer hover:text-[#198A00] hover:bg-gray-100 rounded-full"/>
                                        </button>
                                        <button onClick={
                                            (e)=>{
                                                e.preventDefault()
                                                if(showEmojis == false){
                                                    setShowEmojis(true);
                                                }else{
                                                    setShowEmojis(false);
                                                }
                                            }
                                        }>
                                        <EmojiHappyIcon className="h-8 p-1 text-gray-500 cursor-pointer hover:text-[#198A00] hover:bg-gray-100 rounded-full"/> 
                                        </button>
                                        <button onClick={
                                            (e)=>{
                                                e.preventDefault()
                                                if(showRecorder == false){
                                                    setShowRecorder(true);
                                                }else{
                                                    setShowRecorder(false);
                                                }
                                            }
                                        }>
                                        <MicrophoneIcon className={`${input==''? 'block':'hidden'} h-8 p-1 text-gray-500 hover:text-[#198A00] hover:bg-gray-100 rounded-full cursor-pointer`}/>
                                        </button>
                                    </div>
                                    
                                    <button onClick={sendMessage} className="">
                                        <PaperAirplaneIcon className={`${input == ''? 'transition transform duration-150 scale-0 hidden': 'transition transform duration-150 scale-100 block'} h-8 p-1 text-gray-500 hover:text-[#198A00] hover:bg-gray-100 rounded-full mt- rotate-90 ml-2 cursor-pointer`}/>
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${openPanel ? "hidden":"block"} flex-grow w-1/3 p-2 bg-white m-1 rounded-2xl`}>
                            {/* <div className="flex flex-col items-start h-12 pt-3">
                                <XIcon className="h-8 w-8 text-[#198A00] bg-gray-100 rounded-full p-2 cursor-pointer"/>
                            </div> */}
                            <div className="flex flex-col items-center">
                               <div>
                                                              
                                        {
                                    avatar_url === null ? <Image height={64} width={64} alt="image" src="/u.svg" className="h-20 w-20 mb-4"/> : <>
                                    
                                        {props.user_id != props.memberId ? 
                                        <>
                                            <Image src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${props.memberAvatar.avatar_url.slice(6,)}?height=64&width=64`}  alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={60} width={60}/>
                                            {active? <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>:<div className="p-1 h-1 w-1 bg-gray-400 float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>}
                                        </> : 
                                        
                                        <>
                                            <Image src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${props?.avatar_url.slice(6,)}?height=64&width=64`}  alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={60} width={60}/>
                                            <div className="p-1 h-1 w-1 bg-[#44c526] float-right mt-8 -ml-16 bor rounded-full z-10 relative border-2 border-white"></div>
                                        </>}
                                    </>                                   
                                }
                                
                               
                               </div>
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
            {
                uploadModal ? (
                    <>
                    <div
                      className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150 text-gray-500"
                    >
                      <div className="relative my-6 mx-auto w-5/12">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-auto overflow-auto text-sm">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-xl font-semibold text-[#198A00]">
                              Upload Image
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setUploadModal(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <LockClosedIcon className="text-[#198A00] h-8" />
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <form encType="multipart/form-data">
                            <div className="py-2 h-auto px-2">
                                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                                    <div className="md:flex">
                                        <div className="w-full">
                                            
                                            <div className="">
                                            <Image src="/i (3).svg" height={200} width={200} alt="image" className="mx-auto rounded-2xl bg-gray-200 p-2"/>
                                                <div className="mb-2"> <span className="text-sm">Caption</span> <input value={filename} onChange={(e)=>setFilename(e.target.value)} type="text" className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"/> </div>
                                                <div className="mb-2"> <span>Image</span>
                                                    <div className={`relative h-40 rounded-lg border-dashed border-2 hover:animate-pulse active:border-[#198A00] border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer`}>
                                                        <div className="absolute">
                                                            <div className="flex flex-col items-center ">  <span className="block text-gray-400 font-normal">Drag your image here</span> <span className="block text-gray-400 font-normal">or</span> <span className="block text-[#198A00] font-normal">Browse files</span> </div>
                                                        </div> <input type="file" className="h-full w-full opacity-0" name="myImage" onChange={uploadToClient}/>
                                                    </div>
                                                    <div className="flex justify-between items-center text-gray-400"> <span>Accepted file type:.jpg, jpeg and png only</span> <span className="flex items-center "> secure</span> </div>
                                                </div>
                                                <div className="mt-3 text-center pb-3"> <button className="text-sm h-12 w-32 bg-[#198A00] rounded-2xl text-white hover:shadow-lg" onClick={uploadToServer}>{uploading? <Image src="/s.svg" height={40} width={40} alt="spinner"/>: 'Upload'}</button> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                           </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="bg-[#198A00] font-bold uppercase px-6 py-3 rounded-2xl text-white text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setUploadModal(false)}
                            >
                              Close
                            </button>
                            {/* <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
                            >
                              Save Changes
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null
            }
        </div>
    )
}

export default Chat

function Messages(props) {
    const {token, id, user, read} = props
    // console.log(props)
    // const router = useRouter()

    
    const {status, data, error, isFetching} = useQuery(
        'messages',
        async () => {
            const res = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${id}/messages?from=t7-1004_0_0_0_0_0_0_0_0&limit=10000000000000000000000000000`, {
                headers:{
                    "Content-Type": "application/json",
                    "accept": '*/*',
                    "Authorization": `Bearer ${token}`
            }
        })
       
        return res.data.chunk
        },
        {
            // Refetch the data every second
            refetchInterval: 500,
        })

        if (status === 'loading') return <div className="text-gray-500">
            <BulletList />
            <BulletList />
            </div>
        if (status === 'error') return <span className="text-gray-500">Error: {error.message}</span>
        // console.log(data)
        return(
                <div>
                    {
                         data?.map((message, index)=>{
                            // console.log(message)
                            let read = true
                            if(message.type === "m.room.message"){
                                // return <p>Hello</p>
                                return <ChatBubbleSender data={message} user = {user} key={Math.random() * (1 - 2000000000) + 1} read={read}/>
                            }
                            else if(message.type != "m.room.message"){
                                return <div className="text-gray-500 flex items-center">
                                    <p className="mx-auto"></p>
                                </div>
                            }
                        })
                    }
                    
                </div>
                
 
        )

 }





export async function getServerSideProps(context) {
    // const accessToken = localStorage.getItem('access_token')
    // get user information
    const cookies = new Cookies(context.req, context.res)
    const accessToken = cookies.get('access_token')
    // console.log(accessToken)
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
    
    const syncData = await axios.get('https://chat.zcfchat.com/_matrix/client/r0/sync',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    // console.log(syncData.data.rooms.invite)
   
    const res = await axios.get('https://chat.zcfchat.com/_matrix/client/r0/account/whoami',{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    const user_id = res.data.user_id

    
    // console.log(user_id)
    

    // User Profile Information - Display Name
    const res1 = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/profile/${user_id}`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })  

    // User Profile Information - Avatar Url
    const res2 = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/profile/${user_id}/avatar_url`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })
    // console.log(res2)
    let joinedroomId = context.query.id

    
    // Chat information - 
    // await axios.post(`https://chat.zcfchat.com/_matrix/client/r0/join/${joinedroomId}?server_name=chat.zcfchat.com`,{
    //     headers: {
    //              accept: '*/*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //     }
    // })

    await fetch(`https://chat.zcfchat.com/_matrix/client/r0/join/${joinedroomId}?server_name=chat.zcfchat.com`,{
        method: 'POST',
        headers: {
            accept: '*/*',
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
        }
    })
    // User ID
    const members = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${joinedroomId}/joined_members`,{
        headers: {
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    }).catch(err =>{
        console.log(err)
        console.log("here error")
    })
    // /_matrix/client/r0/join/!jqZRbAbqMaKIZcrptL:chat.zcfchat.com?server_name=chat.zcfchat.com
    // console.log(members.status)
    const users = members.data.joined
    const keys = Object.keys(users)
    let memberId = keys[0]
    // console.log(memberId)

    if(memberId != user_id){
        memberId = keys[0] || user_id
    }else if(memberId === user_id){
        memberId = keys[1] || user_id
    }
    
    // console.log(memberId)

    
    // Profile details
    const profileData = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/profile/${memberId}`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })

    // Get user profile image
    const profileImage = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/profile/${memberId}/avatar_url`,{
        headers: {
                'Content-Type': 'application/json',
                 accept: '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
        }
    })

   
    // const userId = getRoom.myUserId
    // let mem = Object.entries(getRoom.currentState.members)
    
    // mem.map(data => {
    //     console.log(data)
    //     if(data[0] === userId) {
    //         console.log(data[1])
    //     }
    //     else if(data[0] != userId){
    //         console.log(data[0])
    //     }
    // })
    // console.log(user_id)
    
    const memberAvatar = profileImage.data
    // console.log(memberAvatar)

    const profile_name = profileData.data.displayname
    const displayname = res1.data.displayname
    let avatarUrl = res2.data.avatar_url
    if(!avatarUrl){
        avatarUrl = null
    }
    const accountData = syncData.data.account_data
    const deviceList = syncData.data.device_lists
    const presenceList = syncData.data.presence
    const rooms = syncData.data.rooms
    const groups = syncData.data.groups
    const invites =syncData.data.rooms.invite

    return {
        props: {
            user_id,
            displayname,
            accessToken,
            avatarUrl,
            users,
            memberId,
            profile_name,
            memberAvatar,
            accountData,
            deviceList,
            presenceList,
            rooms,
            groups,
            invites,
        }
    }
  }
}

