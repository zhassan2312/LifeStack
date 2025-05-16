import React from 'react'

const Button = ({text,icon,className,disabled}) => {
  return (
    <button disabled={disabled} className={`flex gap-16 items-center ${className} justify-center p-12 cursor-pointer `}>
        {icon && <span>{icon}</span>}
        {text}
    </button>
  )
}

export default Button