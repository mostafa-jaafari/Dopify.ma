'use client';
import Loading from "@/components/Loading";
import { MLData } from "@/components/MediaLibraryProvider";
import CalculateImageSize from "@/Functions/CalculateImageSize";
import { db } from "Firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FileX, ImageUp, Infinity, Info, Paintbrush, Timer, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import LookingManImage from '../../../../../public/A man looking for something.png';
import UploadBtn from "@/components/UploadBtn";


export default function MediaLibraryPage(){
    // Current user
    const session = useSession();
    const Current_Email = session?.data?.user?.email;

    // Delete item from the Array of Media Library
    const HandleDeleteItem = async (index) => {
        const DocRef = doc(db, 'users', Current_Email);
        const ItemToRemove = MediaLibraryData[index];
        await updateDoc(DocRef, {
            medialibrary: arrayRemove(ItemToRemove)
        })
    }
    // DATA
    const {MediaLibraryData, IsLoadingData} = useContext(MLData);
    return (
        <main className="space-y-8">
            <section className="w-full flex justify-between items-start">
                <h1 className="primary-color text-2xl font-semibold">
                    Media Library
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <UploadBtn buttonText="Upload Media"/>
                    <span className="para-color text-sm flex items-center gap-1">
                        <Info size={16} className="primary-color"/> Accepted File Types: JPEG, JPG, PNG
                    </span>
                </div>
            </section>
            {MediaLibraryData.length > 0 && (
                <span className="flex gap-1 -mb-0">
                    {MediaLibraryData.length} /<Infinity />
                </span>
            )}
            {IsLoadingData ? (
                <div className="w-full min-h-50 border border-neutral-300 
                shadow-lg rounded-lg bg-white flex justify-center items-center">
                    <Loading />
                </div>
            ) :
            MediaLibraryData.length > 0 ? 
            (
                <section className="w-full flex gap-4 bg-white border border-neutral-300 shadow-lg rounded-lg p-4">
                    {IsLoadingData ? 'Loading...' : 
                    (MediaLibraryData.map((image, index) => {
                        return (
                            <div key={index} className="w-max h-max">
                                <div className="relative shadow overflow-hidden w-[90px] h-[90px] border border-neutral-400 rounded-lg">
                                    <Image src={image} alt="" fill className="object-cover"/>
                                    <X onClick={() => HandleDeleteItem(index)} size={16} className="bg-red-600 hover:bg-red-500 cursor-pointer rounded-full text-white absolute right-1 top-1" />
                                </div>
                                <CalculateImageSize IMAGESELECTED={image}/>
                            </div>
                        )
                    }))}
                </section>
            ) : (
            <section className="w-full bg-white border border-neutral-300 shadow-lg rounded-lg space-y-6 py-6">
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                    <Image src={LookingManImage} alt="" width={200}/>
                    <h1 className="text-2xl font-bold text-neutral-600 flex items-center gap-1">
                        Your Library Is Waiting<Timer />
                    </h1>
                    <p className="para-color">
                    Ready to turn your ideas into visuals?
                    Upload your media or create your first design now.
                    </p>
                </div>
                <div className="w-full flex justify-center gap-2">
                    <Link href='/photopeaeditor'>
                        <button className="flex items-center gap-1 border border-neutral-400 rounded-full 
                            px-4 py-2 text-neutral-700 font-semibold cursor-pointer 
                            hover:bg-neutral-100">
                                <Paintbrush size={20}/> Open Photopea
                        </button>
                    </Link>
                    <UploadBtn  buttonText="Upload Media"/>
                </div>
            </section>
            )}
        </main>
    )
}