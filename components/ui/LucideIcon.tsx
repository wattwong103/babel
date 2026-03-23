"use client";

import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  name: string;
}

export default function LucideIcon({ name, ...props }: LucideIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (icons as any)[name];
  if (!IconComponent) {
    return <icons.HelpCircle {...props} />;
  }
  return <IconComponent {...props} />;
}
