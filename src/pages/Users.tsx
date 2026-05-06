import { useMemo, useState } from "react";
import { Search, UserPlus, ShieldCheck, Pencil, Trash2, Activity } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users as initialUsers } from "@/lib/mock-data";

const roleStyle: Record<string, string> = {
  Admin:      "bg-primary/10 text-primary",
  Supervisor: "bg-accent/15 text-accent-foreground",
  Operator:   "bg-info/10 text-info",
  Viewer:     "bg-muted text-muted-foreground",
};

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

const auditTrail = [
  { user: "Rahmat Adi",  action: "Updated threshold: Temperature max → 950°C", time: "08:42:11", ip: "10.0.1.21" },
  { user: "Dewi Kurnia", action: "Acknowledged alert A-1040",                  time: "08:18:55", ip: "10.0.1.45" },
  { user: "Bagas P.",    action: "Logged in",                                  time: "07:32:01", ip: "10.0.1.78" },
  { user: "Rahmat Adi",  action: "Created user: Sinta Wulandari",              time: "Yesterday 16:12", ip: "10.0.1.21" },
];

export default function Users() {
  const [list] = useState(initialUsers);
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      list.filter(
        (u) =>
          q === "" ||
          u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.email.toLowerCase().includes(q.toLowerCase()) ||
          u.role.toLowerCase().includes(q.toLowerCase())
      ),
    [list, q]
  );

  const counts = {
    total: list.length,
    admin: list.filter((u) => u.role === "Admin").length,
    active: list.filter((u) => u.status === "active").length,
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Users Management"
        description="Manage user accounts, roles, permissions, and audit trail."
        actions={
          <Button size="sm" className="gap-2 gradient-primary border-0 text-primary-foreground hover:opacity-90 transition-opacity">
            <UserPlus className="h-3.5 w-3.5" />
            Add User
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Users"   value={String(counts.total)}  icon={ShieldCheck} accent="primary" />
        <StatCard label="Administrators" value={String(counts.admin)} icon={ShieldCheck} accent="info" />
        <StatCard label="Active Today"  value={String(counts.active)} icon={Activity}    accent="success" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          title="Users"
          description={`${filtered.length} accounts`}
          className="xl:col-span-2"
          actions={
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search users…"
                className="pl-8 h-8 w-44 text-xs"
              />
            </div>
          }
          bodyClassName="p-0"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                          {initials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${roleStyle[u.role] ?? ""}`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={u.status === "active" ? "running" : "stopped"}
                      label={u.status === "active" ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground tabular-nums">{u.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Audit Trail" description="Recent activity">
          <ul className="space-y-3">
            {auditTrail.map((a, i) => (
              <li key={i} className="flex gap-3 pb-3 last:pb-0 border-b last:border-0 border-border">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">{a.user}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{a.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                    {a.time} · {a.ip}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}