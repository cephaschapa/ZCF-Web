function Suggestions({name}) {
    return (
        <div className="flex flex-row items-center mt-4 space-x-2">
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            <p>{name}</p>
        </div>
    )
}

export default Suggestions
