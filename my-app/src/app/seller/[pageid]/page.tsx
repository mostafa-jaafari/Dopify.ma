import MediaLibraryPage from "./Pages/MediaLibraryPage";
import ProductsPage from "./Pages/ProductsPage";
import ProfilePage from "./Pages/ProfilePage";
import TemplatePage from "./Pages/TemplatePage";


export default function page({params}){
    const PARAMS_ID = params.pageid as string;
    const PAGE_ID = PARAMS_ID.toLocaleLowerCase().replace(' ', '');
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