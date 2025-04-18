import { Info } from "lucide-react";
import ImageBackground from '../../../../public/Pattern_Background.webp';
import DragDropWrapper from "./DragDropWrapper";

export default async function page({params}){
    const ProductId = params.productdetailsid;

    return (
        <main 
            style={{ backgroundImage: `url(${ImageBackground.src})` }}
            className="w-full min-h-screen flex flex-col items-center">
            <section className="w-full flex items-center justify-between 
            py-2 px-20 border-b border-neutral-200 bg-white">
                <h1>
                    Logo
                </h1>
                <div className="space-x-2">
                    <button className="w-max py-1 text-[18px] px-4 rounded cursor-pointer border border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold">cancel</button>
                    <button className="w-max py-1 text-[18px] px-4 rounded cursor-pointer bg-violet-600 hover:bg-violet-500 text-white font-semibold">Save</button>
                </div>
            </section>
            <div className="w-max my-2 px-6 py-2 flex items-center gap-2 
                rounded-full shadow text-sm bg-orange-200/90 border 
                border-orange-200 text-neutral-600">
                <Info size={18}/>
                Make sure your design is at least 150 DPI and has a resolution of 
                3000 pixels or more for the best printing results.
            </div>
            {/* ------------------  ------------------ */}
            <section className="w-full flex gap-4 py-10 px-20">
                <DragDropWrapper ProductId={ProductId}/>
            </section>
        </main>
    )
}