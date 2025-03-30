import Link from 'next/link'
import React from 'react'

export default function GlobalLogo({CLASSNAME}:{CLASSNAME?:string;}) {
  return (
    <div className={CLASSNAME}>
      <Link href='/' className="text-3xl text-white font-bold">
          Merch<span className=''>Hub</span>
      </Link>
    </div>
  )
}
