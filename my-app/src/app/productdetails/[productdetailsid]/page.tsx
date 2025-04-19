import ImageBackground from '../../../../public/Pattern_Background.webp';
import DragDropWrapper from "./DragDropWrapper";

export default async function page({params}){
    const ProductId = params.productdetailsid;

    return (
        <main 
            style={{ backgroundImage: `url(${ImageBackground.src})` }}
            className="w-full min-h-screen flex flex-col items-center">
            {/* ------------------  ------------------ */}
            <section className="w-full">
                <DragDropWrapper ProductId={ProductId}/>
            </section>
        </main>
    )
}