import Link from "next/link";
import { ArrowRight, Banknote, Star, TrendingUp, UsersRound, Video } from "lucide-react";
import Image from "next/image";
import UICollectionCard from "./components/UICollectionCard";
import { Process_Cards } from "@/Links/ProcessCards";
import { Collaborators } from "@/Links/Collaborators";
// import { fetchProducts } from "./api/products";


export default async function Home() {

  // const ProductsData = await fetchProducts();
  return (
    <main className="min-h-[200vh]">
      <section className="lg:px-20 py-20 w-full flex justify-between bg-neutral-200">
        <div className="space-y-8">
          <h1 className="text-6xl font-bold">
            Launch your eCommerce <span className="text-blue-600">brand </span>
            in Morocco today!
          </h1>
          <p className="font-semibold text-neutral-700">
            It's simple and accessible—even if you have no stock, 
            no capital, and no experience. Bring your entrepreneurial 
            project to life with Todify, your expert partner in branding, 
            technology, and innovation.
          </p>
          <div className="flex space-x-4 text-neutral-200 font-semibold">
            <Link className="py-3 px-4 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center gap-1" href='/'>Get Started <ArrowRight size={20} /></Link>
            <Link className="py-3 px-4 rounded bg-neutral-600 flex items-center gap-1" href='/'>See Our Process <Video size={20} /></Link>
          </div>
          <div className="relative border-t border-blue-600 border-dashed">
              <p className="absolute -top-3 bg-neutral-200 text-[#006fff] font-semibold pr-2">Effortless Growth</p>
              <div className="pt-8 w-full grid grid-cols-2 gap-y-2">
                {/* --------- Zero inventory costs --------- */}
                <span className="flex items-center gap-2">
                  <div className="p-1 bg-[#006eff20] text-[#006fff] rounded-full">
                    <Banknote size={25}/>
                  </div>
                  <p className="text-md">Zero inventory costs</p>
                </span>

                {/* --------- Premium products --------- */}
                <span className="flex items-center gap-2">
                  <div className="p-1 bg-[#006eff20] text-[#006fff] rounded-full">
                    <Star size={25}/>
                  </div>
                  <p className="text-md">Premium products</p>
                </span>

                {/* --------- Scale Smarter --------- */}
                <span className="flex items-center gap-2">
                  <div className="p-1 bg-[#006eff20] text-[#006fff] rounded-full">
                    <TrendingUp size={25}/>
                  </div>
                  <p className="text-md">Scale Smarter</p>
                </span>

                {/* --------- Community that inspires you --------- */}
                <span className="flex items-center gap-2">
                  <div className="p-1 bg-[#006eff20] text-[#006fff] rounded-full">
                    <UsersRound size={25}/>
                  </div>
                  <p className="text-md">Community that inspires you</p>
                </span>

              </div>
          </div>
        </div>
        <div className="relative flex-shrink-0 w-[400px] h-[400px] rounded-lg border-2 border-blue-600 border-dashed">
          <Image loading="lazy" src='https://d2vw8tvocudf9g.cloudfront.net/assets/images/sell-your-tshirt-todify.png' fill alt='' className='object-cover'/>
        </div>
      </section>
      <section className="lg:px-20 flex flex-col items-center gap-20 py-20">
        <div className="w-full flex flex-col items-center text-center lg:w-2/3 space-y-8">
          <h1 className="text-4xl font-bold">
            Sell and Grow Your Business
          </h1>
          <p className="text-neutral-700 text-[18px]">
            Add your creations to your online store or social media platforms, 
            set your prices, and maximize your profits. We handle production, 
            preparation, and logistics—delivering your products directly under 
            your brand while you focus on expanding your business.
          </p>
          <hr className="w-30 border-2 border-blue-600 rounded"/>
        </div>
        <section className="w-full flex justify-between flex-wrap gap-4">
          {Process_Cards.map((card, index) => {
            return (
              <div 
                key={index} 
                className="w-[320px] rounded-lg overflow-hidden shadow-lg bg-neutral-100">
                  <div className="relative w-full h-[320px] overflow-hidden bg-blue-600">
                    <Image loading="lazy" src={card?.image} alt="" fill className="object-cover"/>
                  </div>
                  <div className="p-6 text-center space-y-2">
                    <h1 className="text-2xl font-semibold">
                      {card?.title}
                    </h1>
                    <p className="text-neutral-600 text-md">
                      {card?.description}
                    </p>
                  </div>
              </div>
            )
          })}
        </section>
      </section>
        <section className="lg:px-20 bg-neutral-200 py-20">
          <div className="space-y-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold">
              Who Can Work With Us?
            </h1>
            <p className="text-[20px]">
              Empowering creators, entrepreneurs, and visionaries to 
              bring their ideas to life with precision and elegance
            </p>
            <hr className="w-30 border-2 border-blue-600 rounded"/>
          </div>
          <div className="py-20 flex flex-wrap justify-between gap-4">
            {Collaborators.map((collaborator, index) => {
              return (
                <div 
                  key={index} 
                  className="group hover:-translate-y-2 transition-all duration-300 w-[250px] text-center flex flex-col justify-center gap-6 items-center py-8 px-4 overflow-hidden bg-neutral-100 rounded-lg shadow-lg">
                  <div className="relative w-25 h-25 rounded-full overflow-hidden group-hover:shadow-2xl border border-neutral-400 bg-neutral-300">
                    <Image loading="lazy" src={collaborator?.image} alt="" fill className="object-cover group-hover:scale-110 transition-all duration-300"/>
                  </div>
                  <div className="space-y-1">
                    <h1 className="group-hover:text-blue-600 text-xl font-semibold">
                      {collaborator?.title}
                    </h1>
                    <p className="text-sm text-neutral-700">
                      {collaborator?.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        {/* -------------- Premium Part ------------- */}
        <section className="w-full py-20 lg:px-20">
        <div className="space-y-8 flex flex-col items-center">            
            <span className="text-blue-600 flex items-center gap-2 bg-[#2564eb40] py-1 px-4 rounded-full">
              <Star size={14} className="fill-blue-600"/>
              <p>
                Premium Collection
              </p>
            </span>
            <h1 className="text-5xl font-bold">
              Discover Our <span className="text-blue-600"> Premium Products</span>
            </h1>
            <p className="text-[20px]">
              Explore our diverse range of high-quality customizable 
              products designed to bring your creative vision to life
            </p>
            <hr className="w-30 border-2 border-blue-600 rounded"/>
          </div>
          <section className="py-20 w-full flex flex-wrap justify-between gap-8">
            <UICollectionCard />
            <UICollectionCard />
            <UICollectionCard />
            <UICollectionCard />
            <UICollectionCard />
            <UICollectionCard />
          </section>
        </section>
    </main>
  );
}
