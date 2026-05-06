import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  delta?: { value: string; positive: boolean; label?: string };
  accent?: "primary" | "success" | "warning" | "destructive" | "info";
  hint?: string;
}

const accentMap: Record<string, string> = {
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/15 to-warning/5 text-warning",
  destructive: "from-destructive/15 to-destructive/5 text-destructive",
  info: "from-info/15 to-info/5 text-info",
};

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  delta,
  accent = "primary",
  hint,
}: StatCardProps) {
  return (
    <div className="card-elevated group p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
            accentMap[accent]
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md",
              delta.positive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {delta.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {delta.value}
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-2xl md:text-[28px] font-bold text-foreground tabular-nums tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-muted-foreground">{unit}</span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}