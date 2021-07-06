import React, { useState } from "react"

function Toggle({
  className = "",
  defaultChecked = false,
  name = "",
  onChange = () => {},
  icon,
  ...newProps
}) {
  const [checked, setChecked] = useState(false)
  let finalClass = `${className} relative w-12 h-6 flex select-none cursor-pointer`
  let togglerClass =
    "h-6 w-6 border-2 absolute z-10 rounded-full border-2 border-[#198A00] transition-transform duration-300 ease-in-out flex justify-center items-center"
  let backgroundClass =
    "absolute left-0 top-0 h-full w-full border-2 border-white rounded-full"
  if (checked) {
    backgroundClass += ""
    togglerClass += " transform translate-x-full bg-white"
  } else {
    backgroundClass += " border "
    togglerClass += " border-gray-100"
  }
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="hidden"
      />
      <label
        className={finalClass}
        htmlFor={name}
        onClick={() => {
          setChecked(!checked)
        }}
        {...newProps}
      >
        <span className={backgroundClass} />
        <span className={togglerClass}>
          {icon &&
            React.cloneElement(icon, {
              className: "text-xs text-gray-800",
            })}
        </span>
      </label>
    </div>
  )
}

export default Toggle