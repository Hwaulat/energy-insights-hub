import { useMemo, useState } from "react";
import { Search, Filter, Check, BellOff, AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { alerts as initialAlerts, AlertLevel, AlertStatus } from "@/lib/mock-data";

export default function LogAlert() {
  const [list, setList] = useState(initialAlerts);
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(
    () =>
      list.filter(
        (a) =>
          (level === "all" || a.level === level) &&
          (status === "all" || a.status === status) &&
          (q === "" ||
            a.id.toLowerCase().includes(q.toLowerCase()) ||
            a.source.toLowerCase().includes(q.toLowerCase()) ||
            a.parameter.toLowerCase().includes(q.toLowerCase()))
      ),
    [list, q, level, status]
  );

  const counts = useMemo(
    () => ({
      active:   list.filter((a) => a.status === "active").length,
      critical: list.filter((a) => a.level === "critical" && a.status === "active").length,
      warning:  list.filter((a) => a.level === "warning"  && a.status === "active").length,
      info:     list.filter((a) => a.level === "info").length,
    }),
    [list]
  );

  const ack = (id: string) => {
    setList((prev) => prev.map((a) => (a.id === id ? { ...a, status: "ack", ackBy: "Rahmat A." } : a)));
    toast.success(`Alert ${id} acknowledged`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Log Alert"
        description="System alerts history, acknowledgement, and notifications."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Alerts" value={String(counts.active)}   icon={BellOff}        accent="destructive" />
        <StatCard label="Critical"      value={String(counts.critical)} icon={AlertOctagon}   accent="destructive" />
        <StatCard label="Warning"       value={String(counts.warning)}  icon={AlertTriangle}  accent="warning" />
        <StatCard label="Info (Total)"  value={String(counts.info)}     icon={Info}           accent="info" />
      </div>

      <SectionCard
        title={`Alerts (${filtered.length})`}
        description="Acknowledge or filter by level and status"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="pl-8 h-8 w-44 text-xs"
              />
            </div>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <Filter className="h-3 w-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ack">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
        bodyClassName="p-0"
      >
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id} className={a.status === "active" ? "bg-destructive/5 hover:bg-destructive/10" : ""}>
                  <TableCell className="font-mono text-xs font-semibold">{a.id}</TableCell>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">{a.timestamp}</TableCell>
                  <TableCell><StatusBadge status={a.level as AlertLevel} /></TableCell>
                  <TableCell className="text-sm font-medium">{a.source}</TableCell>
                  <TableCell className="text-sm">{a.parameter}</TableCell>
                  <TableCell className="text-sm font-semibold tabular-nums">{a.value}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{a.threshold}</TableCell>
                  <TableCell className="text-xs tabular-nums">{a.duration}</TableCell>
                  <TableCell><StatusBadge status={a.status as AlertStatus} /></TableCell>
                  <TableCell className="text-right">
                    {a.status === "active" ? (
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => ack(a.id)}>
                        <Check className="h-3 w-3" /> Ack
                      </Button>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">{a.ackBy}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={10} className="text-center text-sm text-muted-foreground py-12">No alerts match your filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}