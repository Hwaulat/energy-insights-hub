import { cn } from "@/lib/utils";

type Status =
  | "running"
  | "idle"
  | "stopped"
  | "maintenance"
  | "connected"
  | "disconnected"
  | "error"
  | "critical"
  | "warning"
  | "info"
  | "active"
  | "ack"
  | "resolved"
  | "in-range"
  | "out-of-range";

const map: Record<Status, { dot: string; bg: string; text: string; label: string; pulse?: boolean }> = {
  running:       { dot: "bg-success",     bg: "bg-success/10",     text: "text-success",     label: "Running",      pulse: true },
  idle:          { dot: "bg-info",        bg: "bg-info/10",        text: "text-info",        label: "Idle" },
  stopped:       { dot: "bg-muted-foreground", bg: "bg-muted",     text: "text-muted-foreground", label: "Stopped" },
  maintenance:   { dot: "bg-warning",     bg: "bg-warning/10",     text: "text-warning",     label: "Maintenance" },
  connected:     { dot: "bg-success",     bg: "bg-success/10",     text: "text-success",     label: "Connected",   pulse: true },
  disconnected:  { dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive", label: "Disconnected" },
  error:         { dot: "bg-warning",     bg: "bg-warning/10",     text: "text-warning",     label: "Error" },
  critical:      { dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive", label: "Critical",    pulse: true },
  warning:       { dot: "bg-warning",     bg: "bg-warning/10",     text: "text-warning",     label: "Warning" },
  info:          { dot: "bg-info",        bg: "bg-info/10",        text: "text-info",        label: "Info" },
  active:        { dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive", label: "Active",      pulse: true },
  ack:           { dot: "bg-warning",     bg: "bg-warning/10",     text: "text-warning",     label: "Acknowledged" },
  resolved:      { dot: "bg-success",     bg: "bg-success/10",     text: "text-success",     label: "Resolved" },
  "in-range":    { dot: "bg-success",     bg: "bg-success/10",     text: "text-success",     label: "In Range" },
  "out-of-range":{ dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive", label: "Out of Range" },
};

interface StatusBadgeProps {
  status: Status;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const cfg = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold",
        cfg.bg,
        cfg.text,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {cfg.pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping",
              cfg.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", cfg.dot)} />
      </span>
      {label ?? cfg.label}
    </span>
  );
}