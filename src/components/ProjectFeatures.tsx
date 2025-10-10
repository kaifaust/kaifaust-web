"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectFeature } from "@/lib/projects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProjectFeaturesProps {
  features: ProjectFeature[];
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  const [activeAccordion, setActiveAccordion] = useState(`item-0`);

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center max-w-3xl lg:max-w-7xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-start">
        {/* Left side - Dynamic visual based on active accordion */}
        <div className="hidden lg:flex items-start order-1 lg:order-none">
          <div className="rounded-xl overflow-hidden shadow-lg w-full bg-white dark:bg-gray-800 flex items-center justify-center sticky top-8">
            {features.map((feature, index) => (
              <div
                key={`image-${index}`}
                className={activeAccordion === `item-${index}` ? "block" : "hidden"}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-contain dark:hidden"
                />
                {feature.imageDark && (
                  <Image
                    src={feature.imageDark}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-contain hidden dark:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Accordion */}
        <div className="flex items-center">
          <Accordion
            type="single"
            defaultValue="item-0"
            value={activeAccordion}
            onValueChange={(value) => setActiveAccordion(value as string)}
            className="w-full"
          >
            {features.map((feature, index) => (
              <AccordionItem
                key={`feature-${index}`}
                value={`item-${index}`}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <AccordionTrigger className="text-left tracking-tight text-lg md:text-2xl text-gray-900 dark:text-white data-[state=closed]:text-gray-400 dark:data-[state=closed]:text-gray-500 data-[state=closed]:hover:text-gray-600 dark:data-[state=closed]:hover:text-gray-300 transition-colors py-4 hover:no-underline">
                  <span className="flex items-center">
                    <span
                      className="inline-block mr-2"
                      dangerouslySetInnerHTML={{ __html: feature.icon }}
                    />
                    {feature.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  <div>{feature.description}</div>
                  {/* Mobile image */}
                  <div className="block lg:hidden mt-4">
                    <div className="rounded-xl overflow-hidden shadow-lg w-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={500}
                        height={350}
                        className="w-full h-full object-contain dark:hidden"
                      />
                      {feature.imageDark && (
                        <Image
                          src={feature.imageDark}
                          alt={feature.title}
                          width={500}
                          height={350}
                          className="w-full h-full object-contain hidden dark:block"
                        />
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
