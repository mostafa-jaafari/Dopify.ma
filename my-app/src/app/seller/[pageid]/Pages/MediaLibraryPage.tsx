'use client';
import Loading from "@/components/Loading";
import { MLData } from "@/components/MediaLibraryProvider";
import CalculateImageSize from "@/Functions/CalculateImageSize";
import { db } from "Firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FileX, ImageUp, Info, Paintbrush, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";


const UploadBTN = ({HandleChooseFile}) => {
    return (
        <label htmlFor="Upload-Image" onChange={HandleChooseFile} className="bg-blue-600/10 border border-dashed border-blue-500 rounded-full 
            px-4 py-2 primary-color font-semibold cursor-pointer hover:bg-blue-600/20 flex items-center gap-2">
            <input type="file" name="" id="Upload-Image" className="hidden"/>
            <ImageUp size={20}/> Upload Media
        </label>
    )
}
export default function MediaLibraryPage(){
    // Current user
    const session = useSession();
    const Current_Email = session?.data?.user?.email;
    // State for the Image That will deploy to Cloudinary then Firestore
    const [SelectedFile, setSelectedFile] = useState(null);
    // State for a Preview Image
    const [ImagePreview, setImagePreview] = useState(null);
    // The loading to Deploy on Cloudinary
    const [IsLoading, setIsLoading] = useState(false);
    // the change event to choose the file
    const HandleChooseFile = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
            const URLImage = URL.createObjectURL(file);
            setImagePreview(URLImage);
        }
    }
    // Clean the Preview Image after change the file
    useEffect(() => {
        return () => {
            if(ImagePreview){
                URL.revokeObjectURL(ImagePreview);
            }
        }
    }, [ImagePreview])
    // Cancel choosing file
    const HandleCancelImport = () => {
        setSelectedFile(null)
        setImagePreview(null);
    }
    
    // Import the file choosen from the user to the cloudinary then to firestore
    const HandleSaveImport = async () => {
        const formData = new FormData();
        formData.append("file", SelectedFile);
        formData.append("upload_preset", "Dopify.ma");
        formData.append("cloud_name", "dipa1pgem");
        const DocRef = doc(db, 'users', Current_Email);
        try{
            setIsLoading(true)
            const response = await fetch("https://api.cloudinary.com/v1_1/dipa1pgem/image/upload", {
                method: "POST",
                body: formData,
              });
        
            const data = await response.json();
            await updateDoc(DocRef, {
                medialibrary: arrayUnion(data.secure_url)
            })
        }catch(error){
            console.log(error)
        }finally{
            setImagePreview(null);
            setIsLoading(false);
        }
    }

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
                    <UploadBTN HandleChooseFile={HandleChooseFile}/>
                    <span className="para-color text-sm flex items-center gap-1">
                        <Info size={16} className="primary-color"/> Accepted File Types: JPEG, JPG, PNG
                    </span>
                </div>
            </section>
            {IsLoadingData ? (
                <div className="w-full min-h-50 flex justify-center items-center">
                    <Loading />
                </div>
            ) :
            MediaLibraryData.length > 0 ? 
            (
                <section className="w-full flex gap-4 bg-white border border-neutral-200 rounded-lg p-4">
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
            <section className="w-full bg-white border border-neutral-200 rounded-lg p-4 space-y-6 py-12">
                <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                    <FileX size={60} className="text-neutral-400"/>
                    <h1 className="text-2xl font-bold text-neutral-600">
                        No Media, Yet
                    </h1>
                    <p className="para-color">
                        No files yet. You can either upload an already ready design 
                        or 
                        create one using Photopea!
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
                    <UploadBTN HandleChooseFile={HandleChooseFile}/>
                </div>
            </section>
            )}
            {ImagePreview !== null && (
                <section className="absolute w-full h-screen bg-violet-500/40 left-0 top-0 z-30 
                    flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg border border-neutral-200">
                        <div className="relative w-[350px] h-[350px] overflow-hidden rounded-lg border border-neutral-200 shadow">
                            <Image src={ImagePreview} alt="" fill className="object-cover"/>
                        </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <button onClick={HandleCancelImport} className="py-1 px-4 cursor-pointer rounded-lg border bg-neutral-100 border-neutral-300 shadow">cancel</button>
                        <button 
                            disabled={IsLoading} 
                            onClick={HandleSaveImport} 
                            className={`py-1 px-4 cursor-pointer rounded-lg border 
                            text-white font-semibold ${IsLoading ? "bg-violet-600/50" : "bg-violet-600"}`}>
                                import
                            </button>
                    </div>
                    </div>
                </section>
            )}
        </main>
    )
}