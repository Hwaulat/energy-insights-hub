import {
  Activity,
  Zap,
  Gauge,
  Battery,
  Thermometer,
  Droplets,
  Cpu,
  FlaskConical,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  alloyQuality,
  cumulativeEnergy,
  energyTrend,
  machines,
  plcStatus,
} from "@/lib/mock-data";

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover/95 backdrop-blur-sm px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 tabular-nums">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground">{p.value} {p.unit ?? "kW"}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const totalPower = machines.reduce((s, m) => s + m.powerKw, 0);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Energy Dashboard"
        description="Real-time monitoring of shared power infrastructure across 3 alloy production machines."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Power"
          value={totalPower.toFixed(1)}
          unit="kW"
          icon={Zap}
          accent="primary"
          delta={{ value: "+3.2%", positive: true }}
          hint="Across 3 active machines"
        />
        <StatCard
          label="Today's Energy"
          value="3,402"
          unit="kWh"
          icon={Battery}
          accent="info"
          delta={{ value: "+5.8%", positive: true }}
          hint="vs yesterday"
        />
        <StatCard
          label="Cumulative"
          value="12.84"
          unit="GWh"
          icon={Activity}
          accent="success"
          delta={{ value: "On target", positive: true }}
          hint="YTD consumption"
        />
        <StatCard
          label="Avg Power Factor"
          value="0.92"
          icon={Gauge}
          accent="warning"
          delta={{ value: "−0.03", positive: false }}
          hint="Target ≥ 0.95"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          title="Power Consumption — Last 24h"
          description="Real-time kW per machine"
          className="xl:col-span-2"
          actions={
            <div className="flex gap-1.5">
              {["24H", "7D", "30D"].map((p, i) => (
                <Button
                  key={p}
                  size="sm"
                  variant={i === 0 ? "secondary" : "ghost"}
                  className="h-7 px-2.5 text-xs"
                >
                  {p}
                </Button>
              ))}
            </div>
          }
          bodyClassName="p-3"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrend} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--info))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} unit=" kW" width={60} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="m1" name="Mesin 1" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="m2" name="Mesin 2" stroke="hsl(var(--accent))"  strokeWidth={2} fill="url(#g2)" />
                <Area type="monotone" dataKey="m3" name="Mesin 3" stroke="hsl(var(--info))"    strokeWidth={2} fill="url(#g3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Cumulative Energy"
          description="Last 7 days, kWh"
          bodyClassName="p-3"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cumulativeEnergy} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={50} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="kwh" name="Energy" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Machines + PLC */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {machines.map((m) => {
            const tempPct = Math.min(100, (m.tempC / 1000) * 100);
            const tempCritical = m.tempC > 950;
            return (
              <div key={m.id} className="card-elevated p-5 animate-fade-in">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {m.id}
                    </p>
                    <h4 className="text-sm font-semibold truncate">{m.name}</h4>
                  </div>
                  <StatusBadge status={m.status === "warning" ? "warning" : "running"} />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Metric icon={Zap}        label="Power"   value={`${m.powerKw}`}  unit="kW" />
                  <Metric icon={Activity}   label="Current" value={`${m.currentA}`} unit="A" />
                  <Metric icon={Gauge}      label="Voltage" value={`${m.voltageV}`} unit="V" />
                  <Metric icon={Droplets}   label="Flow"    value={`${m.flowLpm}`}  unit="L/m" />
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Thermometer className="h-3.5 w-3.5" />
                      Temperature
                    </span>
                    <span className={`text-xs font-bold tabular-nums ${tempCritical ? "text-destructive" : "text-foreground"}`}>
                      {m.tempC}°C
                    </span>
                  </div>
                  <Progress
                    value={tempPct}
                    className={`h-1.5 ${tempCritical ? "[&>div]:bg-destructive" : "[&>div]:bg-success"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard title="PLC Status" description="Connection health per machine">
          <ul className="space-y-3">
            {plcStatus.map((p) => (
              <li key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-background flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{p.id} — {p.machine}</p>
                  <p className="text-xs text-muted-foreground">
                    Latency {p.latencyMs}ms · {p.lastUpdate}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Alloy quality */}
      <SectionCard
        title="Alloy Quality — Recent Batches"
        description="Composition analysis (N=1) per batch"
        actions={
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            <FlaskConical className="h-3.5 w-3.5" />
            View all batches
          </Button>
        }
        bodyClassName="p-0"
      >
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Batch</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead className="text-right">Si (%)</TableHead>
                <TableHead className="text-right">Fe (%)</TableHead>
                <TableHead className="text-right">Cu (%)</TableHead>
                <TableHead className="text-right">Mn (%)</TableHead>
                <TableHead className="text-right">Mg (%)</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alloyQuality.map((b) => (
                <TableRow
                  key={b.batch}
                  className={b.status === "out-of-range" ? "bg-destructive/5 hover:bg-destructive/10" : ""}
                >
                  <TableCell className="font-mono text-xs font-semibold">{b.batch}</TableCell>
                  <TableCell className="text-sm">{b.machine}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.si.toFixed(2)}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.fe.toFixed(2)}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.cu.toFixed(2)}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.mn.toFixed(2)}</TableCell>
                  <TableCell className="text-right tabular-nums">{b.mg.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={b.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: any;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="mt-0.5 text-base font-bold tabular-nums">
        {value}
        <span className="text-xs font-medium text-muted-foreground ml-1">{unit}</span>
      </p>
    </div>
  );
}