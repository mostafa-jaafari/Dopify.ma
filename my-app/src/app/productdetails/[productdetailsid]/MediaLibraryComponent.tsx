'use client'
import Loading from "@/components/Loading"
import { MLData } from "@/components/MediaLibraryProvider"
import CalculateImageSize from "@/Functions/CalculateImageSize"
import { db } from "Firebase"
import { arrayRemove, doc, updateDoc } from "firebase/firestore"
import { FileX, ImageUp, Paintbrush, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import DraggableImage from "./DraggableImage"


export default function MediaLibraryComponent(){
    // DATA
        const {MediaLibraryData, IsLoadingData} = useContext(MLData);
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
    return (
        <main className="shadow-lg w-max h-full border border-neutral-300 rounded-lg p-4 bg-white overflow-y-scroll no-scrollbar">
            {IsLoadingData ? 
            (
                <div className="w-full flex justify-center">
                    <Loading />
                </div>
            )
            :
            (
                MediaLibraryData.length > 0 ? 
                (
                <section className="w-full grid gap-2 grid-cols-3">
                    {MediaLibraryData.map((image, index) => (
                        <DraggableImage key={index} image={image} index={index} onDelete={HandleDeleteItem} />
                    ))}


                </section>
                ) : (
                <section className="w-full shadow bg-white border border-neutral-200 rounded-lg p-4 space-y-6 py-12">
                <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-3">
                    <FileX size={60} className="text-neutral-400"/>
                    <h1 className="text-2xl font-bold text-neutral-800">
                        No Media, Yet
                    </h1>
                    <p className="para-color">
                        No files yet. You can either upload an already ready design 
                        or 
                        create one using Photopea!
                    </p>
                </div>
                <div className="w-full flex flex-col items-center gap-2">
                    <Link href='/seller/medialibrary'>
                        <button className="flex items-center gap-1 shadow-lg rounded-full 
                            px-4 py-2 text-white font-semibold cursor-pointer 
                            bg-violet-600 hover:bg-violet-600/80">
                                <ImageUp size={20}/> Media Library
                        </button>
                    </Link>
                    {/* ------------- Photopea ------------- */}
                    <Link href='/photopeaeditor'>
                        <button className="flex items-center gap-1 border border-neutral-400 rounded-full 
                            px-4 py-2 text-neutral-700 font-semibold cursor-pointer 
                            hover:bg-neutral-100">
                                <Paintbrush size={20}/> Open Photopea
                        </button>
                    </Link>
                </div>
            </section>
                ))}
        </main>
    )
}