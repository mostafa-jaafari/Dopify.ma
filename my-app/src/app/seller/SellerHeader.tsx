import { auth } from '@/auth';
import { SignOut } from '@/Buttons/AuthButtons';
import { User_Links } from '@/GlobalLinks';
import { ChevronDown, Facebook, Instagram, Linkedin, Twitter, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import MenuBtn from './MenuBtn';


const SocialMedia_Links = [
    {
        href: '/',
        icon: Facebook,
        styles: 'text-[#1877F2] w-6 h-6',
    },{
        href: '/',
        icon: Instagram,
        styles: 'text-[#E4405F] w-6 h-6',
    },{
        href: '/',
        icon: Linkedin,
        styles: 'text-[#0077B5] w-6 h-6',
    },{
        href: '/',
        icon: Twitter,
        styles: 'text-[#1DA1F2] w-6 h-6',
    },
];
export default async function SellerHeader() {
    const session = await auth();
  return (
    <section className='px-4 w-full border-b border-neutral-700 py-2 flex justify-between'>
        <div className='flex items-center gap-4'>
            <MenuBtn />
            <span className='flex gap-1 text-xl text-neutral-300'>
            Welcome, <h1 className='font-semibold text-neutral-100'>
                {session?.user?.name}!👋</h1>
            </span>
        </div>
        <section className='relative group'>
            <div className='cursor-pointer hover:bg-neutral-900 font-semibold border border-dashed border-neutral-400 rounded-[50px] flex gap-2 items-center p-2'>
                <Users />
                Community
                <ChevronDown size={22} className='text-neutral-400'/>
            </div>
            <div className='absolute opacity-0 scale-0 transition-all origin-top duration-200 group-hover:opacity-100 group-hover:scale-100 py-2 px-4 rounded-[50px] bg-neutral-800 border border-neutral-600  right-0 top-full w-full'>
                <ul className='w-full flex justify-between'>
                    {SocialMedia_Links.map((medialink, index) => {
                        return (
                            <Link 
                                key={index}
                                href={medialink.href}
                            >
                                <medialink.icon className={medialink.styles}/>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </section>
        {session && (
            <section className="relative group">
                <div className='cursor-pointer flex gap-1 items-center border border-dashed border-neutral-400 rounded-full px-2 py-1'>
                    <div className='relative overflow-hidden w-8 h-8 rounded-full'>
                        <Image src={session?.user?.image as string} fill alt='' className='object-cover'/>
                    </div>
                    <p>{session?.user?.name}</p>
                </div>
                <section className="absolute right-0 opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 origin-top transition-all duration-300 rounded border border-neutral-800 z-50 text-nowrap p-4 bg-neutral-900 min-w-full">
                    <div className="border-b mb-2 pb-2 border-neutral-700">
                        <h1 className="capitalize font-semibold">{session.user?.name}</h1>
                        <p className="text-neutral-500 text-sm">{session.user?.email}</p>
                    </div>
                    <ul className="space-y-1">
                        {User_Links.map((UserLink, index) => {
                            return (
                                <Link href={UserLink.href} key={index} 
                                    className="flex gap-2 p-2 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 capitalize rounded-lg cursor-pointer">
                                    <UserLink.icon />
                                    {UserLink.label}
                                </Link>
                            )
                        })}
                    </ul>
                    <hr className="mb-1 mt-2 border-neutral-700"/>
                    <SignOut />
                </section>
            </section>)}
      </section>
  )
}
