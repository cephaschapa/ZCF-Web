function Suggestions({name, memcount, topic}) {
    return (
        <div className="flex flex-row items-center mt-4 space-x-2 p-2 cursor-pointer transition rounded-2xl duration-150 transform hover:bg-gray-100">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col">
                <p className="font-bold">{name}</p>
                <p className="text-xs">Total Members: {memcount}</p>
                <p className="text-xs">Topic: {topic}</p>
            </div>
        </div>
    )
}

export default Suggestions
