"use client";

import { motion } from "framer-motion";
import type { FooterData } from "../../types";

const marks: Record<string, { path: string; color: string }> = {
  Facebook: {
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  Twitter: {
    color: "#1DA1F2",
    path: "M21.543 7.104c.015.211.015.423.015.636 0 6.485-4.938 13.966-13.966 13.966-2.772 0-5.352-.81-7.523-2.206.385.045.757.068 1.155.068 2.301 0 4.415-.784 6.099-2.104-2.148-.04-3.963-1.459-4.586-3.406.3.057.61.086.929.086.446 0 .878-.06 1.288-.172-2.247-.452-3.94-2.436-3.94-4.817v-.062c.66.367 1.418.588 2.224.614a4.9 4.9 0 0 1-2.183-4.082c0-.902.242-1.747.665-2.474a13.92 13.92 0 0 0 10.105 5.126 5.53 5.53 0 0 1-.121-1.119 4.89 4.89 0 0 1 4.894-4.894 4.82 4.82 0 0 1 3.568 1.545 9.64 9.64 0 0 0 3.104-1.185 4.87 4.87 0 0 1-2.149 2.694 9.76 9.76 0 0 0 2.807-.77 10.49 10.49 0 0 1-2.445 2.53z",
  },
  LinkedIn: {
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
};

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="bg-[#071633] text-white">
      <motion.div className="mx-auto max-w-6xl px-4 pt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        <div className="grid items-center gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex gap-2">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                style={{ ["--brand" as string]: marks[social.name]?.color ?? "#071633" }}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#071633] transition duration-200 hover:-translate-y-1 hover:bg-[var(--brand)] hover:text-white hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={marks[social.name]?.path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="max-w-xl text-base font-medium leading-7 sm:text-lg">{data.description}</p>
        </div>

        <div className="mt-10 grid items-center gap-8 sm:grid-cols-2 lg:grid-cols-[220px_1fr_1fr_1fr]">
          <img src={data.logo} alt={data.logo_alt} className="h-16 w-auto object-contain object-left" />
          <div>
            <p className="font-semibold">{data.email_label}</p>
            <a href={`mailto:${data.email}`} className="mt-2 block text-sm text-white/75">{data.email}</a>
          </div>
          <div>
            <p className="font-semibold">{data.address_label}</p>
            <p className="mt-2 max-w-[220px] text-sm leading-6 text-white/75">{data.address}</p>
          </div>
          <div>
            <p className="font-semibold">{data.phone_label}</p>
            <a href={data.phone_href} className="mt-2 block text-sm text-white/75">{data.phone}</a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/25 py-3 text-center text-sm text-white/80">{data.copyright}</div>
      </motion.div>
    </footer>
  );
}
