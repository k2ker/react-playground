"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 1, y: "-100%" },
};

export default function Product() {
  const [open, setOpen] = useState(false);

  return (
    <main className="main flex  justify-center">
      <div className="flex w-[30rem] flex-col">
        <div className="w-full  bg-white">
          <div onClick={() => setOpen(!open)}>HEADER</div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.section
                className="w-full"
                key="content"
                initial="false"
                animate="true"
                exit="false"
                variants={{
                  true: { opacity: 1, height: "auto" },
                  false: { opacity: 1, height: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
