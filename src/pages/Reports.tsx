import { useState } from "react";
import { CalendarDays, Download, Coins, Zap, Battery, Activity, Gauge, Droplets, Thermometer, Download as DownloadIcon, RefreshCw, FileText, FileSpreadsheet, ImageIcon, ShieldCheck, AlertCircle, FlaskConical, CheckCircle2, XCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cumulativeEnergy, energyTrend, machines } from "@/lib/mock-data";

const costData = cumulativeEnergy.map((d) => ({
  day: d.day,
  cost: Math.round(d.kwh * 1.25),
}));

const qualityMockData = [
  { date: "2026-04-28", batch: "B-101", alloy: "6063", hardness: 58, tensile: 188, elongation: 12.5, status: "Pass" },
  { date: "2026-04-28", batch: "B-102", alloy: "6061", hardness: 63, tensile: 210, elongation: 11.0, status: "Pass" },
  { date: "2026-04-29", batch: "B-103", alloy: "6063", hardness: 44, tensile: 160, elongation: 9.2,  status: "Reject" },
  { date: "2026-04-29", batch: "B-104", alloy: "6063", hardness: 57, tensile: 185, elongation: 12.1, status: "Pass" },
  { date: "2026-04-30", batch: "B-105", alloy: "6061", hardness: 65, tensile: 215, elongation: 10.8, status: "Pass" },
  { date: "2026-04-30", batch: "B-106", alloy: "6063", hardness: 42, tensile: 155, elongation: 8.9,  status: "Reject" },
  { date: "2026-05-01", batch: "B-107", alloy: "6063", hardness: 59, tensile: 190, elongation: 12.3, status: "Pass" },
  { date: "2026-05-01", batch: "B-108", alloy: "6061", hardness: 61, tensile: 205, elongation: 11.5, status: "Pass" },
  { date: "2026-05-02", batch: "B-109", alloy: "6063", hardness: 56, tensile: 183, elongation: 12.0, status: "Pass" },
  { date: "2026-05-02", batch: "B-110", alloy: "6061", hardness: 47, tensile: 168, elongation: 9.5,  status: "Reject" },
  { date: "2026-05-03", batch: "B-111", alloy: "6063", hardness: 60, tensile: 192, elongation: 12.8, status: "Pass" },
  { date: "2026-05-03", batch: "B-112", alloy: "6063", hardness: 58, tensile: 187, elongation: 12.2, status: "Pass" },
  { date: "2026-05-04", batch: "B-113", alloy: "6061", hardness: 64, tensile: 212, elongation: 11.1, status: "Pass" },
  { date: "2026-05-04", batch: "B-114", alloy: "6063", hardness: 43, tensile: 158, elongation: 9.0,  status: "Reject" },
  { date: "2026-05-05", batch: "B-115", alloy: "6063", hardness: 61, tensile: 194, elongation: 12.6, status: "Pass" },
  { date: "2026-05-05", batch: "B-116", alloy: "6061", hardness: 62, tensile: 207, elongation: 11.3, status: "Pass" },
  { date: "2026-05-06", batch: "B-117", alloy: "6063", hardness: 57, tensile: 186, elongation: 12.0, status: "Pass" },
  { date: "2026-05-06", batch: "B-118", alloy: "6061", hardness: 66, tensile: 218, elongation: 10.7, status: "Pass" },
  { date: "2026-05-07", batch: "B-119", alloy: "6063", hardness: 59, tensile: 191, elongation: 12.4, status: "Pass" },
  { date: "2026-05-07", batch: "B-120", alloy: "6061", hardness: 46, tensile: 165, elongation: 9.3,  status: "Reject" },
];

export default function Reports() {
  const [period, setPeriod] = useState("today");
  const [activeTab, setActiveTab] = useState("M-01");
  const [qualityFrom, setQualityFrom] = useState("2026-05-01");
  const [qualityTo, setQualityTo] = useState("2026-05-07");
  const m3Progress = Math.min(100, Math.round((machines[2].outputPcs / machines[2].targetPcs) * 100));

  const filteredQuality = qualityMockData.filter((r) => {
    if (qualityFrom && r.date < qualityFrom) return false;
    if (qualityTo && r.date > qualityTo) return false;
    return true;
  });

  const passCount = filteredQuality.filter((r) => r.status === "Pass").length;
  const rejectCount = filteredQuality.filter((r) => r.status === "Reject").length;
  const passRate = filteredQuality.length > 0
    ? ((passCount / filteredQuality.length) * 100).toFixed(1)
    : "0.0";
  const avgHardness = filteredQuality.length > 0
    ? (filteredQuality.reduce((s, r) => s + r.hardness, 0) / filteredQuality.length).toFixed(1)
    : "0.0";

  const handleExport = (fmt: string) =>
    toast.success(`Report exported as ${fmt}`, {
      description: `Period: ${period}. Download will start shortly.`,
    });

  const handleQualityExcel = () =>
    toast.success("Quality report exported as Excel", {
      description: `Date range: ${qualityFrom} → ${qualityTo}. Download will start shortly.`,
    });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto gap-6">
      <PageHeader
        title="Reports"
        description="Comprehensive energy, quality, and cost reports."
        actions={
          <>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[160px] h-9">
                <CalendarDays className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport("PDF")}>
                <FileText className="h-3.5 w-3.5" /> PDF
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport("Excel")}>
                <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport("PNG")}>
                <ImageIcon className="h-3.5 w-3.5" /> PNG
              </Button>
            </div>
          </>
        }
      />


      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 gap-6">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="M-01">Casting & Holding Furnace</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="M-02">Homogenizing Furnace</TabsTrigger>
          <TabsTrigger value="M-03">Counter / Quantity Output</TabsTrigger>
        </TabsList>

        <TabsContent value="M-01" className="flex flex-col gap-4">
          <SectionCard title="Casting & Holding Details" description="Machine-specific metrics for M-01">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Flow</div>
                <div className="text-2xl font-bold tabular-nums">{machines[0].flowLpm.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">L/min</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Holding</div>
                <div className="text-2xl font-bold tabular-nums">{machines[0].holdingC}</div>
                <div className="text-xs text-muted-foreground">°C</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Casting</div>
                <div className="text-2xl font-bold tabular-nums">{machines[0].castingC}</div>
                <div className="text-xs text-muted-foreground">°C</div>
              </div>
            </div>
          </SectionCard>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <StatCard label="Total Power" value="58.6" unit="kW" icon={Zap} accent="primary" />
            <StatCard label="Today's Energy" value="1,400" unit="kWh" icon={Battery} accent="info" />
            <StatCard label="Cumulative" value="4.65" unit="GWh" icon={Activity} accent="success" />
            <StatCard label="Avg Power Factor" value="0.92" icon={Gauge} accent="warning" />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <SectionCard title="Power Consumption" description="24h power trend for Casting & Holding Furnace" bodyClassName="p-3" className="w-full">
              <div className="h-72 flex items-center gap-2``">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} unit=" kW" width={60} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="m1" name="M-01" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Cumulative Energy" description="Last 7 days, kWh" bodyClassName="p-3" className="w-full">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={machines[0].weeklyEnergy} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                    <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="kwh" name="Energy" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

          </div>

          
        </TabsContent>

        <TabsContent value="quality" className="flex flex-col gap-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <StatCard label="Total Tested" value={String(filteredQuality.length)} unit="batch" icon={FlaskConical} accent="info" />
            <StatCard label="Pass Rate" value={passRate} unit="%" icon={ShieldCheck} accent="success" />
            <StatCard label="Reject Count" value={String(rejectCount)} unit="batch" icon={AlertCircle} accent="warning" />
            <StatCard label="Avg Hardness" value={avgHardness} unit="HV" icon={Gauge} accent="primary" />
          </div>

          {/* Filter + Table */}
          <SectionCard
            title="Alloy Quality Records"
            description="Details of alloy quality test results per batch"
            actions={
              <div className="flex items-center gap-3">
                {/* Date range filter */}
                <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden text-sm">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 border-r border-border">
                    <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground select-none">From</span>
                  </div>
                  <input
                    type="date"
                    value={qualityFrom}
                    onChange={(e) => setQualityFrom(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-background outline-none border-none"
                  />
                  <span className="px-2 text-muted-foreground text-xs select-none border-x border-border bg-muted/20">→</span>
                  <input
                    type="date"
                    value={qualityTo}
                    onChange={(e) => setQualityTo(e.target.value)}
                    className="px-3 py-1.5 text-sm bg-background outline-none border-none"
                  />
                </div>

                {/* Download Excel */}
                <Button size="sm" variant="outline" className="gap-1.5" onClick={handleQualityExcel}>
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  Download Excel
                </Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Date", "Batch", "Alloy", "Hardness (HV)", "Tensile (MPa)", "Elongation (%)", "Status"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-[11px] uppercase tracking-wider text-muted-foreground font-medium whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredQuality.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-muted-foreground text-sm">
                        No data found for selected date range.
                      </td>
                    </tr>
                  ) : (
                    filteredQuality.map((row) => (
                      <tr key={row.batch} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 tabular-nums text-muted-foreground">{row.date}</td>
                        <td className="py-3 px-4 font-medium">{row.batch}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-muted border border-border">
                            {row.alloy}
                          </span>
                        </td>
                        <td className="py-3 px-4 tabular-nums">{row.hardness}</td>
                        <td className="py-3 px-4 tabular-nums">{row.tensile}</td>
                        <td className="py-3 px-4 tabular-nums">{row.elongation}</td>
                        <td className="py-3 px-4">
                          {row.status === "Pass" ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Pass
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400">
                              <XCircle className="h-3.5 w-3.5" /> Reject
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="M-02" className="flex flex-col gap-4">

          <SectionCard title="Homogenizing Details" description="Machine-specific metrics for M-02">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Flow</div>
                <div className="text-2xl font-bold tabular-nums">{machines[1].flowLpm.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">L/min</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Temperature</div>
                <div className="text-2xl font-bold tabular-nums">{machines[1].tempC.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">°C</div>
              </div>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <StatCard label="Total Power" value="50.6" unit="kW" icon={Zap} accent="primary" />
            <StatCard label="Today's Energy" value="1,100" unit="kWh" icon={Battery} accent="info" />
            <StatCard label="Cumulative" value="4.80" unit="GWh" icon={Activity} accent="success" />
            <StatCard label="Avg Power Factor" value="0.88" icon={Gauge} accent="warning" />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <SectionCard title="Power Consumption" description="24h power trend for Homogenizing Furnace" bodyClassName="p-3">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} unit=" kW" width={60} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="m2" name="M-02" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Cumulative Energy" description="Last 7 days, kWh" bodyClassName="p-3">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={machines[1].weeklyEnergy} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="kwh" name="Energy" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
          </div>

        </TabsContent>

        <TabsContent value="M-03" className="flex flex-col gap-4">

          <SectionCard title="Counter Details" description="Machine-specific metrics for M-03">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Output</div>
                <div className="text-2xl font-bold tabular-nums">{machines[2].outputPcs}</div>
                <div className="text-xs text-muted-foreground">pcs</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Reject</div>
                <div className="text-2xl font-bold tabular-nums">{machines[2].rejectPcs}</div>
                <div className="text-xs text-muted-foreground">pcs</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Rate</div>
                <div className="text-2xl font-bold tabular-nums">{machines[2].ratePcsH}</div>
                <div className="text-xs text-muted-foreground">pcs/h</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Target</div>
                <div className="text-2xl font-bold tabular-nums">{machines[2].targetPcs}</div>
                <div className="text-xs text-muted-foreground">pcs</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Target Progress</span>
                <span className="text-sm font-semibold tabular-nums">{m3Progress}%</span>
              </div>
              <Progress value={m3Progress} className="h-2 rounded-full" />
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <StatCard label="Total Power" value="34.2" unit="kW" icon={Zap} accent="primary" />
            <StatCard label="Today's Energy" value="902" unit="kWh" icon={Battery} accent="info" />
            <StatCard label="Cumulative" value="3.39" unit="GWh" icon={Activity} accent="success" />
            <StatCard label="Avg Power Factor" value="0.95" icon={Gauge} accent="warning" />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
          <SectionCard title="Power Consumption" description="24h power trend for Counter / Output" bodyClassName="p-3">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} unit=" kW" width={60} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="m3" name="M-03" stroke="hsl(var(--info))" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Cumulative Energy" description="Last 7 days, kWh" bodyClassName="p-3">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={machines[2].weeklyEnergy} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="kwh" name="Energy" fill="hsl(var(--info))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
          </div>
          
        </TabsContent>
      </Tabs>
    </div>
  );
}