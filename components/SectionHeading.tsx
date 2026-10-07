import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({
  children,
  className = ""
}: SectionHeadingProps) {
  return (
    <div className={`flex items-end gap-4 px-2 ${className}`}>
      <h2 className="whitespace-nowrap font-display text-xl font-medium tracking-wide text-subtle sm:text-2xl">
        {children}
      </h2>
      {/* Oswald puts the baseline on the line box's bottom edge, so items-end
          alone lands the dots on the text's baseline */}
      <div aria-hidden className="rule-dotted h-[2px] flex-1" />
    </div>
  );
}
