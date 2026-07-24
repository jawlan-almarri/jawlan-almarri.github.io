import React from "react";
import { motion } from "framer-motion";
import { revealUp, stagger } from "@/motion/variants";

/**
 * Scroll-reveal helpers.
 *
 * Almost every section animated its children with the same motion config. These
 * two wrappers capture that pattern so sections stay focused on layout:
 *
 *   <RevealGroup className="space-y-5">
 *     {items.map((x) => <Reveal key={x.id}>…</Reveal>)}
 *   </RevealGroup>
 *
 * `RevealGroup` orchestrates a staggered entrance; `Reveal` is the per-item
 * fade/slide. Both forward className + any extra motion props.
 */

export function RevealGroup({ children, className, amount = 0.18, ...rest }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className, as = "div", ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component variants={revealUp} className={className} {...rest}>
      {children}
    </Component>
  );
}
