// Button Component
function Buttons({title, type, icon}) {
    return (
            <button className={`${type == 'primary' ? 'bg-[#C8E3C2] text-[#198A00] transition duration-150 transform hover:bg-[#97d889] hover:text-white' : 'bg-[#198A00]'} flex justify-center rounded-2xl p-3 shadow-md w-1/2 m-1`}>
                {icon}
                {title}
            </button>
    )
}

export default Buttons
