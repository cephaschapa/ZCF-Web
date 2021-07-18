function FloatingActionBtn({icon}) {
    return (
        <button className="bg-[#198A00] p-3 h-14 w-14 float-right bg-[#198A00] text-white shadow-lg rounded-full cursor-pointer transition duration-150 transform hover:scale-105" title="New Chat">
            {icon}
        </button>
    )
}

export default FloatingActionBtn
