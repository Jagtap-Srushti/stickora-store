import React from "react";
import PageTitle from "./PageTitle";

const About = () => {
  return (
    <div className="min-h-screen bg-normalbg dark:bg-darkbg transition-colors duration-300 relative overflow-hidden selection:bg-primary/20">
      
      {/* High-End Ambient Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 z-0">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute top-[40%] right-[5%] w-96 h-96 bg-light/30 dark:bg-gray-700/40 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1152px] mx-auto px-6 pt-16 pb-28 relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 text-center">
          <PageTitle title="About Us" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 dark:text-light/60 mt-3 font-sans">
            Behind the Brand
          </p>
        </div>

        {/* Hero Narrative Section (Studio Showcase Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 max-w-5xl mx-auto">
          
          {/* Brand Philosophy Context */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-lighter font-sans leading-tight">
              Where Art Meets <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-light dark:to-light/70">
                Sticky Innovation.
              </span>
            </h2>
            
            {/* Boosted contrast slightly for better readability against bright white viewports */}
            <p className="text-base md:text-lg text-gray-700 dark:text-lighter leading-relaxed font-sans font-medium">
              <span className="text-primary dark:text-light font-extrabold font-sans">Stickora</span> store is a proud initiative by{" "}
              <span className="text-primary dark:text-light font-extrabold font-sans">Designs by Srushti</span>. We are entirely dedicated to offering you the most premium, sought-after vinyl stickers and creative posters designed to make an impact!
            </p>
            
            <p className="text-sm md:text-base text-gray-500 dark:text-lighter/60 leading-relaxed font-sans font-medium">
              Whether you are decking out your laptop setup, personalizing your workspace, or hunting down the perfect niche developer reference, every single layout is curated with precision engineering and creative flair.
            </p>
          </div>

          {/* UPGRADED: Realistic Die-Cut Sticker Graphic Presentation */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent dark:from-light/5 blur-xl rounded-3xl" />
            
            {/* Main Window Container */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 bg-white dark:bg-gray-800 border border-light/50 dark:border-border-dark shadow-2xl rounded-[2.5rem] flex items-center justify-center group hover:scale-[1.03] transition-all duration-500">
              
              {/* The Inner "Die-Cut Sticker" with subtle border fold illusion */}
              <div className="relative w-44 h-44 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/[0.02] dark:from-gray-900 dark:to-gray-900/40 border-2 border-primary/20 border-dashed flex flex-col items-center justify-center p-6 text-center shadow-inner group-hover:border-primary/40 transition-colors duration-300">
                
                {/* Brand Visual Anchor */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 shadow-lg shadow-primary/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <span className="text-4xl font-black text-white tracking-tighter select-none font-sans">S!</span>
                </div>
                
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary/70 dark:text-light/70 font-sans mt-4">
                  STICKORA ORIGIN
                </span>
              </div>

              {/* Enhanced 100% Weatherproof dynamic floating badge */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-primary to-indigo-700 dark:from-light dark:to-neutral-200 rounded-full shadow-lg -rotate-12 flex flex-col items-center justify-center p-2 text-white dark:text-darkbg font-extrabold text-[10px] text-center font-sans tracking-tight border-4 border-white dark:border-gray-800">
                <span>100%</span>
                <span className="uppercase text-[8px] tracking-wider opacity-90">Vinyl Craft</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section Divider Layout */}
        <div className="flex items-center gap-4 max-w-5xl mx-auto mb-20">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-light dark:to-border-dark flex-grow" />
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-lighter font-sans tracking-tight shrink-0 px-2">
            The Core Value Pillars
          </h3>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-light dark:to-border-dark flex-grow" />
        </div>

        {/* Staggered Modern Features Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Pillar 01: Premium Quality */}
          <div className="group relative bg-white dark:bg-gray-800 border border-light/40 dark:border-border-dark hover:border-l-primary dark:hover:border-l-light p-8 rounded-2xl shadow-xs hover:shadow-premium transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 overflow-hidden border-l-4 border-l-transparent">
            <div className="absolute right-4 top-2 text-7xl font-black text-neutral-100/70 dark:text-gray-700/20 select-none z-0 font-sans tracking-tighter group-hover:text-primary/5 dark:group-hover:text-light/5 transition-colors">
              01
            </div>
            <div className="relative z-10 flex items-center gap-4 text-primary dark:text-light">
              <div className="p-2.5 bg-primary/5 dark:bg-light/5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-lighter font-sans">Premium Quality</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-lighter/60 leading-relaxed relative z-10 font-sans">
              We strive to provide every customer with the utmost satisfaction by delivering high-quality vinyl stickers crafted with extreme care and digital precision.
            </p>
          </div>

          {/* Pillar 02: Product Innovation */}
          <div className="group relative bg-white dark:bg-gray-800 border border-light/40 dark:border-border-dark hover:border-l-primary dark:hover:border-l-light p-8 rounded-2xl shadow-xs hover:shadow-premium transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 overflow-hidden border-l-4 border-l-transparent">
            <div className="absolute right-4 top-2 text-7xl font-black text-neutral-100/70 dark:text-gray-700/20 select-none z-0 font-sans tracking-tighter group-hover:text-primary/5 dark:group-hover:text-light/5 transition-colors">
              02
            </div>
            <div className="relative z-10 flex items-center gap-4 text-primary dark:text-light">
              <div className="p-2.5 bg-primary/5 dark:bg-light/5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.954-8.955M21 12h0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-lighter font-sans">Product Innovation</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-lighter/60 leading-relaxed relative z-10 font-sans">
              Our vinyl stickers feature a premium matte or glossy finish lamination and advanced adhesive layouts. Weather-resistant and scratch-proof, they peel gently without leaving residue.
            </p>
          </div>

          {/* Pillar 03: Excellent Service */}
          <div className="group relative bg-white dark:bg-gray-800 border border-light/40 dark:border-border-dark hover:border-l-primary dark:hover:border-l-light p-8 rounded-2xl shadow-xs hover:shadow-premium transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 overflow-hidden border-l-4 border-l-transparent">
            <div className="absolute right-4 top-2 text-7xl font-black text-neutral-100/70 dark:text-gray-700/20 select-none z-0 font-sans tracking-tighter group-hover:text-primary/5 dark:group-hover:text-light/5 transition-colors">
              03
            </div>
            <div className="relative z-10 flex items-center gap-4 text-primary dark:text-light">
              <div className="p-2.5 bg-primary/5 dark:bg-light/5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h-2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-2.016-1.354a11.695 11.695 0 01-.319-2.735c0-1.173.173-2.305.495-3.378a2.247 2.247 0 012.018-1.583h.908c.445 0 .72.498.523.898a8.96 8.96 0 00-.31 1.222" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-lighter font-sans">Excellent Service</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-lighter/60 leading-relaxed relative z-10 font-sans">
              Customer satisfaction is our ultimate priority. We are fiercely committed to making sure your ordering, packaging, and shipping experience feels perfect every single time.
            </p>
          </div>

          {/* Pillar 04: Designs You'll Love */}
          <div className="group relative bg-white dark:bg-gray-800 border border-light/40 dark:border-border-dark hover:border-l-primary dark:hover:border-l-light p-8 rounded-2xl shadow-xs hover:shadow-premium transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 overflow-hidden border-l-4 border-l-transparent">
            <div className="absolute right-4 top-2 text-7xl font-black text-neutral-100/70 dark:text-gray-700/20 select-none z-0 font-sans tracking-tighter group-hover:text-primary/5 dark:group-hover:text-light/5 transition-colors">
              04
            </div>
            <div className="relative z-10 flex items-center gap-4 text-primary dark:text-light">
              <div className="p-2.5 bg-primary/5 dark:bg-light/5 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.726 6.726 0 01-3.42-3.42" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-lighter font-sans">Designs You’ll Love</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-lighter/60 leading-relaxed relative z-10 font-sans">
              With an ever-expanding library of over 1,000 unique designs, our stickers cover every style: highly relatable tech references, aesthetic lines, funny memes, and custom art pieces.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;