import Header from "@/components/Header";
import ProcessCard from "@/components/ProcessCard";
import SectionHeader from "@/components/SectionHeader";
import StartButtonCTA from "@/components/StartButtonCTA";
import { Animated_Hero_Cards, PROCESS_CARDS, Product_Card_Details, Users_Images } from "@/GlobalLinks";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import AccordionPage from "@/components/AccordionPage";



export default async function Home() {
  
  return (
    <main className="w-full">
      {/* --------- Header --------- */}
      <Header />
      {/* --------- Hero --------- */}
      <section className="lg:p-20 px-6 py-10 w-full min-h-[90vh] flex lg:flex-row flex-col items-start gap-2">
        <div className="w-full space-y-8">
          <span className="flex w-max py-1 px-4 rounded-full items-center gap-2 bg-[#FF9900] text-white">
            <Star className="fill-[#ffffff]" size={20}/>
            Premium Print on Demand
          </span>
          <h1 className="text-6xl font-bold">
            Turn Your Creativity 
            into Profitable Merch!
          </h1>
          <p className="text-xl para-color-mono">
            Design. Sell. We Print & Ship for You.
          </p>
          <div>
            <StartButtonCTA />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-4">
              {Users_Images.map((image, index) => {
                return (
                  <div key={index} className='relative w-8 h-8 rounded-full shadow bg-neutral-300 overflow-hidden'>
                    <Image src={image} alt="" fill className="object-cover"/>
                  </div>
                )
              })}
            </div>
            <span className="flex gap-2">
              <b className="primary-color">+2,000 </b>
              <p className="para-color">Sellers trust us</p>
            </span>
          </div>
        </div>
        <div className="w-full h-full items-center flex lg:justify-between justify-center gap-2">
          {Animated_Hero_Cards.map((card, index) => {
            const delay = `${index * 4000}ms`;
            return (
              <div key={index} style={{animationDelay: delay}} className="Float-Animation shadow w-44 h-max p-2 overflow-hidden rounded-lg bg-neutral-100">
                <div className={`relative z-20 w-full bg-neutral-200 rounded-lg overflow-hidden ${card.style}`}>
                  <Image src={card.image} alt="" fill className="object-cover"/>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="bg-white/80 backdrop-blur-md p-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{card.title}</p>
                    <p className="text-xs text-gray-600">From {card.price}</p>
                  </div>
                </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {/* --------- Process Section --------- */}
      <section className="relative w-full lg:p-20 px-6 pb-20 space-y-20 flex flex-col items-center">
      {/* <!-- Circle with background color and opacity at the bottom --> */}
        {/* <div className="absolute -z-10 -bottom-10 left-1/4 w-1/2 h-20 bg-gradient-to-r from-violet-100 to-violet-600 shadow-lg shadow-violet-600 opacity-80 blur-2xl"></div> */}
          <SectionHeader 
            TITLE="Start Selling in 3 Simple Steps!" 
            SUBTITLE="Our streamlined process makes it easy to turn your creativity into a profitable business" />
          <div className="w-full flex flex-wrap justify-between gap-8">
            {PROCESS_CARDS.map((card, index) => {
              return (
                <ProcessCard 
                  key={index}
                  TITLE={card.title}
                  DESCRIPTION={card.description}
                  IMAGE={card.image}
                  />
              )
            })}
          </div>
          <StartButtonCTA />
      </section>
      {/* --------- According Section --------- */}
      <section className="w-full lg:p-20 pb-20 px-6 space-y-20 flex flex-col items-center">
            <SectionHeader TITLE="Why you should choose us ?"/>
            <AccordionPage />
      </section>
      {/* --------- Products Cards Exemples --------- */}
      <section className="w-full flex flex-col items-center lg:p-20 px-6 pb-20 space-y-20">
        <SectionHeader TITLE="Our Best-Selling Products"/>
        <div className="w-full flex flex-wrap justify-center gap-4">
          {Product_Card_Details.map((product, index) => {
            return (
              <div key={index} className="p-2 w-[350px] max-w-[450px] grow rounded-lg bg-neutral-100 shadow-lg shadow border border-neutral-300">
                  <div className="relative lg:w-full h-[300px] rounded-lg overflow-hidden">
                      <Image src={product.image} alt="" fill className='object-cover hover:scale-110 transition-all'/>
                  </div>
                  <div>
                      <span>
                          <h1 className="text-xl font-bold py-2">
                              {product.title}
                          </h1>
                          <span className="w-full flex gap-1 flex-wrap">
                              {product.categorie.map((categorie, i) => {
                                return (
                                  <div key={i}>
                                    <Link href='/' 
                                      className="text-nowrap bg-[#FF990049] text-[#FF9900] px-2 cursor-pointer hover:underline font-semibold rounded w-max">
                                        #{categorie}
                                    </Link>
                                    <span className="text-neutral-500">
                                      {product.categorie.length > 1 && ' •'}
                                    </span>
                                  </div>
                                )
                              })}
                          </span>
                      </span>
                      <button className="text-center w-full primary-button mt-2
                      font-semibold text-xl cursor-pointer">
                        Custimize Now
                      </button>
                  </div>
              </div>
            )
          })}
        </div>
        <StartButtonCTA />
      </section>
      {/* --------- Testimonials Section --------- */}
      <section className="lg:p-20 px-6 py-20 relative bg-violet-100 flex flex-col items-center w-full overflow-hidden space-y-20">
        <SectionHeader TITLE="Customer Testimonials"/>
        <Testimonials />
      </section>
      {/* --------- encourage sign-ups --------- */}
      <section className="w-full bg-violet-100 border-b 
        border-neutral-200 px-20 py-10 flex flex-col 
        items-center text-center space-y-8">
        <p className="para-color-mono text-xl">
          Start now and unlock endless possibilities.
        </p>
        <h1 className="text-2xl text-neutral-700 font-bold capitalize">
          Ready to Start Your Selling Journey?
        </h1>
        <StartButtonCTA />
      </section>
      <footer className="w-full flex flex-col items-center py-4">
        &copy; 2025 All Rights Reserved By MerchHub
      </footer>
    </main>
  );
}
