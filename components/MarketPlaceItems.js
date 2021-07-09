
function MarketPlaceItems({icon, title}) {
    return (
        <div className="flex transition duration-150 transform hover:bg-white hover:text-[#198A00] cursor-pointer space-y-2 flex-col rounded-xl items-center w-16 h-15 py-1 bg-[#3c9727]">
            <p>{icon}</p>
            <p className="text-xs">{title}</p>
        </div>
    )
}

export default MarketPlaceItems
