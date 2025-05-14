import React from 'react';

const Card = ({icon,title,text,previous}) => {
    return (
        <div className="bg-(--color-background-1) rounded-12 p-12 flex items-center gap-12 flex-1">
            <div className='w-40 h-40 rounded-full flex justify-center items-center bg-(--color-black-4) text-(--color-primary)'>
                {icon}
            </div>
            <div className='flex flex-col'>
                <p className='text-14 text-(--color-black-40) font-normal'>
                    {title}
                </p>
                <p className='text-(--color-font-heading) text-32 font-bold'>
                    {text}
                </p>
                {/* <p className='text-12 text-(--color-success)'>
                    {previous}
                </p> */}
            </div>
        </div>
    );
};

export default Card;
