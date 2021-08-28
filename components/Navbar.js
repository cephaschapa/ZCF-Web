import Image from 'next/image'
import {MenuIcon, ChevronDownIcon, CogIcon, BellIcon, InformationCircleIcon, LogoutIcon, UserIcon, SupportIcon, CubeTransparentIcon, ShieldCheckIcon, ChevronRightIcon} from '@heroicons/react/solid'
import {ChatAltIcon,UserAddIcon, UserGroupIcon, SearchIcon, HeartIcon, ChatIcon, CollectionIcon, LightningBoltIcon, ChipIcon, FilmIcon, WifiIcon, TranslateIcon, TicketIcon, OfficeBuildingIcon} from '@heroicons/react/outline'
import {createPopper} from '@popperjs/core'
import {useState, createRef, useEffect} from 'react'
import Navitems from './Navitems';
import NavSections from './NavSections';
import Link from 'next/link'
import {useRouter} from 'next/router'
import MarketPlaceItems from './MarketPlaceItems'
import NavFooter from './NavFooter'
import getUserData from '../helpers/getUserData'
import Cookies from 'cookies'
import axios from 'axios'
import {useCookies} from 'react-cookie'
// import {logout} from '../helpers/auth'

function Navbar(props) {
    // console.log(props)
    const accessToken = props.data.accessToken
    
    const [cookies, setCookie, removeCookie] = useCookies('access_token')
    // Popup profile menu
    const router = useRouter()
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

    const [dropDown0, setDropDown0] = useState(0)
    const [dropDown1, setDropDown1] = useState(0)
    const [dropDown2, setDropDown2] = useState(0)
    const [dropDown3, setDropDown3] = useState(0)
    const [dropDown4, setDropDown4] = useState(0)
    const [active, setActive] = useState(false)

    // console.log(props.data.presenceList.events[0].content.presence)
    // setting user presence state
    const p = "online"
    // setting user presence state
    const presence = () => {
        // on mouse action
    }
    useEffect(() => {
        if( p === "online" ){
            setActive(true)
        }
    }, []);

    

    // Drawer navigation menu slider
    const [drawerMenuShow, setDrawerMenu] = useState(false);

    // Popup menu
    const btnDropdownRef = createRef();
    const popoverDropdownRef = createRef();

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: 'bottom-start'
        })
        setDropdownPopoverShow(true)
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false)
    }
    function submitForm(e) {
        e.preventDefault()
        logout()
    }

    // User Profile Data
    const {displayname, avatar_url} = props.data
    
    // logout handler
    async function logout (e) {
        e.preventDefault();
        removeCookie('access_token')
        router.push('/')
    }

    // Get acronym
    let str = displayname
    let matches = str.slice(0,1)
    let acronym = matches
    

    // Random Color generator
    let colors = ["#ffffff", "#E91E63", "#673AB7", "#03A9F4", "#FF5722"]
    let setBg = Math.floor(Math.random() * colors.length)
    let ranBg = colors[setBg]
    return (
        <div>
            <div className=" w-64 bg-[#198A00] h-screen p-2 text-white mr-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Header */}
                    <div className="flex border-b border-[#48ac32] pb-5 sticky top-0 bg-[#198A00] z-10">
                        {/* User Profile */}
                        <div className="flex space-x-4 items-center w-4/5">
                            {
                                !avatar_url? <>
                                    <div className="flex flex-row">
                                <div className={`flex items-center justify-center text-2xl font-bold pt-1 h-14 w-14 bg-[#fff] rounded-full text-gray-500`}>
                                <Image src="/u.svg" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={92} width={92} />
                                </div>
                                {active?<div className="h-4 w-4 bg-[#8bdd78] top-10 -ml-5 rounded-full relative"></div>:<div className="h-4 w-4 bg-gray top-10 -ml-5 rounded-full relative"></div>}
                            </div>
                                </> : <>
                                <Image src= {`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${avatar_url.slice(6,)}?height=64&width=64`} alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={52} width={52} />
                                </>
                            }
                            {/* <img src={`https://chat.zcfchat.com/_matrix/media/r0/thumbnail/${avatar_url.slice(6,)}?height=64&width=64`} /> */}
                            
                            <button 
                                type="button"
                                ref={btnDropdownRef}
                                onClick={() => {
                                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
                                }}  className="flex flex-row font-bold p-2 rounded-2xl transition duration-150 transform focus:bg-white focus:text-[#198A00] text-sm w-44"  >{displayname}<span></span>
                            </button>
                        </div>
                        {/* Dropdown Content */}
                        <div className={`${dropdownPopoverShow ? "transition duration-100 scale-100" : "transition duration-100 scale-0"}  origin-top-left absolute left-0 mt-16 ml-0 w-56 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-2 text-gray-400 z-50`}>
                            <div className="py-1" role="none">
                            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                            <a href="#" className="block px-4 py-2 text-sm text-[#198A00] font-bold" role="menuitem" tabIndex="-1" id="menu-item-0">Signed in as</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm font-semibold mb-2 border-b border-gray-300 flex items-center" role="menuitem" tabIndex="-1" id="menu-item-0"><UserIcon className="h-6 text-gray-400 mr-1"/>johnsmith</a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex items-center group" role="menuitem" tabIndex="-1" id="menu-item-0"><CogIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Account settings</span></a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex" role="menuitem" tabIndex="-1" id="menu-item-1"><SupportIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Support</span></a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex" role="menuitem" tabIndex="-1" id="menu-item-2"><InformationCircleIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">About</span></a>
                            <form method="POST" action="#" role="none" onSubmit={submitForm}>
                                <button onClick={
                                    logout
                                } type="submit" className="flex text-[#198A00] block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                                <LogoutIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Sign out</span>
                                </button>
                            </form>
                            </div>
                        </div>
                        {/* Toggle Menu */}
                        <div className="flex w-1/3 pr-2 justify-end space-x-3 items-center">
                            <BellIcon className="h-5 cursor-pointer"/>
                            <TranslateIcon className="h-5 cursor-pointer"/>
                        </div>
                    </div>  
                {/* navigation */}
                <div className="pt-4 z-auto">
                    {/* Messenger Items */}
                    <div onClick={()=> {
                        if(dropDown0 == 0){
                            setDropDown0(1)
                        }
                        else {
                            setDropDown0(0)
                        }
                    } } className="flex p-4 font-bold text-sm cursor-pointer bg-[#3c9727] mb-1 mt-1 rounded-xl justify-between">
                        <h1 className="">Messenger</h1>
                        <ChevronRightIcon className={`${dropDown0 == 1? "rotate-90":"rotate-0"} h-6 w-6 transition duration-150 transform ease-in-out`}/>
                    </div>
                    <ul className={`${dropDown0 == 1? "h-52 transition duration-100 ease-in-out" : "hidden"}`}>
                        <li onClick={() => {
                            router.push('/chat')
                        }}><Navitems  name="Chat" counter={props.chatNum} icon={<ChatAltIcon className="h-6"/>}/></li>
                        <li onClick={()=>{
                            router.push('/chat/find')
                        }}><Navitems name="Invites" counter="4" icon={<UserAddIcon className="h-6"/>}/></li>
                        <li onClick={()=> {
                            router.push('/chat/contacts')
                        }}><Navitems  name="Contacts" counter="29" icon={<UserGroupIcon className="h-6"/>}/></li>
                        <li onClick={()=>{
                            router.push('/chat/find')
                        }}><Navitems name="Find" icon={<SearchIcon className="h-6"/>}/></li>
                    </ul>
                    {/* Channel */}
                    <div onClick={()=> {
                        if(dropDown1 == 0){
                            setDropDown1(2)
                        }
                        else {
                            setDropDown1(0)
                        }
                    } } className="flex p-4 font-bold text-sm cursor-pointer bg-[#3c9727] mb-1 mt-1 rounded-xl justify-between">
                        <h1 className="">Channel</h1>
                        <ChevronRightIcon className={`${dropDown1 == 2? "rotate-90":"rotate-0"} h-6 w-6 transition duration-150 transform ease-in-out`}/>
                    </div>
                        <ul className={`${dropDown1 == 2? "transition duration-100 ease-in-out" : "hidden"}`}>
                            <li onClick={() => {
                                router.push('/chat')
                            }}><Navitems  name="Posts" counter="6" icon={<ChatIcon className="h-6"/>}/></li>
                            <li onClick={()=> {
                                router.push('/chat/contacts')
                            }}><Navitems  name="Favorite Posts" icon={<HeartIcon className="h-6"/>}/></li>
                            <li onClick={()=>{
                                router.push('/chat/find')
                            }}><Navitems name="Stories" counter="100" icon={<CubeTransparentIcon className="h-6"/>}/></li>
                        </ul>
                    <div onClick={()=> {
                        if(dropDown2 == 0){
                            setDropDown2(3)
                        }
                        else {
                            setDropDown2(0)
                        }
                    } } className="flex p-4 font-bold text-sm cursor-pointer bg-[#3c9727] mb-1 mt-1 rounded-xl justify-between">
                        <h1 className="">Ticketing and Booking</h1>
                        <ChevronRightIcon className={`${dropDown2 == 3? "rotate-90":"rotate-0"} h-6 w-6 transition duration-150 transform ease-in-out`}/>
                    </div>
                    <ul className={`${dropDown2 == 3? "h-auto transition duration-100 ease-in-out" : "hidden"}`}>
                        <li onClick={()=>{
                                    router.push('/chat/find')
                                }}><Navitems name="Bus Ticket" counter="" icon={<TicketIcon className="h-6"/>}/></li>
                        <li onClick={()=>{
                                    router.push('/chat/find')
                                }}><Navitems name="Hotels and Booking" counter="" icon={<OfficeBuildingIcon className="h-6"/>}/></li>
                    </ul>
                    {/* Nav Footer Quick Access Icons */}
                    {/* Marketplace*/}
                    <div onClick={()=> {
                        if(dropDown4 == 0){
                            setDropDown4(1)
                        }
                        else {
                            setDropDown4(0)
                        }
                    } } className="flex p-4 font-bold text-sm cursor-pointer bg-[#3c9727] mb-1 mt-1 rounded-xl justify-between">
                        <h1 className="">Marketplace</h1>
                        <ChevronRightIcon className={`${dropDown4 == 1? "rotate-90":"rotate-0"} h-6 w-6 transition duration-150 transform ease-in-out`}/>
                    </div>
                        <div className={`${dropDown4 == 1? "block":"hidden"} grid grid-flow-col grid-cols-2 justify-evenly grid-rows-2 p-0 mt-4 items-center gap-2`}>
                            <MarketPlaceItems icon={<CollectionIcon className="h-5"/>} title="Airtime"/>
                            <MarketPlaceItems icon={<LightningBoltIcon className="h-5"/>} title="ZESCO"/>
                            <MarketPlaceItems icon={<ChipIcon className="h-5"/>} title="Water"/>
                            <MarketPlaceItems icon={<FilmIcon className="h-5"/>} title="TV"/>
                            <MarketPlaceItems icon={<WifiIcon className="h-5"/>} title="Internet"/>
                            <MarketPlaceItems icon={<ShieldCheckIcon className="h-5"/>} title="Insurance"/>
                        </div>
                    <NavFooter  className="mt-2"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar

