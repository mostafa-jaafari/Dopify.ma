'use client';

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function DashboardWelcome(){
    const [HideNotif, setHideNotif] = useState<boolean>(false);
    return (
        <main 
            className={`relative w-full rounded-xl p-4 text-orange-300 
            bg-orange-500/10 border border-orange-400/50 shadow shadow-orange-500/30
        ${HideNotif ? "hidden" : "flex"}`}>
            <X 
                onClick={() => setHideNotif(true)} 
                size={20} 
                className="absolute right-4 border border-orange-400/50 
                rounded-full cursor-pointer hover:text-orange-400"/>
            <p className="text-xl">
                Welcome new sellers! Please read this page first: 
                <Link className="text-blue-700 font-semibold" href='/'> How it works ? </Link>
                 & 
                <Link className="text-blue-700 font-semibold" href='/'> Frequently Asked Questions. </Link>
                 It&apos;s important!
            </p>
        </main>
    )
}