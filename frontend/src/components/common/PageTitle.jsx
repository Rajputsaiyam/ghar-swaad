import React from "react";

export function PageTitle({ eyebrow, title, sub }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1.5">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight text-primary-deep md:text-4xl">
        {title}
      </h1>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
    </div>
  );
}
