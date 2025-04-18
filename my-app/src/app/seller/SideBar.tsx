"use client";
import GlobalLogo from "@/components/GlobalLogo";
import { SideBar_Links } from "@/GlobalLinks";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "./StateProvider";
import { usePathname } from "next/navigation";
import { PageLoadingContext } from "./LoadingPageProvider";


export default function SideBar() {
    const pathname = usePathname();
    const [ActivePage, setActivePage] = useState<string>('');
    const LoadingContext = useContext(PageLoadingContext)
    const setIsPageLoading = LoadingContext?.setIsPageLoading;
    useEffect(() => {
            const currentpath = pathname.split('/seller/')[1] || 'dashboard';
            const pathfounded = SideBar_Links.find((path) => path.label.toLowerCase().replace(' ', '') === currentpath.replace('/', ''));
            if(pathfounded){
                setActivePage(pathfounded.label as string);
                setIsPageLoading(false);
            }
    }, [pathname])

    const MenuContext = useContext(StateContext);
    if (!MenuContext || !LoadingContext) {
        return null;
    }
    const { IsOpen } = MenuContext;

    return (
        <main className={`flex-shrink-0 transition-all duration-200 overflow-hidden 
            sticky top-0 h-screen bg-white shadow-lg border-r border-neutral-300 
            ${IsOpen ? "w-14" : "w-66"}`}>
            <section className="primary-background text-neutral-100 py-1.5 border-b">
                {IsOpen ? (
                    <Link href='/' className="flex justify-center text-2xl font-bold py-2.5">
                        M<h1>H</h1>
                    </Link>
                ) : (
                    <GlobalLogo CLASSNAME="w-full flex justify-center py-2" />
                )}
            </section>
            <ul className="w-full flex flex-col px-2 py-2 space-y-2">
                {SideBar_Links.map((sidelink, index) => {
                    return (
                        <Link 
                            key={index}
                            onClick={() => {
                                setActivePage(sidelink.label)
                                setIsPageLoading(true)
                            }}
                            href={`${sidelink.label !== 'photopea editor' ? "/seller/" : "/"}${sidelink.label === 'dashboard' ? '' : sidelink.label.toLowerCase().replace(' ', '')}`}
                            className={`text-nowrap py-2 flex ${IsOpen ? "px-2" : "px-4"}
                             gap-4 hover:text-black font-semibold 
                             rounded-lg justify-start items-center capitalize
                            ${ActivePage === sidelink.label ? 'primary-background text-white hover:text-white' : 'text-neutral-700'}`}
                            >
                            <sidelink.icon className="flex-shrink-0"/>
                            {sidelink.label}
                        </Link>
                    )
                })}
            </ul>
        </main>
    );
}
