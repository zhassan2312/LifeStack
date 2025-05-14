
import { Play, Clock3,CircleCheckBig } from 'lucide-react'
import Button from './Button'

const Project = ({
    title,
    startingTime,
    completionPercentage,
    deadline,
    goal
}) => {
  return (
        <div className='flex gap-16 pl-24 pr-24 pt-16 pb-16 rounded-16 bg-(--color-background-1) items-center'>
            <div className='text-(--color-white-100) bg-(--color-primary) p-8 flex justify-center items-center rounded-80 h-fit'>
                <Play fill='white' size={16}/>
            </div>
            <div className='flex flex-col justify-between gap-8'>
                <h2 className='text-16 font-bold text-(--color-black-80)'>
                    Start from
                </h2>
                <p className='text-14 font-normal text-(--color-black-60)'>
                        {startingTime}
                </p>
            </div>
            <div className='flex w-[200px] ml-16 mr-16 flex-col gap-8'>
                <h2 className='text-18 font-bold text-(--color-black-100)'>
                    {title}
                </h2>
                <div className='flex gap-8 items-center'>
                    <CircleCheckBig size={16}/>
                    <p className='text-14 font-normal text-(--color-black-60)'>
                        {goal}
                    </p>
                </div>
            </div>
            <div className='flex flex-1 flex-col gap-8'>
                <h2 className='text-18 font-bold text-(--color-font-color)'>
                    {completionPercentage}
                </h2>
                <div className="w-full bg-(--color-black-10) rounded-12 h-8">
                    <div
                        className="bg-(--color-secondary-blue) h-full rounded-12 "
                        style={{ width: completionPercentage }}
                    ></div>
                </div>
            </div>
            
            
            <div className='flex flex-col gap-8'>
                <h2 className='text-16 font-bold text-(--color-black-80)'>
                    Deadline
                </h2>
                <div className='flex gap-8 text-(--color-black-60)'>
                    <p className='text-14 font-normal'>
                        {deadline}
                    </p>
                </div>
            </div>
            <Button 
                icon={<Clock3 size={16}/>} 
                text={'Reminder'} 
                className={'bg-(--color-secondary-indigo) text-(--color-white-100) rounded-12 font-medium text-14 pl-24 pr-24'}/>
            
        </div>
  )
}


export default Project