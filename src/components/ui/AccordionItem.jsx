import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MotionDiv = motion.div;

export function AccordionItem({ value, title, icon, children }) {
  return (
    <Accordion.Item
      value={value}
      className="overflow-hidden rounded-xl border border-border bg-card/40 backdrop-blur-sm"
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-foreground/5">
          <div className="flex items-center gap-3">
            {icon && <span className="text-accent">{icon}</span>}
            <span className="font-medium text-foreground">{title}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content asChild>
        <MotionDiv
          key={value}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </MotionDiv>
      </Accordion.Content>
    </Accordion.Item>
  );
}
