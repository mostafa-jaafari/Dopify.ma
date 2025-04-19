'use client';

import Loading from "@/components/Loading";
import CalculateImageSize from "@/Functions/CalculateImageSize";
import { db } from "Firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";




export default function TemplatesTab({HandleDragStart}){
    const [SearchInput, setSearchInput] = useState("");

    const [TemplatesData, setTemplatesData] = useState([]);
    const [IsLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if(TemplatesData.length === 0){
            const fetchData = async () => {
                const DocRef = doc(db, 'DopifyData', 'designstemplates');
                const DocSnap = (await getDoc(DocRef));
                const data = DocSnap.data();
                if (data && Array.isArray(data.templates)) {
                    setTemplatesData(data.templates);
                } else {
                    setTemplatesData([]);
                }
            }
            fetchData();
            setIsLoadingData(false);
        }
    }, [])
    const FiltredSearchTemplate = TemplatesData?.filter((temp) => temp.tags.toLowerCase().includes(SearchInput.toLowerCase()))
    return (
        <main className="w-full h-full overflow-y-scroll no-scrollbar">
            <div className="sticky top-0 bg-white px-6 py-2 shadow border-b border-neutral-200">
                <input 
                    value={SearchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text" 
                    placeholder="serarch designs here..."
                    className="border outline-none focus:shadow border-neutral-300 rounded-lg px-4 py-2 w-full"
                    />
            </div>
            <section className="w-full flex gap-2 mt-2 px-6">
                {IsLoadingData ? (
                    <div className="w-full py-20 flex justify-center items-center">
                        <Loading />
                    </div>
                ) 
                : 
                FiltredSearchTemplate.length > 0 && 
                FiltredSearchTemplate?.map((design, index) => {
                    return (
                        <section 
                            key={index}
                            className="">
                            <div 
                                draggable
                                onDragStart={(e) => HandleDragStart(e, design.design)}
                                className="relative cursor-grab overflow-hidden 
                                            w-20 h-20 rounded-lg border border-neutral-400 
                                            hover:shadow-lg hover:scale-105 transition-all duration-200">
                                <Image 
                                    src={design.design} 
                                    alt="" 
                                    fill 
                                    className="object-cover" 
                                    />
                            </div>
                            <CalculateImageSize IMAGESELECTED={design} />
                        </section>
                    )
                })}
            </section>
        </main>
    )
}