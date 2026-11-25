"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Target } from "lucide-react";
import type { AboutSectionData } from "../../types";

function Counter({ value }: { value: string }) {
  const target = Number(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1400, 1);
        setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About({ data }: { data: AboutSectionData }) {
  return (
    <section id={data.id} className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-1 w-8 rounded-full bg-[#e11d48]" />
          <p className="text-xs font-semibold tracking-[0.16em] text-[#5b6b8a]">{data.eyebrow}</p>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-[280px_1fr]">
          <motion.article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 shadow-sm" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative min-h-52 flex-1">
              <img src={data.image} alt={data.image_alt} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-0 top-0 border-r-[42px] border-t-[42px] border-r-transparent border-t-[#e11d48]" />
            </div>
            <div className="p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#0b1f4b]">
                <Target className="h-5 w-5 text-[#e11d48]" />
                {data.vision_title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5b6b8a]">{data.vision_text}</p>
            </div>
          </motion.article>

          <div className="flex h-full flex-col">
            <motion.h2 className="max-w-xl text-3xl font-extrabold leading-tight text-[#0b1f4b] sm:text-4xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {data.title}
            </motion.h2>
            <span className="mt-3 block h-1 w-14 rounded-full bg-[#e11d48]" />
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>

            <div className="mt-6 grid flex-1 items-stretch gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <motion.div className="flex h-full flex-col justify-between rounded-2xl bg-[#f4f7fb] p-5" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="grid grid-cols-2 items-start">
                  {data.stats.map((stat, index) => (
                    <div key={stat.label} className={index === 0 ? "border-r border-slate-200 pr-4" : "pl-4"}>
                      <p className="text-3xl font-extrabold leading-none tabular-nums" style={{ color: stat.color }}><Counter value={stat.value} /></p>
                      <p className="mt-2 text-sm leading-5 text-[#5b6b8a]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 items-center gap-3">
                  <div className="flex -space-x-2">
                    {data.avatars.map((avatar) => (
                      <img key={avatar.src} src={avatar.src} alt={avatar.alt} className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div className="justify-self-end text-center">
                    <p className="inline-flex items-center gap-1 rounded-md bg-[#e11d48] px-2 py-1 text-sm font-bold text-white">
                      {data.rating_value}
                      <Star className="h-3.5 w-3.5 fill-white" />
                    </p>
                    <p className="mt-1 text-xs text-[#5b6b8a]">{data.rating_label}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="relative h-full min-h-48 overflow-hidden rounded-2xl text-white" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
                <img src={data.rate_image} alt={data.rate_image_alt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[#071a4a]/80" />
                <div className="relative p-5">
                  <h3 className="font-semibold">{data.rate_title}</h3>
                  <div className="mt-4 space-y-3">
                    {data.bars.map((bar) => (
                      <div key={bar.label} className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs">
                        <div>
                          <p>{bar.label}</p>
                          <div className="mt-1 h-2 rounded-full bg-white/20">
                            <motion.div className="h-2 rounded-full" style={{ background: bar.color }} initial={{ width: 0 }} whileInView={{ width: bar.width }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
                          </div>
                        </div>
                        <span>{bar.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
