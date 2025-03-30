import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function StartButtonCTA({LABEL, PATH}: {LABEL: string; PATH: string;}) {
  return (
    <Link href={PATH} className='py-2 w-max flex items-center gap-1 px-4 font-semibold cursor-pointer text-[18px] primary-button capitalize text-neutral-200 rounded-lg'>
        <p>{LABEL}</p>
        <ArrowRight color='white' size={20}/>
    </Link>
  )
}
