'use client';

import { Info, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function DashboardWelcome(){
    const [HideNotif, setHideNotif] = useState<boolean>(false);
    return (
        <main className={`${HideNotif && "hidden"} w-full relative border border-orange-300/20 overflow-hidden rounded px-12 py-4 bg-orange-300/10
        after:absolute after:h-full after:w-1 after:rounded-[50px] after:left-0 after:top-0 after:bg-orange-400/70`}>
            <div className="w-full absolute top-2 left-0 flex justify-between px-4">
                <Info size={20} className="text-orange-300"/>
                <X onClick={() => setHideNotif(true)} size={20} className="cursor-pointer text-gray-300/70 hover:text-gray-300"/>
            </div>
            <span className="-space-y-6 text-neutral-400">
                <p>
                    Welcome new sellers! Please read this page first:
                </p> <br />
                <p className="space-x-2">
                    <Link href='/' className="text-blue-500">
                        How it works? 
                    </Link>
                    & 
                    <Link href='/' className="px-2 text-blue-500">
                         Frequently Asked Questions. 
                    </Link>
                     It&apos;s important!
                </p>
            </span>
        </main>
    )
}