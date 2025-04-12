'use client';
import { FileX, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function TemplatePage(){
    const [storedData, setStoredData] = useState<any[]>(() => {
        const savedTemplates = localStorage.getItem("Template-Products");
        return savedTemplates ? JSON.parse(savedTemplates) : [];
    });
    useEffect(() => {
        const savedTemplates = localStorage.getItem("Template-Products");
        if (savedTemplates) {
            setStoredData(JSON.parse(savedTemplates));
        }
    }, []);
    const Handle_Delete_Template = (product: any) => {
        const RemoveProduct = storedData.filter((item) => item.id !== product.id);
        setStoredData(RemoveProduct);
        localStorage.setItem("Template-Products", JSON.stringify(RemoveProduct));
    }
    return (
        <main className="w-full space-y-8">
            <section className="w-full flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    My Templates
                </h1>
                <Link href='/seller/products' 
                    className="text-xl font-semibold primary-button">
                    New
                </Link>
            </section>
            {storedData.length > 0 ? 
            (
                <section className="w-full grid gap-2 grid-cols-3">
                {storedData.map((product, index) => {
                    return (
                        <section 
                            key={index}
                            className="group border border-neutral-200 rounded-lg bg-white
                            p-2"
                        >
                            <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg">
                                <Image loading="lazy" src={product.image} fill alt="" className="object-cover hover:scale-110 transition-all"></Image>
                                <span onClick={() => Handle_Delete_Template(product)} className="absolute right-2 top-2 cursor-pointer scale-0 opacity-0 
                                    group-hover:opacity-100 group-hover:scale-100 origin-right-top 
                                    transition-all duration-200 text-white font-semibold text-sm 
                                    flex rounded bg-red-500 hover:bg-red-700 p-1 z-40">
                                    <Trash size={20}/>Remove
                                </span>
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
                            <Link href={`/productdetails/${product.id}`}>
                                <button
                                    className='w-full font-semibold
                                    primary-button'
                                    >
                                    Custimize Now
                                </button>
                            </Link>
                        </section>
                    )
                })}
                </section>
            )
            :
            (
            <section className="flex flex-col items-center space-y-4 
                border border-neutral-200 bg-white rounded-lg p-8">
                <FileX size={80} className="text-neutral-300" />
                <h1 className="font-semibold text-3xl">
                    No Templates Found
                </h1>
                <p className="text-neutral-500 text-xl">
                    It looks like you don&apos;t have any 
                    templates yet or none match your current filters.
                </p>
            </section>
            )
        }
        </main>
    )
}