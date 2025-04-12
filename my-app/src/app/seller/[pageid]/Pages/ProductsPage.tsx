'use client';
import { Test_Products } from "@/GlobalLinks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsPage(){
    const [storedData, setStoredData] = useState<any[]>([]);

    useEffect(() => {
        const savedTemplates = localStorage.getItem("Template-Products");
        if (savedTemplates) {
            setStoredData(JSON.parse(savedTemplates));
        }
    }, []);

    const Handle_Add_Template = (product: any) => {
        const exists = storedData.some((item) => item.id === product.id);

        let updatedData;
        if (exists) {
            // Remove product if it already exists
            updatedData = storedData.filter((item) => item.id !== product.id);
        } else {
            // Add new product if not exists
            updatedData = [...storedData, product];
        }

        setStoredData(updatedData);
        localStorage.setItem("Template-Products", JSON.stringify(updatedData));
    };

    return (
        <main className="rounded-lg grid grid-cols-3 gap-2">
            {Test_Products.map((product, index) => {
                const IsExists = storedData.some((item) => item.id === product.id);
                return (
                    <section 
                        key={index}
                        className="border border-neutral-200 rounded-lg bg-white
                        p-2"
                    >
                        <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg">
                            <Image loading="lazy" src={product.image} fill alt="" className="object-cover hover:scale-110 transition-all"></Image>
                        </div>
                        <div className="p-2 space-y-2">
                            <h1 className="text-xl font-semibold">
                                {product.name}
                            </h1>
                            <p className="text-sm para-color">
                                {product.description}
                            </p>
                            <span className="flex justify-between items-center">
                                <ins className="no-underline">
                                    {product.price}$
                                </ins>
                                <p className="text-sm text-[#FF9900] cursor-pointer underline font-semibold">
                                    {product.category}
                                </p>
                            </span>
                        </div>
                        <button 
                            onClick={() => Handle_Add_Template(product)}
                            className={`w-full font-semibold
                            ${IsExists ? 'bg-red-700 hover:bg-red-600 py-2 cursor-pointer rounded text-white' 
                            :
                            'primary-button text-md'}`}
                        >
                            {IsExists ? "Remove From My Template" : "Add To My Template"}
                        </button>
                    </section>
                )
            })}
        </main>
    )
}