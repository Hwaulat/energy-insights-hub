import { useState } from "react";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";
import { Bell, Moon, Sun, Search, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Real-time energy & machine monitoring" },
  "/reports": { title: "Reports", subtitle: "Energy, production, quality & cost reports" },
  "/alerts": { title: "Log Alert", subtitle: "System alerts & acknowledgement history" },
  "/master-data": { title: "Master Data", subtitle: "Machines, sensors, thresholds & standards" },
  "/users": { title: "Users Management", subtitle: "Accounts, roles & audit trail" },
};

const sampleNotifications = [
  {
    id: 1,
    title: "Critical: Mesin 2 Temperature",
    desc: "Suhu melebihi 950°C selama 2 menit.",
    time: "2m ago",
    level: "critical" as const,
  },
  {
    id: 2,
    title: "Warning: Power Factor Mesin 1",
    desc: "PF turun ke 0.78 (batas 0.85).",
    time: "18m ago",
    level: "warning" as const,
  },
  {
    id: 3,
    title: "Info: Batch B-2451 selesai",
    desc: "Quality check passed (Si 7.2%).",
    time: "1h ago",
    level: "info" as const,
  },
];

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const meta = titles[pathname] ?? titles["/"];
  const isDark = theme === "dark";

  return (
    <div className="flex flex-1 items-center gap-3">
      {/* Page title */}
      <div className="hidden md:flex flex-col leading-tight min-w-0">
        <h1 className="text-sm font-semibold text-foreground truncate">
          {meta.title}
        </h1>
        <p className="text-xs text-muted-foreground truncate">{meta.subtitle}</p>
      </div>

      {/* Search */}
      <div className="hidden lg:flex flex-1 max-w-sm ml-auto">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search machines, batches, alerts…"
            className="pl-9 h-9 bg-muted/50 border-border/60 focus-visible:bg-background"
          />
        </div>
      </div>

      {/* Right cluster — order (left → right): theme, notifications, profile */}
      <div className="flex items-center gap-1.5 ml-auto lg:ml-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Notifications */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-[360px] p-0 overflow-hidden animate-scale-in"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div>
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-muted-foreground">
                  3 new alerts today
                </p>
              </div>
              <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0">
                3 new
              </Badge>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
              {sampleNotifications.map((n) => {
                const dot =
                  n.level === "critical"
                    ? "bg-destructive"
                    : n.level === "warning"
                    ? "bg-warning"
                    : "bg-info";
                return (
                  <button
                    key={n.id}
                    className="w-full text-left px-4 py-3 flex gap-3 hover:bg-muted/60 border-b border-border last:border-0 transition-colors"
                  >
                    <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {n.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {n.desc}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">
                        {n.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-2 border-t border-border bg-muted/30">
              <Button variant="ghost" className="w-full h-8 text-xs">
                View all alerts
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 px-1.5 gap-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-semibold">
                  RA
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Rahmat Adi</span>
                <span className="text-[10px] text-muted-foreground">Administrator</span>
              </div>
              <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-scale-in">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold">Rahmat Adi</p>
                <p className="text-xs text-muted-foreground truncate">
                  rahmat@alloy-mfg.id
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Audit Trail</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}