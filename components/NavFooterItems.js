function NavFooterItems({icon, title}) {
    return (
        <div className="flex flex-col items-center">
            <p>{icon}</p>
            <p>{title}</p>
        </div>
    )
}

export default NavFooterItems
