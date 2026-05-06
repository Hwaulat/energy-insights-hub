import { useState } from "react";
import {
  CalendarDays,
  Download,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  Coins,
  Factory,
  CheckCircle2,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cumulativeEnergy, energyTrend, machines } from "@/lib/mock-data";

const productionData = machines.map((m) => ({
  name: m.id,
  produced: m.counter,
  target: 1500,
}));

const costData = cumulativeEnergy.map((d) => ({
  day: d.day,
  cost: Math.round(d.kwh * 1.25), // Rp per kWh × 1000 (juta)
}));

export default function Reports() {
  const [period, setPeriod] = useState("today");

  const handleExport = (fmt: string) =>
    toast.success(`Report exported as ${fmt}`, {
      description: `Period: ${period}. Download will start shortly.`,
    });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Reports"
        description="Comprehensive energy, production, quality, utilization & cost reports."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Energy" value="3,402" unit="kWh" icon={TrendingUp} accent="primary" delta={{ value: "+5.8%", positive: true }} />
        <StatCard label="Production"   value="3,884" unit="pcs" icon={Factory}    accent="info"    delta={{ value: "+2.1%", positive: true }} />
        <StatCard label="Quality Pass" value="96.4"  unit="%"   icon={CheckCircle2} accent="success" delta={{ value: "+0.8%", positive: true }} />
        <StatCard label="Energy Cost"  value="4.25"  unit="Rp M" icon={Coins}      accent="warning" delta={{ value: "+3.6%", positive: false }} hint="vs prev period" />
      </div>

      <Tabs defaultValue="energy" className="space-y-4">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
        </TabsList>

        <TabsContent value="energy">
          <SectionCard title="Energy Consumption Trend" description="Hourly kW per machine" bodyClassName="p-3">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} unit=" kW" width={60} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="m1" name="Mesin 1" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="m2" name="Mesin 2" stroke="hsl(var(--accent))"  strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="m3" name="Mesin 3" stroke="hsl(var(--info))"    strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="production">
          <SectionCard title="Production vs Target" description="Units produced per machine" bodyClassName="p-3">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="target"   name="Target"   fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="produced" name="Produced" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="quality">
          <SectionCard title="Quality Pass Rate" description="% of batches within spec">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {machines.map((m, i) => {
                const pct = [98.2, 91.4, 96.8][i];
                return (
                  <div key={m.id} className="p-5 rounded-lg bg-muted/40">
                    <p className="text-xs uppercase font-semibold text-muted-foreground">{m.id}</p>
                    <p className="text-3xl font-bold mt-1 tabular-nums">{pct}%</p>
                    <div className="mt-3 h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="utilization">
          <SectionCard title="Machine Utilization (OEE)" description="Availability × Performance × Quality">
            <div className="space-y-4">
              {machines.map((m, i) => {
                const oee = [86.4, 72.1, 91.2][i];
                return (
                  <div key={m.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium">{m.name}</span>
                      <span className="font-bold tabular-nums">{oee}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          oee >= 85 ? "bg-success" : oee >= 75 ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${oee}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="cost">
          <SectionCard title="Energy Cost — Last 7 Days" description="Rp (thousands) per day" bodyClassName="p-3">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} width={60} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="cost" name="Cost (Rp k)" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}