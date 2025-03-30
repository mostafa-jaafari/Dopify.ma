'use client';
import { Star } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

export default function UITestimonialCard({IMAGE, DATE, DESCRIPTION, NAME, RATING}:{RATING:number;DATE:string;IMAGE:string;NAME:string;DESCRIPTION:string;}) {
  const Round_Rating = Math.round(RATING);
  return (
    <div className='w-full flex-shrink-0 bg-neutral-800 border border-neutral-600 shadow p-6 rounded-lg flex flex-col items-center space-y-4'>
        <div className='relative rounded-full w-30 h-30 border-2 border-neutral-300 overflow-hidden'>
            <Image src={IMAGE} alt='' fill className='object-cover'/>
        </div>
        <span className='w-full text-center space-y-2'>
            <div className='w-full flex justify-center items-center space-x-2'>
              <span className='flex space-x-1'>
                {Array(5).fill(0).map((_, index) => {
                  return (
                    <Star key={index} size={22} className={`text-yellow-500 ${index < Round_Rating && 'fill-yellow-500 text-yellow-500'}`}/>
                  )
                })}
              </span>
            </div>
          <h1 className='text-2xl font-semibold'>{NAME}</h1>
          <p className='para-color italic py-4 '>
            {DESCRIPTION}
          </p>
        </span>
        <span className='w-full flex justify-end text-sm font-semibold para-color'>
          {DATE}
        </span>
    </div>
  )
}
