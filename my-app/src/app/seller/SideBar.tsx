'use client';
import GlobalLogo from "@/components/GlobalLogo";
import { SideBar_Links } from "@/GlobalLinks";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "./StateProvider";


export default function SideBar(){
    const [ActivePage, setActivePage] = useState<string>('');
    useEffect(() => {
        setActivePage(SideBar_Links[0].label)
    }, [])
    const Context = useContext(StateContext);
    if(!Context){
        return null;
    }
    const { IsOpen } = Context;
    return (
        <main className={`flex-shrink-0 transition-all duration-200 overflow-hidden sticky top-0 h-screen bg-[#009eb3] 
        ${IsOpen ? "w-14" : "w-66"}`}>
            {IsOpen ? 
            (
                <Link href='/' className="flex justify-center text-2xl font-bold py-4">
                    M<p className="text-[#FF9900]">H</p>
                </Link>
            ) 
            : 
            (
                <GlobalLogo CLASSNAME="w-full flex justify-center py-3 border-b border-[#007888]" />
            )}
            <ul className="w-full flex flex-col px-2 py-2 space-y-2">
                {SideBar_Links.map((sidelink, index) => {
                    return (
                        <Link 
                            key={index}
                            onClick={() => setActivePage(sidelink.label)}
                            href={`/seller/${sidelink.label === 'dashboard' ? '' : sidelink.label.toLocaleLowerCase().replace(' ', '')}`}
                            className={`text-nowrap py-2 flex ${IsOpen ? "px-2" : "px-4"} gap-4 hover:bg-[#78efff49] font-semibold rounded-lg justify-start items-center capitalize
                            ${ActivePage === sidelink.label ? 'bg-[#78efff49]' : ''}`}
                            >
                            <sidelink.icon className="flex-shrink-0"/>
                            {sidelink.label}
                        </Link>
                    )
                })}
            </ul>
        </main>
    )
}