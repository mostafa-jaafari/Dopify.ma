import type { Metadata } from "next";
import "../globals.css";
import SideBar from "./SideBar";
import SellerHeader from "./SellerHeader";
import { StateProvider } from "./StateProvider";
import { LoadingPageProvider } from "./LoadingPageProvider";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <StateProvider>
      <LoadingPageProvider>
        <main className="w-full flex">
          <SideBar />
          <section className="w-full">
            <SellerHeader />
            {children}
          </section>
        </main>
      </LoadingPageProvider>
    </StateProvider>
  );
}