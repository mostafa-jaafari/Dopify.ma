import Link from "next/link";
import GlobalLogo from "./GlobalLogo";
import Image from "next/image";
import { SignOut } from "../Buttons/AuthButtons";
import { User_Links } from "@/GlobalLinks";
import { auth } from "@/auth";


export default async function Header(){
    const session = await auth();
    return (
        <main className="relative w-full border-b border-neutral-200 bg-[#FCFCFF] sticky top-0 z-50 flex items-center justify-between py-3 lg:px-20 px-6">
            <GlobalLogo CLASSNAME="primary-color"/>
            {/* ---- */}
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
                            <p className="text-sm text-neutral-500">{session.user?.id || '123456789987654321'}</p>
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
        </main>
    )
}