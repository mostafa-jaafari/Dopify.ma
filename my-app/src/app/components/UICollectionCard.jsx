import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function UICollectionCard() {
  return (
    <div className='rounded-xl bg-white shadow-lg'>
        <div className='relative w-[350px] h-[350px] overflow-hidden'>
          <Image loading="lazy" src='https://d2vw8tvocudf9g.cloudfront.net/assets/images/sell-your-tshirt-todify.png' fill alt='' className='object-cover'/>
        </div>
        <div className='flex flex-col items-center py-4 space-y-4 px-4'>
            <h1 className='text-xl font-semibold'>
                Product Title
            </h1>
            <Link href='/' className='w-full py-2 text-white text-center text-xl bg-gradient-to-r from-blue-600 to-blue-400 rounded'>Start designing</Link>
        </div>
    </div>
  )
}