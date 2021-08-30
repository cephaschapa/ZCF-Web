import {ChatAlt2Icon, ClipboardCopyIcon, SearchIcon, UserAddIcon} from '@heroicons/react/outline'
import {PlusIcon} from '@heroicons/react/outline'
import {ChatAltIcon, LockClosedIcon } from '@heroicons/react/solid'
import {useState, useEffect} from 'react'
import PersonalChats from '../Chat/PersonalChats'
import ChatGroups from '../Chat/ChatGroups'
import Suggestions from '../Chat/Suggestions'
import axios from 'axios'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Cookies from 'cookie'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import matrixcs, * as sdk from "matrix-js-sdk"
import {BulletList} from 'react-content-loader'
import { 
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider} from 'react-query'

function Midpanel(props) {   
    console.log(props.data.accessToken)
    const {accessToken} = props.data
    const router = useRouter()
    const [openTab, setOpenTab] = useState(1);
    const [openTab2, setOpenTab2] = useState(1);
    const [openTab3, setOpenTab3] = useState(1);
    const [showModal1, setShowModal1] = useState(false);
    const [query, setQuery] = useState('');
    const queryClient = new QueryClient()
    const [results, setResults] = useState([])
    const [groups, setGroups] = useState([])
    const [contacts, setContacts] = useState()
    const [obj, setObj] = useState([])
    const [rooms, setRooms] = useState([])
    const [invite,setInvite] = useState('')

    const entries = props.data.rooms
    const object = entries.join
    console.log(props)
    useEffect(async() => {
      const client = sdk.createClient({
        baseUrl: "https://chat.zcfchat.com",
        accessToken: props.token,
        userId: props.userId,
      });
      await client.startClient()

     client.once('sync', async function(state, prevState, res) {
          if(state === 'PREPARED') {
            await client.roomInitialSync( props.room, 10000000000000)
            let allRooms = await client.getRooms()
            
            console.log(allRooms)
            setRooms(allRooms)
          } else {
              console.log(state);
          }
      });

      

      
    }, []);

    useEffect(() => {
      async function getGroups() {
        const g = await axios.get('https://chat.zcfchat.com/_matrix/client/r0/publicRooms',{
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
        // console.log(g.data.chunk)
        setGroups(g.data.chunk)
      }
      getGroups()
    }, [])

    

    function queryInput(e){
      e.preventDefault()
      setQuery(e.target.value)      
      // search users
      axios.post('https://chat.zcfchat.com/_matrix/client/r0/user_directory/search',{
          "limit": 10,
          "search_term": query
      },{
          headers: {
                  'Content-Type': 'application/json',
                  accept: '*/*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
          }
      }).then((res)=>{
        const result = res.data.results
        // console.log(result)
        setResults(result)
      })
    }

    // console.log(contacts)
    return (
        <div className="flex flex-col w-4/12 bg-gray-100 h-screen pr-2 pt-0 p-0 text-white mr-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
            {/* Header */}
            <div className="bg-[#198A00] p-4 h-20 rounded-br-2xl rounded-bl-2xl top-0 sticky z-10">
                <div className="bg-white p-3 px-6 rounded-2xl">
                    <form className="flex items-center">
                        <input className="flex-grow focus:outline-none text-gray-700 bg-transparent text-sm" type="search" placeholder="Search Active Chat"/>
                        <SearchIcon className="text-gray-400 h-6"/>
                    </form>
                </div>
                
            </div>
            <div className="flex justify-between mt-4 w-full sticky top-20 bg-gray-100 p-1 z-10">
                <button
                    className="flex justify-center rounded-3xl p-3 bg-[#198A00] text-sm w-1/2 m-1 transition transform duration-200 hover:bg-[#2b9b12]" 
                    data-toggle="tab" href="#link1" role="tablist"
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            // alert('Hello')
                            setOpenTab(1)
                        }
                    }><ChatAltIcon className="h-6 mr-1"/> Personal</button>
                <button
                    className="flex justify-center rounded-3xl p-3 bg-[#198A00] text-sm w-1/2 m-1 transition transform duration-200 hover:bg-[#2b9b12]" 
                    data-toggle="tab" href="#link2" role="tablist"
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            // alert('Hello')
                            setOpenTab(2)
                        }
                    }><ChatAlt2Icon className="h-6 mr-1"/> Groups</button>
                <button
                    className="flex justify-center items-center rounded-3xl p-3 bg-[#198A00] text-sm w-1/2 m-1 transition transform duration-200 hover:bg-[#2b9b12]" 
                    data-toggle="tab" href="#link2" role="tablist"
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            // alert('Hello')
                            setOpenTab(3)
                        }
                    }><UserAddIcon className="h-6 mr-1"/> Invites</button>
            </div>
            {/* Chat items */}
            <div className="p-1 tab-content tab-space">
                {/* Personal 1 content */}
                <div className={`${openTab === 1 ? "block transition ease-in duration-150":"hidden transition duration-150 transform ease-out" }`} id="link1">
                    <p className="text-gray-500 font-bold ">Chats</p>
                    {
                     !rooms ? '':  rooms.map( d =>{
                        // console.log(d)
                        let n = Object.keys(d.currentState.userIdsToDisplayNames)

                        return n.map(x =>{
                          if(x != props.userId){
                            // console.log(x)
                            // console.log(d.currentState.members[x])
                            let val = d.currentState.members[x]
                            return (
                              <PersonalChats key={val.userId} id={val.userId} contact={val.name} room_id={val.roomId} data = {d} notifictions={d.notificationCounts.total}/>
                            ) 
                          }
                        })
                        
                     })
                    } 

                  {/* <QueryClientProvider client={queryClient}>
                    <Messages id={props.room} token={props.token} user={props.userId} read={true}/>
                </QueryClientProvider> */}
                </div>  
                {/* Group List Content */}
                <div className={`${openTab === 2 ? "block transition ease-in duration-150":"hidden transition duration-150 transform ease-out"}`} id="link2">
                    <p className="text-gray-500 font-bold">Active Groups</p>
                    {
                      groups.map(group => <Suggestions key={group.room_id} name={group.name} memcount={group.num_joined_members} topic={group.topic}/>)
                    }
                </div>
                {/* Invites */}
                <div className={`${openTab === 3 ? "block transition ease-in duration-150":"hidden transition duration-150 transform ease-out"}`} id="link2">
                    <p className="text-gray-500 font-bold">Room And Group Invites</p>
                    
                </div>
            </div>
            {/* Floating Add Button */}
            <div className="h-12 w-full bottom-8 sticky pr-7">
                <button onClick={(e)=>{
                    e.preventDefault()
                    setShowModal1(true)
                }} className="p-3 h-14 w-14 float-right bg-[#198A00] text-white shadow-lg rounded-full cursor-pointer transition duration-150 transform hover:scale-105" title="New Chat">
                    <PlusIcon />
                </button>
            </div>
            {/* // Add or group Chat modal */}
            {
                showModal1 ? (
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
                              Search for people or groups
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal1(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                <LockClosedIcon className="text-[#198A00] h-8" />
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <div className="flex space-x-4 mb-6">
                                <button 
                                    onClick={
                                        (e)=>{
                                            e.preventDefault()
                                            setOpenTab2(1)
                                        }
                                    }
                                className="bg-[#198A00] p-2 text-white rounded-2xl w-32 ">People</button>
                                <button
                                    onClick={
                                        (e)=>{
                                            e.preventDefault()
                                            setOpenTab2(2)
                                        }
                                    }
                                    className="bg-[#198A00] p-2 text-white rounded-2xl w-32">Group</button>
                            </div>
                            <div className={`${openTab2 == 1? "block": "hidden"}`}>
                              <p className="">Begin a new conversation with someone by entering their username or email.</p>
                              <div className="my-4 text-blueGray-500  leading-relaxed">
                                <form className="">
                                    <div className="flex text-lg">
                                      <input value={query} type="text" onChange={queryInput} className="flex flex-grow bg-gray-100 p-2 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="Search by username or email"/>
                                      <button type="submit" className="flex flex-row justify-center rounded-2xl bg-[#198A00] w-10 text-white items-center"><SearchIcon className="h-6"/></button>
                                    </div>
                                </form>
                                <div className="flex flex-col max-h-72">
                                  <p className="mt-10">Suggestions</p>
                                   <ul className="overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                                    {
                                      results.map((resp)=>{
                                          return(
                                            <li key={resp.user_id} className="flex flex-row  items-center mt-4 space-x-2 cursor-pointer transition p-2 pr-4 rounded-2xl duration-150 transform hover:bg-gray-100">
                                              <a href="#" className="flex justify-between w-full">
                                                <div className="flex items-center space-x-3">
                                                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                                                  <p>{resp.display_name}</p>
                                                </div>
                                                <button className="bg-[#198A00] p-2 w-32 text-white rounded-2xl" onClick={async (e)=>{
                                                console.log()
                                                // Create group
                                                const name = await axios.get(`https://chat.zcfchat.com/_matrix/client/r0/profile/${resp.user_id}/displayname`,                                 
                                                  {
                                                    headers: {
                                                      'Content-Type': 'application/json',
                                                      accept: '*/*',
                                                      'Content-Type': 'application/json',
                                                      'Authorization': `Bearer ${accessToken}`
                                                    }
                                                  }

                                                )
                                                console.log(name.data.displayname)
                                                let username = name.data.displayname
                                                const res = await axios.post('https://chat.zcfchat.com/_matrix/client/r0/createRoom',                                 
                                                  {
                                                    "creation_content": {
                                                      "m.federate": true
                                                    },
                                                    "name": username,
                                                    "preset": "private_chat",
                                                    "topic": "Private Chat"
                                                  },
                                                  {
                                                    headers: {
                                                      'Content-Type': 'application/json',
                                                      accept: '*/*',
                                                      'Content-Type': 'application/json',
                                                      'Authorization': `Bearer ${accessToken}`
                                                    }
                                                  }

                                                )
                                                
                                                const roomId = res.data.room_id
                                                const userId = resp.user_id

                                                router.prefetch(`/chat/${roomId}`)

                                                // Invite
                                                const res2 = await axios.post(`https://chat.zcfchat.com/_matrix/client/r0/rooms/${roomId}/invite`,
                                                  {
                                                      "user_id": userId,
                                                  },                                
                                                  
                                                  {
                                                    headers: {
                                                      'Content-Type': 'application/json',
                                                      accept: '*/*',
                                                      'Content-Type': 'application/json',
                                                      'Authorization': `Bearer ${accessToken}`
                                                    }
                                                  }

                                                )
                                                console.log(res2)
                                                const status = res2.status
                                              
                                                // Reroute to page

                                                if(status==200){
                                                  toast('Invitative has been sent.')
                                                  router.push(`${roomId}`)
                                                  setShowModal1(false)
                                                }
                                              }}>{invite===''? 'Send Invite': invite}</button>
                        
                                              </a>
                                            </li>
                                          )
                                        })
                                      }
                                   </ul>
                                  
                                </div>
                                <p className="mt-10 mb-2">Or send an invitation link</p>
                                <div className="flex border border-[#198A00] w-full p-2 rounded-2xl">
                                    
                                    <input disabled className="flex flex-grow" value="https://zcf.com/chat/@iamcephas:zcf.messenger.org"/>
                                    <ClipboardCopyIcon className="h-6 cursor-pointer text-[#198A00]" title="Copy to clipboard" onClick={() => alert('Link copied to clipboard')}/>
                                  
                                </div>
                              </div>
                            </div>
                            <div className={`${openTab2 == 3? "block": "hidden"}`}>
                              <p className="font-bold">Join a group by searching for it. If you cannot find it in results ask for an invite.</p>
                              <div className="my-4 text-blueGray-500  leading-relaxed">
                                <form className="">
                                    <div className="flex text-lg">
                                      <input type="text" className="flex flex-grow bg-gray-100 p-2 mr-2 rounded-2xl focus:outline-none text-sm" placeholder="Enter group name i.e. The Montley Crew"/>
                                      <button type="submit" className="flex flex-row justify-center rounded-2xl bg-[#198A00] w-10 text-white items-center"><SearchIcon className="h-6"/></button>
                                    </div>
                                </form>
                                <div className="flex flex-col max-h-72">
                                  <p className="mt-10 font-bold">Public Groups</p>
                                  <ul className="overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
                                    {
                                      groups.map(group => <Suggestions key={group.room_id} name={group.name} memcount={group.num_joined_members} topic={group.topic}/>)
                                    }
                                    </ul>
                                  
                                </div>
                                
                              </div>
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="bg-[#198A00] font-bold uppercase px-6 py-3 rounded-2xl text-white text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal1(false)}
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

export default Midpanel
