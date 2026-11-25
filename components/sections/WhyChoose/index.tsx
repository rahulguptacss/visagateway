"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Globe, Headset, MapPin, Phone, Plane, Star, Users } from "lucide-react";
import type { WhySectionData } from "../../types";

function PointIcon({ name }: { name: string }) {
  if (name === "globe") {
    return (
      <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#1e3a8a]">
        <Globe className="h-9 w-9" strokeWidth={1.75} />
        <MapPin className="absolute bottom-3 right-3 h-5 w-5 fill-[#e11d48] text-[#e11d48]" />
      </span>
    );
  }
  return (
    <span className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eef3ff] text-[#1e3a8a]">
      <Users className="h-8 w-8" strokeWidth={1.75} />
      <span className="mt-1 flex text-[#e11d48]">
        <Star className="h-3.5 w-3.5 fill-current" />
        <Star className="h-3.5 w-3.5 fill-current" />
        <Star className="h-3.5 w-3.5 fill-current" />
      </span>
    </span>
  );
}

export default function WhyChoose({ data }: { data: WhySectionData }) {
  const highlightAt = data.title.indexOf(data.title_highlight);
  const before = highlightAt >= 0 ? data.title.slice(0, highlightAt) : data.title;
  const after = highlightAt >= 0 ? data.title.slice(highlightAt + data.title_highlight.length) : "";

  return (
    <section id={data.id} className="bg-[#f7f9fd] py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1fr_1.15fr]">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#5b6b8a]">
            <Plane className="h-4 w-4 -rotate-45 text-[#e11d48]" />
            {data.eyebrow}
            <span className="h-px w-16 bg-slate-300" />
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0b1f4b] sm:text-4xl">
            {before}
            <span className="text-[#e11d48]">{data.title_highlight}</span>
            {after}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>
          <div className="mt-8 space-y-5">
            {data.points.map((point) => {
              return (
                <article key={point.title} className="flex items-center gap-4">
                  <PointIcon name={point.icon} />
                  <div className="border-l border-slate-200 pl-4">
                    <h3 className="font-bold text-[#0b1f4b]">{point.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5b6b8a]">{point.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div className="rounded-2xl bg-[#0b1f4b] p-6 text-white" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Headset className="h-8 w-8" />
            <h3 className="mt-4 text-2xl font-extrabold leading-tight">{data.consult_title}</h3>
            <p className="mt-3 text-sm text-white/80">{data.consult_text}</p>
            <a href={data.phone_href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#e11d48]">
                <Phone className="h-3.5 w-3.5" />
              </span>
              {data.phone}
            </a>
            <a href={data.button_href} className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm">
              {data.button_text}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div className="relative min-h-56 overflow-hidden rounded-2xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <img src={data.image} alt={data.image_alt} className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute right-0 top-0 border-l-[46px] border-t-[46px] border-l-transparent border-t-[#e11d48]" />
          </motion.div>

          <motion.img src={data.side_image} alt={data.side_image_alt} className="h-52 w-full rounded-2xl object-cover sm:h-full" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} />

          <motion.div className="rounded-2xl bg-[#e11d48] p-6 text-white" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <Award className="h-8 w-8" />
            <h3 className="mt-4 text-2xl font-extrabold leading-tight">{data.badge_title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/90">{data.badge_text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
