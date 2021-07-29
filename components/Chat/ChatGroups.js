import Image from "next/image"

function ChatGroups({name}) {
    return (
            <div className="flex h-16 flex-row bg-white w-full mt-4 rounded-3xl p-2 items-center">
                <div className="h-16 w-16 items-center bg-gray-200 rounded-full">
                    {/* <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={92} width={92} /> */}
                </div>
                <div className="flex flex-grow">
                    <p className="text-sm ml-5 text-[#198A00] font-bold">{name}</p>
                </div>
        </div>
    )
}

export default ChatGroups
