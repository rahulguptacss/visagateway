"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { motion } from "framer-motion";
import { Menu, Send, X } from "lucide-react";
import type { HeaderData } from "../../types";

export default function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(data.links[0]?.href ?? "#home");
  useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + 120;
      let current = data.links[0]?.href ?? "#home";
      data.links.forEach((link) => {
        const id = link.href.replace("#", "");
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = link.href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [data.links]);

  const dragY = useRef(0);
  const onTouchStart = (event: TouchEvent) => {
    dragY.current = event.touches[0].clientY;
  };
  const onTouchMove = (event: TouchEvent) => {
    const y = event.touches[0].clientY;
    window.scrollBy(0, dragY.current - y);
    dragY.current = y;
  };

  return (
    <motion.header className="sticky top-0 z-50 bg-white shadow-sm" initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
      <div className="mx-auto flex h-[78px] max-w-6xl items-center gap-4 px-4">
        <a href="#home" className="shrink-0">
          <img src={data.logo} alt={data.logo_alt} className="h-14 w-auto object-contain sm:h-16" />
        </a>
        <nav className="ml-auto hidden items-center gap-5 text-sm font-medium text-[#1c2b4a] xl:flex">
          {data.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`relative py-1 hover:text-[#e11d48] ${active === link.href ? "font-semibold text-[#e11d48]" : ""}`}
            >
              {link.name}
              {active === link.href && <motion.span layoutId="nav-line" className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#e11d48]" />}
            </a>
          ))}
        </nav>
        <a href={data.button_href} className="ml-auto hidden items-center gap-2 rounded-md bg-[#e10600] px-4 py-2.5 text-sm font-semibold text-white xl:inline-flex">
          <Send className="h-4 w-4" />
          {data.button_text}
        </a>
        <button type="button" className="ml-auto xl:hidden" aria-label={open ? data.menu_close : data.menu_open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out xl:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <nav className="overflow-hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3">
            {data.links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => { setActive(link.href); setOpen(false); }} className="block py-2 text-sm font-medium">
                {link.name}
              </a>
            ))}
            <a href={data.button_href} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#e10600] px-4 py-2 text-sm font-semibold text-white">
              <Send className="h-4 w-4" />
              {data.button_text}
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
