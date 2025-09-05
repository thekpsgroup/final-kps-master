"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransitions } from "@/lib/animations";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransitions}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
