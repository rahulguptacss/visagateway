"use client";

import { motion } from "framer-motion";
import { Briefcase, Cog, GraduationCap, HardHat, Luggage, Plane } from "lucide-react";
import type { ServicesSectionData } from "../../types";

function ServiceIcon({ name, light }: { name: string; light?: boolean }) {
  const color = light ? "text-[#0b1f4b]" : "text-[#0b1f4b]";
  if (name === "luggage") return <Luggage className={`h-7 w-7 ${color}`} strokeWidth={1.75} />;
  if (name === "briefcase") return <Briefcase className={`h-7 w-7 ${color}`} strokeWidth={1.75} />;
  if (name === "worker") {
    return (
      <span className="relative text-[#0b1f4b]">
        <HardHat className="h-7 w-7" strokeWidth={1.75} />
        <Cog className="absolute -bottom-1 -right-2 h-3.5 w-3.5" />
      </span>
    );
  }
  return <GraduationCap className={`h-7 w-7 ${color}`} strokeWidth={1.75} />;
}

export default function Services({ data }: { data: ServicesSectionData }) {
  const highlightAt = data.title.indexOf(data.title_highlight);
  const before = highlightAt >= 0 ? data.title.slice(0, highlightAt) : data.title;

  return (
    <section id={data.id} className="bg-[#f4f7fb] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_auto_0.8fr]">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#e11d48]">
              <Plane className="h-4 w-4 -rotate-45" />
              {data.eyebrow}
              <span className="h-px w-16 bg-slate-300" />
            </p>
            <motion.h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight text-[#0b1f4b] sm:text-4xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {before}
              <span className="text-[#e11d48]">{data.title_highlight}</span>
            </motion.h2>
          </div>
          <span className="hidden h-16 w-px bg-slate-300 lg:block" />
          <p className="text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-[#0b1f4b] shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#e11d48] hover:bg-[#e11d48] hover:text-white"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ff] transition group-hover:bg-white">
                <ServiceIcon name={item.icon} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5b6b8a] transition group-hover:text-white/90">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
