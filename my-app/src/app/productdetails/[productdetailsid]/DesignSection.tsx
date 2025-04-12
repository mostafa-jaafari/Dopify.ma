'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";

export default function DesignSection({ PRODUCTID }) {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        const raw = localStorage.getItem("Template-Products");
        if (raw) {
            try {
                const templates = JSON.parse(raw);
                const selected = templates.find((product) => product.id.toString() === PRODUCTID.toString());
                setSelectedTemplate(selected);
            } catch (error) {
                console.error("Failed to parse localStorage:", error);
            }finally{
                setIsLoading(false)
            }
        }
    }, [PRODUCTID]);


    return (
        <main className="grow">
            <section className="w-full flex flex-col items-center">
                {IsLoading ? 
                (
                    <div className="grow min-h-50 flex justify-center items-center">
                        <Loading />
                    </div>
                ) 
                : 
                (
                    <div className="relative w-[450px] h-[450px] rounded-lg border border-neutral-200 overflow-hidden shadow-lg">
                        <Image src={selectedTemplate.image} alt="" fill className="object-cover" />
                    </div>
                )}
            </section>
        </main>
    );
}
