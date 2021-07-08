import Image from 'next/image'
import {MenuIcon, ChevronDownIcon, CogIcon, BellIcon, InformationCircleIcon, LogoutIcon, UserIcon, SupportIcon, CubeTransparentIcon, ShieldCheckIcon} from '@heroicons/react/solid'
import {ChatAltIcon,UserAddIcon, UserGroupIcon, SearchIcon, HeartIcon, ChatIcon, CollectionIcon, LightningBoltIcon, ChipIcon, FilmIcon, WifiIcon} from '@heroicons/react/outline'
import {createPopper} from '@popperjs/core'
import {useState, createRef} from 'react'
import Navitems from './Navitems';
import NavHeadings from './NavHeadings';
import Link from 'next/link'
import {useRouter} from 'next/router'
import MarketPlaceItems from './MarketPlaceItems'
import NavFooter from './NavFooter'

function Navbar({active}) {
    // Popup profile menu
    const router = useRouter()
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

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

    // Drawer menu
    const btnDrawerRef = createRef();
    const drawerMenuRef = createRef();

    const minimizeMenu = () => {
        // createPopper(btnDrawerRef.current, drawerMenuRef.current, {
        //     placement: 'bottom-start'
        // })
        setDrawerMenu(true)
    }
    const expandDrawerMenu = () => {
        // setDrawerMenu(false)
    }

    return (
        <div>
            <div className=" w-80 bg-[#198A00] h-screen p-5 text-white mr-1 overflow-auto scrollbar-thin scr scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Header */}
                    <div className="flex border-b border-[#48ac32] pb-5">
                        {/* User Profile */}
                        <div className="flex space-x-4 items-center w-4/5">
                            <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={52} width={52} 
                            />
                            <button 
                                type="button"
                                ref={btnDropdownRef}
                                onClick={() => {
                                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
                                }}  className="flex font-bold"  >John Smith <span><ChevronDownIcon className="h-6"/></span>
                                </button>
                        </div>
                        {/* Dropdown Content */}
                        <div className={`${dropdownPopoverShow ? "transition duration-100 scale-100" : "transition duration-100 scale-0"}  origin-top-left absolute left-0 mt-16 ml-5 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-2 text-gray-400 z-10`}>
                            <div className="py-1" role="none">
                            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                            <a href="#" className="block px-4 py-2 text-sm text-[#198A00] font-bold" role="menuitem" tabIndex="-1" id="menu-item-0">Signed in as</a>
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm font-semibold mb-2 border-b border-gray-300 flex items-center" role="menuitem" tabIndex="-1" id="menu-item-0"><UserIcon className="h-6 text-gray-400 mr-1"/>johnsmith</a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex items-center group" role="menuitem" tabIndex="-1" id="menu-item-0"><CogIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Account settings</span></a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex" role="menuitem" tabIndex="-1" id="menu-item-1"><SupportIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Support</span></a>
                            <a href="#" className="text-gray-500 block px-4 py-2 text-sm hover:bg-gray-100 rounded-xl active:bg-[#198A00] transition duration-100 transform active:text-white flex" role="menuitem" tabIndex="-1" id="menu-item-2"><InformationCircleIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">About</span></a>
                            <form method="POST" action="#" role="none">
                                <button type="submit" className="flex text-[#198A00] block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                                <LogoutIcon className="h-6 text-gray-400 group"/> <span className="ml-1 mt-1">Sign out</span>
                                </button>
                            </form>
                            </div>
                        </div>
                        {/* Toggle Menu */}
                        <div className="flex w-1/3 justify-end space-x-3 items-center">
                            <BellIcon className="h-7 cursor-pointer"/>
                            <MenuIcon className={`${drawerMenuShow ? "transition duration-100 scale-100" : "transition duration-100 scale-0"} h-7 cursor-pointer`} onClick={drawerMenuShow ? expandDrawerMenu(): minimizeMenu()}/>
                        </div>
                    </div>  
                {/* navigation */}
                <div className="pt-4">
                    {/* Messenger Items */}
                    <NavHeadings heading="Messenger "/>
                        <ul className="">
                            <li onClick={() => {
                                router.push('/chat')
                            }}><Navitems  name="Chat" counter="6" icon={<ChatAltIcon className="h-6"/>}/></li>
                            <li onClick={()=>{
                                router.push('/chat/find')
                            }}><Navitems name="Invites" counter="4" icon={<UserAddIcon className="h-6"/>}/></li>
                            <li onClick={()=> {
                                router.push('/chat/contacts')
                            }}><Navitems  name="Contacts" icon={<UserGroupIcon className="h-6"/>}/></li>
                            <li onClick={()=>{
                                router.push('/chat/find')
                            }}><Navitems name="Find" counter="100" icon={<SearchIcon className="h-6"/>}/></li>
                        </ul>
                    {/* Channel */}
                    <NavHeadings heading="Channel"/>
                        <ul className="">
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
                    
                    <NavHeadings heading="Booking & Ticketing"/>
                    {/* Nav Footer Quick Access Icons */}
                    {/* Marketplace*/}
                    <NavHeadings heading="Utility & Bill Payments"/>
                        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 p-2 mt-4 items-center gap-4">
                            <MarketPlaceItems icon={<CollectionIcon className="h-7"/>} title="Airtime"/>
                            <MarketPlaceItems icon={<LightningBoltIcon className="h-7"/>} title="Electricity"/>
                            <MarketPlaceItems icon={<ChipIcon className="h-7"/>} title="Water"/>
                            <MarketPlaceItems icon={<FilmIcon className="h-7"/>} title="Television"/>
                            <MarketPlaceItems icon={<WifiIcon className="h-7"/>} title="Internet"/>
                            <MarketPlaceItems icon={<ShieldCheckIcon className="h-7"/>} title="Insurance"/>
                        </div>
                    <NavFooter  className="mt-2"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
