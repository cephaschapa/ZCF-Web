import {ChatAlt2Icon, SearchIcon} from '@heroicons/react/outline'
import Buttons from '../Buttons/Button'
import FloatingActionBtn from '../Buttons/FloatingActionBtn'
import {PlusIcon} from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/solid'
import {useState} from 'react'
import PersonalChats from '../Chat/PersonalChats'

function Midpanel() {
    const [openTab, setOpenTab] = useState(1);
    return (
        <div className="w-1/3 bg-gray-100 h-screen pr-2 pt-0 p-0 text-white mr-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
            {/* Header */}
            <div className="bg-[#198A00] p-4 h-20 rounded-br-2xl rounded-bl-2xl top-0 sticky shadow-lg z-10">
                <div className="bg-white p-3 px-6 rounded-full">
                    <form className="flex items-center">
                        <input className="flex-grow focus:outline-none text-gray-700 bg-transparent" type="search" placeholder="Search Chat"/>
                        <SearchIcon className="text-gray-400 h-6"/>
                    </form>
                </div>
                
            </div>
            <div className="flex justify-between mt-4 w-full sticky top-20 bg-gray-100 p-1 z-10">
                <Buttons onClick={
                    (e)=>{
                        e.preventDefault();
                        setOpenTab(1)
                    }
                } title="Personal (10)" icon={<ChatAltIcon className="h-6 mr-1"/>} type="primary"/>
                <Buttons onClick={
                    (e)=>{
                        e.preventDefault();
                        setOpenTab(2)
                    }} title="Groups (3)" icon={<ChatAlt2Icon className="h-6 mr-1" />} type="secondary"/>
            </div>
            {/* Chat items */}
            <div className="mt-4 p-1">
                {/* Personal 1 content */}
                <PersonalChats />
                {/* Group List Content */}
            </div>
            {/* Floating Add Button */}
            <div className="h-12 w-full bottom-8 sticky pr-7">
                <FloatingActionBtn icon={<PlusIcon />}/>
            </div>
        </div>
    )
}

export default Midpanel
