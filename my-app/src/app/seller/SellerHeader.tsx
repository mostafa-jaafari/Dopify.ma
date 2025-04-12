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
    <section className='px-4 w-full sticky top-0 z-50 bg-white
        border-b border-neutral-200 py-2 flex justify-between'>
        <div className='flex items-center gap-4'>
            <MenuBtn />
            <span className='flex gap-1 text-xl text-neutral-600'>
            Welcome, <h1 className='font-semibold text-neutral-900'>
                {session?.user?.name}!👋</h1>
            </span>
        </div>
        <section className='relative group'>
            <div className='text-neutral-900 cursor-pointer hover:bg-neutral-200 font-semibold border 
            border-dashed border-neutral-400 rounded-[50px] flex gap-2 items-center p-2'>
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
        {session ? (
                <section className="relative group">
                <div className="w-full flex gap-2 items-center">
                    <div className="relative rounded-full border-2 border-neutral-200 
                    w-12 h-12 overflow-hidden">
                        <Image 
                            src={session.user?.image as string} 
                            alt="profil image" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <span className="-space-y-1">
                        <h1 className="text-[20px] capitalize">{session.user?.name}</h1>
                        <p className="text-sm text-neutral-500">{session.user?.email}</p>
                    </span>
                </div>
                <section className="absolute right-0 opacity-0 shadow-lg scale-0 group-hover:scale-100 
                    group-hover:opacity-100 origin-top transition-all duration-300 rounded 
                    rounded-lg overflow-hidden z-50 text-nowrap bg-white min-w-full
                ">
                    <div className="primary-background border-b mb-2 px-4 py-2 border-neutral-400">
                        <h1 className="capitalize text-white font-semibold">
                            {session.user?.name}
                        </h1>
                        <p className="text-neutral-300 text-sm">
                            {session.user?.email}
                        </p>
                    </div>
                    <ul className="space-y-1 px-2">
                        {User_Links.map((UserLink, index) => {
                            return (
                                <Link href={UserLink.href} key={index} 
                                    className="flex gap-2 p-2 border border-neutral-300 
                                        hover:bg-neutral-100 font-semibold capitalize 
                                        rounded-lg cursor-pointer primary-color">
                                    <UserLink.icon className="primary-color"/>
                                    {UserLink.label}
                                </Link>
                            )
                        })}
                    </ul>
                    <hr className="mt-3 border-neutral-200"/>
                    <div className="p-2">
                        <SignOut />
                    </div>
                </section>
            </section>)
                :(
                <div className="flex gap-3">
                    <Link href='/auth/login' className="py-1 px-3 font-semibold rounded">Login</Link>
                    <Link href='/auth/register' className="py-1 px-3 bg-[#009eb3] text-neutral-100 font-semibold rounded-lg">Register</Link>
                </div>
                )}
      </section>
  )
}
