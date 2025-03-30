import Image from 'next/image'
import React from 'react'

export default function ProcessCard({IMAGE, TITLE, DESCRIPTION}: {IMAGE:string; TITLE:string;DESCRIPTION:string;}) {
  return (
    <div className='w-[350px] grow border border-neutral-600 space-y-2 flex flex-col items-center p-8 min-h-[300px] rounded-lg shadow-lg hover:-translate-y-4 transition-all'>
        <div className='relative w-26 h-26 rounded-full shadow shadow-lg overflow-hidden'>
            <Image src={IMAGE} alt='' fill className='object-cover'/>
        </div>
        <h1 className='text-2xl font-semibold pt-4 primary-color'>{TITLE}</h1>
        <p className='text-center para-color-mono text-[18px]'>{DESCRIPTION}</p>
    </div>
  )
}
