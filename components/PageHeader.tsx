import React from "react";
import Panel from "@/components/Panel";

type PageHeaderProps = {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
};

export default function PageHeader({
  icon,
  title,
  description
}: PageHeaderProps) {
  return (
    <Panel ticks className="mx-2">
      <header className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          {icon}
          <h1 className="font-display text-2xl font-semibold tracking-wide text-foreground sm:text-3xl">
            {title}
          </h1>
        </div>
        {description && <p className="mt-2 body-copy">{description}</p>}
      </header>
    </Panel>
  );
}
