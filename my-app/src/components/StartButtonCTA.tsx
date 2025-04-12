import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { auth } from "@/auth";


export default async function StartButtonCTA() {
  const session = await auth();
  return (
    <Link href={session ? "/seller" : "/auth/register"} className='py-2 w-max flex items-center gap-1 px-4 font-semibold 
      cursor-pointer text-[18px] primary-button bg-violet-500 shadow-lg hover:bg-violet-600 
      capitalize text-white rounded-lg'>
        <p>
        {session ? 'To Dashboard' : 'Start Selling Now'}
        </p>
        <ArrowRight color='white' size={20}/>
    </Link>
  )
}
