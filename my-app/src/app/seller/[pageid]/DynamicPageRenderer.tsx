'use client';
import { useContext } from "react";
import MediaLibraryPage from "./Pages/MediaLibraryPage";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import TemplatePage from "./Pages/TemplatePage";
import { PageLoadingContext } from "../LoadingPageProvider";
import Loading from "@/components/Loading";


export default function DynamicPageRenderer({pageid}){
    const PARAMS_ID = pageid as string;
    const PAGE_ID = PARAMS_ID.toLocaleLowerCase().replace(' ', '');
    
    const LoadingContext = useContext(PageLoadingContext);
    const IsPageLoading = LoadingContext?.IsPageLoading;
    
    if(IsPageLoading) return <section className="w-full h-150 flex items-center justify-center"><Loading /></section>

    switch (PAGE_ID) {
        case 'profile':
            return (
                <main className="p-8 w-full min-h-screen">
                    <ProfilePage />
                </main>
            )
        case 'mytemplates':
            return (
                <main className="p-8 w-full min-h-screen">
                    <TemplatePage />
                </main>
            )
        case 'products':
            return (
                <main className="p-8 w-full min-h-screen">
                    <ProductsPage />
                </main>
            )
        case 'products/details':
            return (
                <main className="p-8 w-full min-h-screen">
                    Product details page
                </main>
            )
        case 'medialibrary':
            return (
                <main className="p-8 w-full">
                    <MediaLibraryPage />
                </main>
            )
        default:
            return (
                <main>
                    Not Founded Page
                </main>
            )
    }
}