import { Cpu, Gauge, FlaskConical, Coins, Plus, Pencil, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  machines,
  qualityStandards,
  sensors,
  tariffs,
  thresholds,
} from "@/lib/mock-data";

const RowActions = () => (
  <div className="flex items-center justify-end gap-1">
    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
      <Pencil className="h-3.5 w-3.5" />
    </Button>
    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive">
      <Trash2 className="h-3.5 w-3.5" />
    </Button>
  </div>
);

export default function MasterData() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Master Data"
        description="Configure machines, sensors, alarm thresholds, quality standards, and electricity tariffs."
        actions={
          <Button size="sm" className="gap-2 gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="h-3.5 w-3.5" />
            Add Entry
          </Button>
        }
      />

      <Tabs defaultValue="machines" className="space-y-4">
        <TabsList className="bg-muted/60 flex-wrap h-auto">
          <TabsTrigger value="machines"><Cpu className="h-3.5 w-3.5 mr-1.5" />Machines</TabsTrigger>
          <TabsTrigger value="sensors"><Gauge className="h-3.5 w-3.5 mr-1.5" />Sensors</TabsTrigger>
          <TabsTrigger value="thresholds"><Gauge className="h-3.5 w-3.5 mr-1.5" />Thresholds</TabsTrigger>
          <TabsTrigger value="quality"><FlaskConical className="h-3.5 w-3.5 mr-1.5" />Quality Standards</TabsTrigger>
          <TabsTrigger value="tariffs"><Coins className="h-3.5 w-3.5 mr-1.5" />Tariffs</TabsTrigger>
        </TabsList>

        <TabsContent value="machines">
          <SectionCard title="Machines" description="3 production machines on shared power infrastructure" bodyClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Power (kW)</TableHead><TableHead className="text-right">PF</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {machines.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-mono text-xs font-semibold">{m.id}</TableCell>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell><StatusBadge status={m.status === "warning" ? "warning" : "running"} /></TableCell>
                    <TableCell className="text-right tabular-nums">{m.powerKw}</TableCell>
                    <TableCell className="text-right tabular-nums">{m.pf}</TableCell>
                    <TableCell><RowActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="sensors">
          <SectionCard title="Sensors" description="All connected sensors and protocols" bodyClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>ID</TableHead><TableHead>Machine</TableHead><TableHead>Type</TableHead><TableHead>Parameter</TableHead><TableHead>Unit</TableHead><TableHead>Protocol</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {sensors.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs font-semibold">{s.id}</TableCell>
                    <TableCell>{s.machine}</TableCell>
                    <TableCell className="font-medium">{s.type}</TableCell>
                    <TableCell className="text-sm">{s.param}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{s.unit}</TableCell>
                    <TableCell><span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s.protocol}</span></TableCell>
                    <TableCell><StatusBadge status="connected" label="Online" /></TableCell>
                    <TableCell><RowActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="thresholds">
          <SectionCard title="Alarm Thresholds" description="Min / max ranges per parameter" bodyClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Parameter</TableHead><TableHead className="text-right">Min</TableHead><TableHead className="text-right">Max</TableHead><TableHead>Unit</TableHead><TableHead>Alert Level</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {thresholds.map((t) => (
                  <TableRow key={t.param}>
                    <TableCell className="font-medium">{t.param}</TableCell>
                    <TableCell className="text-right tabular-nums">{t.min}</TableCell>
                    <TableCell className="text-right tabular-nums">{t.max}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{t.unit}</TableCell>
                    <TableCell><StatusBadge status={t.alert === "Critical" ? "critical" : "warning"} label={t.alert} /></TableCell>
                    <TableCell><RowActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="quality">
          <SectionCard title="Alloy Quality Standards" description="Composition spec ranges per element" bodyClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Element</TableHead><TableHead className="text-right">Min</TableHead><TableHead className="text-right">Max</TableHead><TableHead>Unit</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {qualityStandards.map((q) => (
                  <TableRow key={q.element}>
                    <TableCell className="font-medium">{q.element}</TableCell>
                    <TableCell className="text-right tabular-nums">{q.min}</TableCell>
                    <TableCell className="text-right tabular-nums">{q.max}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{q.unit}</TableCell>
                    <TableCell><RowActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>

        <TabsContent value="tariffs">
          <SectionCard title="Electricity Tariffs" description="Time-of-use rates for cost calculation" bodyClassName="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Period</TableHead><TableHead>Hours</TableHead><TableHead className="text-right">Rate</TableHead><TableHead>Unit</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {tariffs.map((t) => (
                  <TableRow key={t.period}>
                    <TableCell className="font-medium">{t.period}</TableCell>
                    <TableCell className="text-sm text-muted-foreground tabular-nums">{t.hours}</TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">{t.rate.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{t.unit}</TableCell>
                    <TableCell><RowActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}