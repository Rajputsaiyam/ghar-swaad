import React from "react";
import { STATUS_STYLE, cn } from "../../utils/formatters";

export function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold transition-all shadow-xs",
        STATUS_STYLE[status] || "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}
