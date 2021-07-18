function WelcomeBtn({icon,name}) {
    return (
        <button onClick={() => {alert('hello')}} type="button" className="flex flex-col items-center space-y-3 bg-gradient-to-r  p-3 text-white rounded-2xl bg-[#198A00] transition duration-150 transform hover:bg-[#26970c]">
            <p>{icon}</p>
            <p>{name}</p>
        </button>
    )
}

export default WelcomeBtn
