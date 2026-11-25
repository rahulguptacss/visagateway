"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plane } from "lucide-react";
import type { FaqSectionData } from "../../types";

export default function Faq({ data }: { data: FaqSectionData }) {
  const [open, setOpen] = useState(0);

  return (
    <section id={data.id} className="bg-[#f4f7fb] py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#e11d48]">
            <Plane className="h-4 w-4 -rotate-45" />
            {data.eyebrow}
            <span className="h-px w-16 bg-slate-300" />
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0b1f4b] sm:text-5xl">
            {data.title}
            <span className="mt-1 block">
              {data.title_rest} <span className="text-[#e11d48]">{data.title_highlight}</span>
            </span>
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>
          <img src={data.image} alt={data.image_alt} className="mt-8 h-64 w-full max-w-sm object-contain object-left" />
        </motion.div>

        <div className="space-y-3">
          {data.items.map((item, index) => {
            const active = open === index;
            return (
              <motion.div key={item.question} className="overflow-hidden rounded-xl bg-white shadow-sm" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold sm:text-base ${active ? "bg-[#0b1f4b] text-white" : "text-[#0b1f4b]"}`}
                  onClick={() => setOpen(active ? -1 : index)}
                >
                  {item.question}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition ${active ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.p className="overflow-hidden px-5 text-sm leading-6 text-[#5b6b8a]" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <span className="block py-4">{item.answer}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
