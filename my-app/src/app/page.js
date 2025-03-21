import Link from "next/link";
import { ArrowRight, Banknote, Star, TrendingUp, UsersRound, Video } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-[200vh]">
      <section className="p-20 w-full flex justify-between">
        <div className="space-y-8">
          <h1 className="text-6xl">
            Launch your eCommerce brand in Morocco today!
          </h1>
          <p>
            It's simple and accessible—even if you have no stock, 
            no capital, and no experience. Bring your entrepreneurial 
            project to life with Todify, your expert partner in branding, 
            technology, and innovation.
          </p>
          <div className="flex space-x-4">
            <Link className="py-2 px-4 rounded border border-neutral-700 bg-neutral-900 flex items-center gap-1" href='/'>Get Started <ArrowRight size={20} /></Link>
            <Link className="py-2 px-4 rounded border border-neutral-400 bg-[#006fff] flex items-center gap-1" href='/'>See Our Process <Video size={20} /></Link>
          </div>
          <div className="relative border-t border-neutral-700">
              <p className="absolute -top-3 bg-[#0a0a0a] text-[#006fff] font-semibold pr-2">Effortless Growth</p>
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
        <div className="relative flex-shrink-0 w-[400px] h-[400px] rounded-lg border-2 border-neutral-700">
          <Image src='https://d2vw8tvocudf9g.cloudfront.net/assets/images/sell-your-tshirt-todify.png' fill alt='' className='object-cover'/>
        </div>
      </section>
    </main>
  );
}
