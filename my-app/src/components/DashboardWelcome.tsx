'use client';

import { Info, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function DashboardWelcome(){
    // const [HideNotif, setHideNotif] = useState<boolean>(false);
    const session = useSession();
    const NotifKey = 'welcome';
    const [HideNotif, setHideNotif] = useState(() => {
        const Value = JSON.parse(localStorage.getItem('AppNotifications'));
        return Value?.[NotifKey] !== false;
    });
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('AppNotifications')) || {};
        stored[NotifKey] = HideNotif;
        localStorage.setItem('AppNotifications', JSON.stringify(stored));
    },[HideNotif])
    return (
        <main className={`${HideNotif && "hidden"} w-full relative border border-orange-200 overflow-hidden rounded px-12 py-4 bg-orange-300/20
        after:absolute after:h-full after:w-1 after:rounded-[50px] after:left-0 after:top-0 after:bg-orange-400/70`}>
            <div className="w-full absolute top-2 left-0 flex justify-between px-4">
                <Info size={20} className="text-orange-300"/>
                <X 
                    onClick={() => setHideNotif(!HideNotif)} 
                    size={20} 
                    className="cursor-pointer text-neutral-400 hover:text-neutral-500"/>
            </div>
            <span className="-space-y-6 text-neutral-600">
                <p>
                    Welcome {session?.data?.user?.name || 'new seller'}! Please read this page first:
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