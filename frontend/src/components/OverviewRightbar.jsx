import React from 'react'
import Button from './Button'

const Message=({image,name,message})=>{
    return(
        <div className='flex gap-16'>
            <img src={image} alt="" className='w-48 h-48 rounded-full'/>
            <div className='flex flex-col '>
                <h2 className='text-16 font-bold text-(--color-font-heading)'>
                    {name}
                </h2>
                <p
                    className="text-14 font-normal text-(--color-black-60) max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    {message}
                </p>
            </div>
        </div>
    )
}


const messages=[
    {
        image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        name:"John Doe",
        message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        name:"Jane Smith",
        message:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        name:"Alice Johnson",
        message:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
]


const CreateTask=()=>{
    return(
        <div className='flex flex-col gap-16'>
            <h1 className='text-20 text-(--color-font-heading) font-semibold'>
                Create Task
            </h1>
            <div className='flex flex-col gap-8'>
                <p className='text-14 text-(--color-black-40)'>
                Task Title
                </p>
                <input
                type="text"
                placeholder="Create New Task"
                className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
                />
            </div>
            <div className='flex flex-col gap-8'>
                <p className='text-14 text-(--color-black-40)'>
                Start Time
                </p>
                <input
                    type="datetime-local"
                    className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
                />
                <p className='text-14 text-(--color-black-40)'>
                End Time
                </p>
                <input
                    type="datetime-local"
                    className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
                />
            </div>
            <Button text={'Create'} className={'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'}/>
        </div>
    )
}

const CreateCalorie=()=>{
    return(
        <div className='flex flex-col gap-16'>
            <h1 className='text-20 text-(--color-font-heading) font-semibold'>
                Intake/Burn Calories
            </h1>
            <div className='flex flex-col gap-8'>
                <p className='text-14 text-(--color-black-40)'>
                Description
                </p>
                <input
                type="text"
                placeholder="Write something..."
                className="p-12 border-2 border-(--color-black-40) text-(--color-font-heading) rounded-12 focus:outline-none caret-(--color-font-heading)"
                />
            </div>
            <select
                className="p-12 bg-(--color-background-2) text-(--color-font-heading) rounded-12 focus:outline-none"
            >
                <option value="intake">Intake</option>
                <option value="burn">Burn</option>
            </select>
            <Button text={'Create'} className={'bg-(--color-primary) rounded-12 text-14 text-(--color-white-100) font-normal'}/>
        </div>
    )
}

const OverviewRightbar = () => {
  return (
    <div className='gap-32 bg-(--color-background-1) pt-24 pl-16 pr-16 pb-16 flex w-[320px] flex-col h-screen'>
        <div className='flex flex-col gap-24'>
            <h1 className='text-20 text-(--color-font-heading) font-semibold'>
                Messages
            </h1>
            <ul className='flex flex-col gap-12 max-h-[280px] overflow-y-auto'>
                {messages.map((message,index)=>(
                    <li key={index} className='flex gap-16 p-16 rounded-16 bg-(--color-background-2)'>
                        <Message {...message}/>
                    </li>
                ))}
            </ul>
        </div>
        <hr className='text-(--color-black-20)'/>
        <CreateTask />
        <hr className='text-(--color-black-20)'/>
        <CreateCalorie />
    </div>
  )
}

export default OverviewRightbar