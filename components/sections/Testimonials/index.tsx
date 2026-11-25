"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plane, Quote, Star } from "lucide-react";
import type { TestimonialsSectionData } from "../../types";

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const [index, setIndex] = useState(0);
  const [per, setPer] = useState(1);
  const highlightAt = data.title.indexOf(data.title_highlight);
  const before = highlightAt >= 0 ? data.title.slice(0, highlightAt) : data.title;
  const max = Math.max(data.items.length - per, 0);

  useEffect(() => {
    const onResize = () => setPer(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, max));
  }, [max]);

  useEffect(() => {
    if (max === 0) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= max ? 0 : current + 1));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [max]);

  const shift = (step: number) => setIndex((current) => {
    const next = current + step;
    if (next > max) return 0;
    if (next < 0) return max;
    return next;
  });

  return (
    <section id={data.id} className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-end gap-6 lg:grid-cols-[1.3fr_auto_0.7fr]">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#5b6b8a]">
              <Plane className="h-4 w-4 -rotate-45 text-[#e11d48]" />
              {data.eyebrow}
              <span className="h-px w-16 bg-slate-300" />
            </p>
            <motion.h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#0b1f4b] sm:text-4xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {before}
              <span className="text-[#e11d48]">{data.title_highlight}</span>
            </motion.h2>
          </div>
          <span className="hidden h-16 w-px bg-slate-300 lg:block" />
          <p className="text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>
        </div>

        <div className="mt-10 overflow-hidden">
          <motion.div className="flex" animate={{ x: `-${(index * 100) / data.items.length}%` }} transition={{ duration: 0.55, ease: "easeInOut" }} style={{ width: `${(data.items.length / per) * 100}%` }}>
            {data.items.map((item) => (
              <article key={item.name} className="px-2" style={{ width: `${100 / data.items.length}%` }}>
                <div className="relative h-full rounded-2xl border border-slate-100 bg-white p-5 pb-6 shadow-sm">
                  <Quote className="absolute right-5 top-5 h-8 w-8 text-slate-200" />
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-[#0b1f4b]">{item.name}</p>
                      <p className="text-xs text-[#5b6b8a]">{item.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1 text-[#e11d48]">
                    {Array.from({ length: item.stars }).map((_, star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#24365f]">“{item.quote}”</p>
                  <span className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-[#e11d48]" />
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button type="button" aria-label={data.prev_label} onClick={() => shift(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[#0b1f4b]">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: max + 1 }).map((_, dot) => (
            <button key={dot} type="button" aria-label={`${data.slide_label} ${dot + 1}`} onClick={() => setIndex(dot)} className={`h-2.5 w-2.5 rounded-full ${dot === index ? "bg-[#e11d48]" : "bg-slate-300"}`} />
          ))}
          <button type="button" aria-label={data.next_label} onClick={() => shift(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-[#0b1f4b]">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
