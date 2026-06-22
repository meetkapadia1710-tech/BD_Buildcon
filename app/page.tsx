'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BDLogo } from '@/components/layout/BDLogo';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax offsets
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen w-full font-sans text-neutral-200 overflow-x-hidden selection:bg-[#16A8B8] selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <BDLogo light={false} className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase font-semibold text-neutral-400">
            <a href="#about" className="hover:text-[#16A8B8] transition-colors">About</a>
            <a href="#services" className="hover:text-[#16A8B8] transition-colors">Services</a>
            <a href="#infrastructure" className="hover:text-[#16A8B8] transition-colors">Infrastructure</a>
            <a href="#clients" className="hover:text-[#16A8B8] transition-colors">Clients</a>
          </nav>
          <button className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#16A8B8] hover:text-white transition-all duration-300">
            Contact Us
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <Image 
            src="/photos/img_0_0.png" 
            alt="Hero Construction Background" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#16A8B8] font-bold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Formerly Bhumi Developers
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            Building Industrial <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600">Futures.</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <p className="text-neutral-400 text-lg font-light max-w-2xl">
              Turnkey Industrial EPC Contractor specialised in Civil, Mechanical, PEB & Piling across India.
            </p>
          </motion.div>
        </div>

      {/* ── Sector Marquee ── */}
      <section
        className="bg-surface border-b border-hairline py-4 overflow-hidden"
        aria-label="Sectors we serve"
      >
        <div className="flex">
          <div className="flex gap-10 animate-marquee whitespace-nowrap pr-10">
            {sectors.map((s, i) => (
              <span key={i} className="flex items-center gap-10 font-body text-label-md text-body uppercase tracking-widest">
                {s}
                {i < sectors.length - 1 && (
                  <span className="text-teal text-xl" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ── */}
      <BlueprintReveal>
      <section className="section-pad bg-white" aria-label="Services overview">
        <div className="container-max">
          <SectionHeading
            title="What We Build"
            subtitle="Precision engineering and robust construction across specialised industrial disciplines."
          />
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-card bg-dark-bg cursor-pointer"
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-headline-sm text-white mb-2">{svc.shortTitle}</h3>
                  <p className="font-body text-body-md text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {svc.description.slice(0, 80)}…
                  </p>
                </div>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>
      </BlueprintReveal>

      {/* ── Pillars Band ── */}
      <section className="bg-surface border-y border-hairline py-20" aria-label="Company pillars">
        <div className="container-max">
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-display text-headline-sm text-ink">{p.title}</h3>
                <p className="font-body text-body-md text-body">{p.body}</p>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* ── Construction Draw ── */}
      <section className="bg-dark-bg py-20 lg:py-28 overflow-hidden" aria-label="Our construction process">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* SVG structural frame */}
            <FadeRiseItem>
              <ConstructionDraw className="w-full max-w-lg mx-auto text-teal opacity-90" />
            </FadeRiseItem>

            {/* Text */}
            <div>
              <FadeRiseItem>
                <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4">
                  How We Build
                </span>
                <h2 className="font-display text-headline-lg text-white leading-snug mb-6">
                  Every structure starts with a precise drawing.
                </h2>
              </FadeRiseItem>
              <FadeRiseItem delay={0.1}>
                <div className="space-y-4 font-body text-body-lg text-white/60 leading-relaxed mb-8">
                  <p>
                    From foundation to roof, each phase of an EPC project follows a
                    carefully engineered sequence — structural steel, floor slabs, bracing
                    systems and crane logistics planned before a single bolt is tightened.
                  </p>
                  <p>
                    Our in-house design and execution teams work from the same drawing set,
                    eliminating the coordination gaps that delay lesser contractors.
                  </p>
                </div>
              </FadeRiseItem>
              <FadeRiseItem delay={0.15}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { phase: '01', title: 'Design & Plan' },
                    { phase: '02', title: 'Fabricate & Build' },
                    { phase: '03', title: 'Commission' },
                  ].map((step) => (
                    <div key={step.phase} className="border border-teal/20 rounded-card p-4 hover:border-teal/50 transition-colors">
                      <div className="font-body text-teal text-[10px] uppercase tracking-widest mb-1">{step.phase}</div>
                      <div className="font-display text-white text-body-md font-semibold">{step.title}</div>
                    </div>
                  ))}
                </div>
              </FadeRiseItem>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-pad bg-white" aria-label="Featured projects">
        <div className="container-max">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading title="Featured Projects" centered={false} className="mb-0" />
            <Link href="/projects" className="hidden sm:flex items-center gap-2 font-body text-label-md text-teal uppercase tracking-wider hover:gap-3 transition-all">
              See all projects
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <FadeRise className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} featured={i === 0} />
            ))}
          </FadeRise>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects" className="btn-ghost text-sm">
              See all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Band — rising floors ── */}
      <section className="bg-teal text-white py-20 overflow-hidden" aria-label="Key statistics">
        <div className="container-max">
          <SectionHeading
            title="Our Track Record"
            subtitle="Numbers that have been earned on site — not in a brochure."
            className="[&_h2]:text-white [&_p]:text-white/70 mb-14"
          />
          <RisingFloors stats={floorStats} />
        </div>
      </section>

      {/* ── Desk of Directors ── */}
      <section className="section-pad bg-footer" aria-label="Message from the Director">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Director photo */}
            <RevealImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"
              alt="Director of BD Buildcon LLP"
              fill
              wrapperClassName="relative aspect-[3/4] rounded-card overflow-hidden"
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              parallax
=======
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-semibold">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-[#16A8B8] h-1/2"
>>>>>>> c78dd576ef26cad3e327c781fe85ee2858d69b90
            />
          </div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-20 py-16 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/5">
          <StatBox value="32+" label="Years Experience" />
          <StatBox value="50+" label="Major Projects" />
          <StatBox value="60%" label="Repeat Ratio" />
          <StatBox value="ZERO" label="Accidents" accent />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              Decades of <br/> Unyielding Quality.
            </h2>
            <div className="space-y-6 text-neutral-400 font-light leading-relaxed text-lg">
              <p>
                Established in 1995, BD Buildcon LLP has evolved from a regional civil contractor into a full-scale turnkey EPC partner for major industries. 
              </p>
              <p>
                We pride ourselves on completing complex industrial projects on strict deadlines with zero accidents. Our massive inventory of in-house heavy machinery means we control our timelines, ensuring unparalleled quality without third-party dependencies.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-[#16A8B8]/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-[#16A8B8] rounded-full" />
                </div>
                <h3 className="text-white font-bold mb-2">Our Mission</h3>
                <p className="text-sm text-neutral-500">Deliver high-quality, safe, and cost-effective construction services through transparency and technological integration.</p>
              </div>
              <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <h3 className="text-white font-bold mb-2">Our Vision</h3>
                <p className="text-sm text-neutral-500">To be the preferred EPC contractor across India, recognized for flawless execution and an absolute safety record.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/photos/img_4_0.png" 
                alt="Construction Site" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 border border-white/10 rounded-3xl mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#16A8B8] p-8 rounded-2xl text-black max-w-xs shadow-2xl hidden md:block">
              <p className="font-bold text-xl mb-2">ISO 9001:2015</p>
              <p className="text-sm font-medium opacity-80">Certified for superior quality management and operational excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#16A8B8]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <p className="text-[#16A8B8] font-bold tracking-[0.3em] uppercase text-sm mb-4">Core Capabilities</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Turnkey Execution</h2>
            </div>
            <p className="text-neutral-400 font-light max-w-md">
              From deep foundations to complex mechanical piping, we provide comprehensive end-to-end industrial construction solutions under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard 
              title="Civil & Structural"
              desc="RCC foundations, bored piling, industrial flooring, trenches, and superstructures for complex manufacturing facilities."
              img="/photos/img_1_0.png"
            />
            <ServiceCard 
              title="PEB Structures"
              desc="Design, supply, and erection of Pre-Engineered Buildings, warehouses, storage sheds, and crane-integrated facilities."
              img="/photos/img_2_0.png"
            />
            <ServiceCard 
              title="Mechanical & Piping"
              desc="Process and utility piping fabrication, equipment erection, alignment, and commissioning across industrial plants."
              img="/photos/img_3_0.png"
            />
            <ServiceCard 
              title="Piling & Earthwork"
              desc="Mass earthwork, industrial roads, drainage, and specialized deep piling solutions for greenfield projects."
              img="/photos/img_5_0.png"
            />
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Self-Reliant Infrastructure</h2>
            <p className="text-neutral-400 font-light text-lg">
              Owning over 150+ heavy machinery items—including excavators, cranes, boom placers, and batching plants—allows us to eliminate third-party delays and guarantee project momentum.
            </p>
          </div>

          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden">
             <Image 
                src="/photos/img_6_0.png" 
                alt="Infrastructure" 
                fill 
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="text-white">
                  <p className="text-3xl font-serif font-bold mb-2">In-House Fabrication Yard</p>
                  <p className="text-neutral-300">Dedicated facilities to ensure highest quality control.</p>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-16">Trusted by Industry Leaders</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-60">
            {['GNFC', 'GACL', 'PIDILITE', 'AKER SOLUTIONS', 'THERMAX', 'MOTT MACDONALD', 'BIRLA CELLULOSE', 'ATG TYRES'].map(client => (
              <div key={client} className="px-8 py-4 border border-white/10 rounded-full text-white tracking-widest uppercase font-bold text-sm bg-white/5">
                {client}
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-10 bg-[#050505] rounded-3xl border border-white/5 relative">
              <span className="text-6xl text-[#16A8B8] font-serif absolute top-6 left-6 opacity-20">"</span>
              <p className="text-neutral-400 italic relative z-10 leading-relaxed mb-8">
                Bhumi Developers are one of our major construction contractors. They have an excellent track record and have helped us achieve significant milestones, timely, safely, and with the best quality of workmanship... zero accidents.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full" />
                <div>
                  <p className="text-white font-bold">Mr. Sunish Nair</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">Tagros Chemicals India Ltd.</p>
                </div>
              </div>
            </div>
            
            <div className="p-10 bg-[#050505] rounded-3xl border border-white/5 relative">
              <span className="text-6xl text-[#16A8B8] font-serif absolute top-6 left-6 opacity-20">"</span>
              <p className="text-neutral-400 italic relative z-10 leading-relaxed mb-8">
                We appreciate on successfully completing the Civil and Structural work with ZERO accident. We also appreciate their professionalism, workmanship, minimum usage of manpower and maximum usage of technologies.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full" />
                <div>
                  <p className="text-white font-bold">Mr. UM Mukharjee</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">Mott MacDonald, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 pt-20 pb-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <BDLogo light={false} className="h-12 w-auto" />
            </div>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
              Leading the way in industrial construction, creating resilient infrastructure for the future. 
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Registered Office</h4>
            <p className="text-neutral-500 text-sm leading-relaxed">
              7-8-9, Millenium Arcade,<br/>
              Opp. SVM Engineering College,<br/>
              Old National Highway No 8,<br/>
              Bharuch, Gujarat 392002
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Contact Us</h4>
            <ul className="text-neutral-500 text-sm space-y-2">
              <li>+91 98791 00355</li>
              <li>business@bdbuildcon.com</li>
              <li>www.bdbuildcon.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center text-xs text-neutral-600 font-light tracking-wider">
          &copy; {new Date().getFullYear()} BD BUILDCON LLP. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}

function StatBox({ value, label, accent = false }: { value: string, label: string, accent?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center text-center group pl-6 first:pl-0">
      <div className={`text-4xl md:text-5xl font-serif font-bold mb-3 transition-colors ${accent ? 'text-[#16A8B8]' : 'text-white group-hover:text-[#16A8B8]'}`}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500">
        {label}
      </div>
    </div>
  );
}

function ServiceCard({ title, desc, img }: { title: string, desc: string, img: string }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 aspect-[4/3] md:aspect-auto md:h-[400px]">
      <Image 
        src={img} 
        alt={title} 
        fill 
        className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
        <h3 className="text-2xl font-serif font-bold text-white mb-3">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}
