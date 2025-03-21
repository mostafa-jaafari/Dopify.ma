'use client';
import Link from "next/link"
import { useState } from "react"


const Links = [
    {label: 'categories'},
    {label: 'best selling'},
    {label: 'new'},
    {label: 'last added'},
    {label: 'stickers'},
    {label: 'gifts'},
    {label: 'accessoires'},
    {label: 'wall art'},
]
export const HeaderUnderHeader = () => {
    const [ActiveLink, setActiveLink] = useState('');
    return (
        <main className="sticky top-0 z-40 bg-[#0a0a0aa1] backdrop-blur-sm border-b border-dashed border-neutral-700 w-full flex py-5">
            <div className="w-1/4"></div>
            <div className="Progress-Bar"></div>
            <ul className="flex gap-6 items-center ">
                {Links.map((navlink, index) => {
                    return (
                        <li onClick={() => setActiveLink(navlink.label)} className={`cursor-pointer transition-all duration-300 relative capitalize text-neutral-500 ${navlink.label === ActiveLink && 'Active-Link text-white'}`} key={index}>{navlink.label}</li>
                    )
                })}
            </ul>
        </main>
    )
}

export default function Header(){
    return (
        <main className="w-full py-3 px-20">
            <Link href='/' className="fixed z-50 top-3 font-bold text-3xl">Dopify.ma</Link>
            <section className="flex">
                <div className="w-1/4"></div>
                <section className="w-full flex items-center justify-between">
                    <input 
                        className="w-1/2 border border-neutral-700 rounded outline-none p-2"
                        type="text" 
                        placeholder="search here..."
                    />
                    <div className="flex gap-2">
                        <button>Register</button>
                        <button>Login</button>
                    </div>
                </section>
            </section>
        </main>
    )
}