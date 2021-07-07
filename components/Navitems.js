import {useState} from "react"
function Navitems({name, counter, icon}) {
   

    return (
        <div onClick={function() {
           }} className={`bg-gray-50 text-[#198A00]' 'bg-none text-white' flex cursor-pointer p-2 items-center mb-2 rounded-xl transition duration-150 transform hover:bg-gray-50 hover:text-[#198A00]`}>
            <p className="mr-2">{icon}</p>
            <p>{name}</p>
            <p className={`bg-white'  'bg-none'  ml-32 p-2 rounded-xl text-[#198A00] right-1 absolute text-xs font-bold flex items-center`}>{counter}</p>
        </div>
    )
}

export default Navitems
