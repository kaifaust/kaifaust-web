import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
}

export default function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 max-w-7xl mx-auto pb-16">
      {children}
    </div>
  );
}
