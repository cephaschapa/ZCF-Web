import {SearchIcon} from '@heroicons/react/outline'

function Midpanel() {
    return (
        <div className="w-96 rounded-2xl bg-gray-100 h-screen p-3 text-white mr-1">
            {/* Header */}
            <div className="bg-[#198A00] p-3 rounded-2xl">
                <div className="bg-white p-3 rounded-full">
                    <form className="flex items-center">
                        <input className="flex-grow focus:outline-none text-gray-700" type="search" placeholder="Search Chat"/>
                        <SearchIcon className="text-gray-400 h-6"/>
                    </form>
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}

export default Midpanel
