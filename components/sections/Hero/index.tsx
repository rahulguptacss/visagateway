"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import type { HeroSectionData } from "../../types";

export default function Hero({ data }: { data: HeroSectionData }) {
  return (
    <section id={data.id} className="overflow-hidden bg-[#f4f7fb]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-2 lg:grid-cols-[1.05fr_0.95fr] lg:pb-12 lg:pt-3">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#1e3a8a] shadow-sm sm:text-xs">
            <Plane className="h-3.5 w-3.5 -rotate-45 fill-[#e11d48] text-[#e11d48]" />
            {data.badge}
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.05] text-[#0b1f4b] sm:text-5xl lg:text-[56px]">
            {data.title}
            <span className="mt-1 block text-[#1d4ed8]">{data.title_accent}</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#4b5d80] sm:text-base">{data.lead}</p>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[540px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute inset-[8%] rounded-full border border-dashed border-[#9db0d0]" />
          <motion.img
            src={data.image}
            alt={data.image_alt}
            className="absolute left-1/2 top-1/2 z-10 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover shadow-lg"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }}>
            {data.orbit.map((item, index) => {
              const angle = (index / data.orbit.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42;
              const left = 50 + Math.cos(angle) * radius;
              const top = 50 + Math.sin(angle) * radius;
              return (
              <div key={`${item.alt ?? "plane"}-${index}`} className="absolute" style={{ top: `${top}%`, left: `${left}%` }}>
                <motion.div className="-translate-x-1/2 -translate-y-1/2" animate={{ rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }}>
                  {item.type === "flag" ? (
                    <img src={item.src} alt={item.alt} className="h-11 w-11 rounded-full border-[3px] border-white object-cover shadow-md sm:h-12 sm:w-12" />
                  ) : (
                    <Plane className="h-4 w-4 text-[#16325c]" />
                  )}
                </motion.div>
              </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
