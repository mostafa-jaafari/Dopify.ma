'use client';
import { Header_Links } from "@/Links/HeaderLinks"
import Link from "next/link"
import { useState } from "react";



export function HeaderUnderHeader(){
    const [ActiveLink, setActiveLink] = useState('');
    return (
        <main className="bg-neutral-100 backdrop-blur-sm sticky top-0 z-10 w-full lg:px-20 py-4 border-b border-blue-600 border-dashed">
            <ul className="Scroll-Animation w-max capitalize flex gap-6">
                {Header_Links.map((hlink, index) => {
                    return (
                        <li 
                            key={index}
                            onClick={() => setActiveLink(hlink.label)}
                            className={`font-semibold cursor-pointer relative hover:text-neutral-800
                            ${hlink.label === ActiveLink ? 'Active-Link text-neutral-900' : 'text-neutral-600'}`}
                            >{hlink.label}</li>
                    )
                })}
            </ul>
        </main>
    )
}

export default function Header(){
    return (
        <main className="w-full flex items-center justify-between bg-neutral-100 py-3 lg:px-20">
            <Link href='/' className="fixed z-50 text-2xl text-blue-600 font-bold uppercase">Dropify</Link>
            <div className="w-1/2"></div>
            <section className="flex gap-8">
                <Link href='/auth/register' className="py-1 px-4 rounded-lg bg-blue-600 text-neutral-100 font-semibold">Register</Link>
                <Link href='/auth/login' className="px-2 text-blue-600 border-b-2 border-blue-600 font-semibold">Login</Link>
            </section>
        </main>
    )
}