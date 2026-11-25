"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Plane, Send, User } from "lucide-react";
import type { ContactSectionData } from "../../types";

const field = "w-full rounded-lg border border-slate-200 bg-[#f7f9fc] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#e11d48]";

export default function Contact({ data }: { data: ContactSectionData }) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const highlightAt = data.title.indexOf(data.title_highlight);
  const before = highlightAt >= 0 ? data.title.slice(0, highlightAt) : data.title;
  const highlight = highlightAt >= 0 ? data.title_highlight : "";

  const cards = [
    { icon: MapPin, title: data.address_title, value: data.address, href: "" },
    { icon: Phone, title: data.phone_title, value: data.phone, href: data.phone_href },
    { icon: Mail, title: data.email_title, value: data.email, href: `mailto:${data.email}` },
  ];

  return (
    <section id={data.id} className="relative overflow-hidden bg-white py-16">
      <Plane className="pointer-events-none absolute bottom-16 left-[8%] hidden h-8 w-8 -rotate-12 text-slate-300 lg:block" />
      <div className="pointer-events-none absolute bottom-10 left-6 hidden h-16 w-40 rounded-full border-b border-dashed border-slate-300 lg:block" />
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#1e3a8a]">
            <Plane className="h-4 w-4 -rotate-45 text-[#e11d48]" />
            {data.eyebrow}
            <span className="h-px w-16 bg-slate-300" />
          </p>
          <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight text-[#0b1f4b] sm:text-4xl">
            {before}
            <span className="block text-[#e11d48]">{highlight}</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#5b6b8a]">{data.lead}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div key={card.title} className="rounded-xl border border-slate-100 bg-[#f7f9fc] p-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <card.icon className="h-5 w-5 text-[#e11d48]" />
                <p className="mt-3 text-sm font-bold text-[#0b1f4b]">{card.title}</p>
                {card.href ? (
                  <a href={card.href} className="mt-1 block text-xs leading-5 text-[#5b6b8a]">{card.value}</a>
                ) : (
                  <p className="mt-1 text-xs leading-5 text-[#5b6b8a]">{card.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="rounded-2xl border-t-4 border-[#e11d48] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            setPhone("");
            event.currentTarget.reset();
          }}
        >
          <h3 className="text-2xl font-extrabold text-[#0b1f4b]">{data.form_title}</h3>
          <span className="mt-2 block h-1 w-12 rounded-full bg-[#e11d48]" />
          {sent && <p className="mt-4 rounded-lg bg-[#e7f6df] px-4 py-3 text-sm text-[#166534]">{data.success_message}</p>}
          <label className="relative mt-5 block">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input required placeholder={data.name_placeholder} className={field} />
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="relative block">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input required type="email" placeholder={data.email_placeholder} className={field} />
            </label>
            <label className="relative block">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input required inputMode="numeric" placeholder={data.phone_placeholder} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))} className={field} />
            </label>
          </div>
          <label className="relative mt-3 block">
            <MessageCircle className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <textarea required rows={4} placeholder={data.message_placeholder} className={`${field} resize-none py-3`} />
          </label>
          <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#e11d48] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            <Send className="h-4 w-4" />
            {data.button_text}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
