import Image from "next/image"

function ChatGroups({name}) {
    return (
            <div className="flex flex-row bg-gray-100 w-full mt-2 rounded-3xl p-2 items-center">
                <div className="h-full w-14 items-center">
                    <Image src="/assets/profilepic.png" alt="Profile Picture" className="rounded-full cursor-pointer p-2 transition duration-150 transform hover:scale-95" height={92} width={92} />
                </div>
                <div className="w-full">
                    <p className="text-sm ml-5 text-[#198A00] font-bold">{name}</p>
                </div>
        </div>
    )
}

export default ChatGroups
