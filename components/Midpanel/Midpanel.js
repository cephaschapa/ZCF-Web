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
        <div className="w-96 rounded-2xl bg-gray-100 h-screen p-3 text-white mr-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Header */}
            <div className="bg-[#198A00] p-3 rounded-2xl fixed">
                <div className="bg-white p-3 px-6 rounded-full">
                    <form className="flex items-center">
                        <input className="flex-grow focus:outline-none text-gray-700" type="search" placeholder="Search Chat"/>
                        <SearchIcon className="text-gray-400 h-6"/>
                    </form>
                </div>
                <div className="flex justify-between mt-4">
                    <Buttons onClick={
                        (e)=>{
                            e.preventDefault();
                            setOpenTab(1)
                        }
                    } title="Personal" icon={<ChatAltIcon className="h-6 mr-1"/>} type="primary"/>
                    <Buttons onClick={
                        (e)=>{
                            e.preventDefault();
                            setOpenTab(2)
                        }} title="Groups" icon={<ChatAlt2Icon className="h-6 mr-1" />} type="secondary"/>
                </div>
            </div>
            {/* Chat items */}
            <div className="mt-36">
                {/* Personal 1 content */}
                <PersonalChats />
                {/* Group List Content */}
            </div>
            {/* Floating Add Button */}
            <div className="h-12 w-80 ml-8 bottom-8 fixed">
                <FloatingActionBtn icon={<PlusIcon />}/>
            </div>
        </div>
    )
}

export default Midpanel
