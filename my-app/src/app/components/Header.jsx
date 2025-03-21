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
        <main className="sticky top-0 px-20 z-40 bg-[#e0e0e0a1] backdrop-blur-sm border-b border-blue-600 border-dashed w-full flex pt-5 pb-3">
            {/* <div className="w-1/4"></div> */}
            <div className="Progress-Bar"></div>
            <ul className="flex gap-6 items-center Scroll-Animation">
                {Links.map((navlink, index) => {
                    return (
                        <li 
                            onClick={() => setActiveLink(navlink.label)} 
                            className={`cursor-pointer transition-all duration-300 relative capitalize font-semibold 
                            ${navlink.label === ActiveLink ? 'Active-Link text-[#2563EB]' : 'text-neutral-600'}`} key={index}>{navlink.label}</li>
                    )
                })}
            </ul>
        </main>
    )
}

export default function Header(){
    return (
        <main className="w-full py-3 px-20 bg-neutral-200">
            <Link href='/' className="fixed z-50 top-2 font-bold text-3xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Dopify.ma</Link>
            <section className="flex">
                <div className="w-1/4"></div>
                <section className="w-full flex items-center justify-between">
                    <input 
                        className="w-1/2 border border-blue-600 rounded-lg outline-none p-2"
                        type="text" 
                        placeholder="search here..."
                    />
                    <div className="flex gap-4">
                        <button className="px-4 py-1 font-semibold text-neutral-200 rounded bg-blue-600">Register</button>
                        <button className="px-2 font-semibold text-blue-600 border-b-2">Login</button>
                    </div>
                </section>
            </section>
        </main>
    )
}