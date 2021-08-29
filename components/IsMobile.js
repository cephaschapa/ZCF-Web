import { ExclamationIcon } from '@heroicons/react/outline'
function IsMobile() {
    return (
        <div className="flex items-center h-screen bg-[#198A00] p-2">
            <div className="flex flex-col p-2 h-screen bg-[#198A00] items-center">
            <ExclamationIcon className="h-16 w-16 text-white m-2"/>
            <p className="flex text-white text-center">You are using a mobile device. This website is only optimised for desktop devices.</p>
            </div>
        </div>
    )
}

export default IsMobile
