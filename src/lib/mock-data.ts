// Mock data based on PRD-EMS-ALLOY-001 v1.0

export const machines = [
  {
    id: "M-01",
    name: "Casting & Holding Furnace",
    status: "running" as const,
    flowLpm: 11.89,
    holdingC: 719.4,
    castingC: 697.27,
    powerKw: 58.55,
    currentA: 90.96,
    avgPowerFactor: 0.92,
    todaysEnergyKwh: 1400,
    cumulativeGwh: 4.65,
    weeklyEnergy: [
      { day: "Mon", kwh: 460 },
      { day: "Tue", kwh: 472 },
      { day: "Wed", kwh: 455 },
      { day: "Thu", kwh: 468 },
      { day: "Fri", kwh: 486 },
      { day: "Sat", kwh: 432 },
      { day: "Sun", kwh: 410 },
    ],
  },
  {
    id: "M-02",
    name: "Homogenizing Furnace",
    status: "running" as const,
    flowLpm: 8.46,
    tempC: 560.47,
    powerKw: 50.55,
    currentA: 78.09,
    avgPowerFactor: 0.88,
    todaysEnergyKwh: 1100,
    cumulativeGwh: 4.80,
    weeklyEnergy: [
      { day: "Mon", kwh: 500 },
      { day: "Tue", kwh: 512 },
      { day: "Wed", kwh: 495 },
      { day: "Thu", kwh: 520 },
      { day: "Fri", kwh: 535 },
      { day: "Sat", kwh: 482 },
      { day: "Sun", kwh: 456 },
    ],
  },
  {
    id: "M-03",
    name: "Counter / Quantity Output",
    status: "running" as const,
    outputPcs: 1625,
    rejectPcs: 14,
    ratePcsH: 125,
    targetPcs: 1500,
    powerKw: 34.23,
    currentA: 54.99,
    avgPowerFactor: 0.95,
    todaysEnergyKwh: 902,
    cumulativeGwh: 3.39,
    weeklyEnergy: [
      { day: "Mon", kwh: 320 },
      { day: "Tue", kwh: 332 },
      { day: "Wed", kwh: 310 },
      { day: "Thu", kwh: 340 },
      { day: "Fri", kwh: 365 },
      { day: "Sat", kwh: 332 },
      { day: "Sun", kwh: 305 },
    ],
  },
];

// 24h energy trend (kW per hour)
export const energyTrend = Array.from({ length: 24 }, (_, h) => {
  const base = 145 + Math.sin((h / 24) * Math.PI * 2) * 22;
  return {
    time: `${String(h).padStart(2, "0")}:00`,
    m1: Math.round((base / 3 + Math.random() * 8) * 10) / 10,
    m2: Math.round((base / 3 + Math.random() * 10) * 10) / 10,
    m3: Math.round((base / 3 + Math.random() * 6) * 10) / 10,
  };
});

// Cumulative energy (last 7 days, GWh)
export const cumulativeEnergy = [
  { day: "Mon", kwh: 3120 },
  { day: "Tue", kwh: 3284 },
  { day: "Wed", kwh: 3198 },
  { day: "Thu", kwh: 3402 },
  { day: "Fri", kwh: 3520 },
  { day: "Sat", kwh: 2980 },
  { day: "Sun", kwh: 2810 },
];

export const plcStatus = [
  { id: "PLC-01", machine: "Mesin 1", status: "connected" as const, latencyMs: 18, lastUpdate: "2s ago" },
  { id: "PLC-02", machine: "Mesin 2", status: "connected" as const, latencyMs: 24, lastUpdate: "1s ago" },
  { id: "PLC-03", machine: "Mesin 3", status: "error" as const, latencyMs: 412, lastUpdate: "12s ago" },
];

export const alloyComposition = [
  { element: "Mg", stdMin: 0.45, stdMax: 0.90, ave: 0.62, n1: 0.61, status: "in-range" as const },
  { element: "Si", stdMin: 0.20, stdMax: 0.60, ave: 0.38, n1: 0.40, status: "in-range" as const },
  { element: "Cu", stdMin: 0.00, stdMax: 0.10, ave: 0.04, n1: 0.05, status: "in-range" as const },
  { element: "Fe", stdMin: 0.00, stdMax: 0.35, ave: 0.18, n1: 0.19, status: "in-range" as const },
  { element: "Mn", stdMin: 0.00, stdMax: 0.10, ave: 0.03, n1: 0.03, status: "in-range" as const },
  { element: "Cr", stdMin: 0.00, stdMax: 0.10, ave: 0.02, n1: 0.02, status: "in-range" as const },
  { element: "Ti", stdMin: 0.00, stdMax: 0.10, ave: 0.05, n1: 0.05, status: "in-range" as const },
  { element: "Zn", stdMin: 0.00, stdMax: 0.10, ave: 0.04, n1: 0.03, status: "in-range" as const },
  { element: "Ni", stdMin: 0.00, stdMax: 0.05, ave: 0.07, n1: 0.08, status: "out-of-range" as const },
  { element: "B", stdMin: 0.00, stdMax: 0.05, ave: 0.01, n1: 0.01, status: "in-range" as const },
  { element: "V", stdMin: 0.00, stdMax: 0.05, ave: 0.02, n1: 0.02, status: "in-range" as const },
  { element: "Zr", stdMin: 0.00, stdMax: 0.05, ave: 0.01, n1: 0.01, status: "in-range" as const },
  { element: "AL", stdMin: 97.80, stdMax: 99.00, ave: 98.94, n1: 98.93, status: "in-range" as const },
  { element: "Int", stdMin: null, stdMax: null, ave: 0.02, n1: 0.02, status: "in-range" as const },
];

export const alloyQuality = [
  { batch: "B-2451", machine: "Mesin 1", si: 7.20, fe: 0.42, cu: 0.08, mn: 0.35, mg: 0.45, status: "in-range" as const },
  { batch: "B-2452", machine: "Mesin 2", si: 8.95, fe: 0.55, cu: 0.12, mn: 0.40, mg: 0.50, status: "out-of-range" as const },
  { batch: "B-2453", machine: "Mesin 3", si: 7.05, fe: 0.38, cu: 0.07, mn: 0.32, mg: 0.42, status: "in-range" as const },
  { batch: "B-2454", machine: "Mesin 1", si: 7.45, fe: 0.40, cu: 0.09, mn: 0.36, mg: 0.46, status: "in-range" as const },
  { batch: "B-2455", machine: "Mesin 2", si: 7.18, fe: 0.41, cu: 0.10, mn: 0.34, mg: 0.44, status: "in-range" as const },
];

export type AlertLevel = "critical" | "warning" | "info";
export type AlertStatus = "active" | "ack" | "resolved";

export const alerts: Array<{
  id: string;
  timestamp: string;
  level: AlertLevel;
  source: string;
  parameter: string;
  value: string;
  threshold: string;
  status: AlertStatus;
  duration: string;
  ackBy?: string;
}> = [
  { id: "A-1042", timestamp: "2025-05-06 09:42:11", level: "critical", source: "Mesin 2", parameter: "Temperature", value: "962°C", threshold: "≤ 950°C", status: "active",   duration: "00:04:12" },
  { id: "A-1041", timestamp: "2025-05-06 09:14:02", level: "warning",  source: "Mesin 1", parameter: "Power Factor", value: "0.78",  threshold: "≥ 0.85",  status: "active",   duration: "00:32:21" },
  { id: "A-1040", timestamp: "2025-05-06 08:48:55", level: "warning",  source: "Mesin 3", parameter: "Flow Rate",     value: "8.2 L/m", threshold: "≥ 10 L/m", status: "ack", duration: "00:58:00", ackBy: "Rahmat A." },
  { id: "A-1039", timestamp: "2025-05-06 07:22:31", level: "info",     source: "Sistem",  parameter: "PLC-03",        value: "Reconnected", threshold: "—", status: "resolved", duration: "00:01:45", ackBy: "System" },
  { id: "A-1038", timestamp: "2025-05-05 23:12:18", level: "critical", source: "Mesin 2", parameter: "Quality (Si)",  value: "8.95%",  threshold: "6.5–8.5%", status: "resolved", duration: "01:12:00", ackBy: "Dewi K." },
  { id: "A-1037", timestamp: "2025-05-05 21:04:09", level: "warning",  source: "Mesin 1", parameter: "Voltage",       value: "412 V",  threshold: "≤ 410 V",   status: "resolved", duration: "00:18:30", ackBy: "Rahmat A." },
];

export const users = [
  { id: 1, name: "Rahmat Adi",    email: "rahmat@alloy-mfg.id", role: "Admin",      status: "active",  lastLogin: "2025-05-06 08:12" },
  { id: 2, name: "Dewi Kurnia",   email: "dewi@alloy-mfg.id",   role: "Supervisor", status: "active",  lastLogin: "2025-05-06 07:45" },
  { id: 3, name: "Bagas Pratama", email: "bagas@alloy-mfg.id",  role: "Operator",   status: "active",  lastLogin: "2025-05-05 22:18" },
  { id: 4, name: "Sinta Wulandari", email: "sinta@alloy-mfg.id",role: "Operator",   status: "active",  lastLogin: "2025-05-05 14:02" },
  { id: 5, name: "Eko Santoso",   email: "eko@alloy-mfg.id",    role: "Viewer",     status: "inactive",lastLogin: "2025-04-28 09:30" },
];

export const sensors = [
  { id: "S-101", machine: "Mesin 1", type: "Power Meter",  param: "Voltage/Current/Power", unit: "V/A/kW",  protocol: "Modbus TCP", status: "online" },
  { id: "S-102", machine: "Mesin 1", type: "Thermocouple", param: "Temperature",            unit: "°C",     protocol: "OPC-UA",     status: "online" },
  { id: "S-103", machine: "Mesin 1", type: "Flowmeter",    param: "Coolant Flow",           unit: "L/min",  protocol: "Modbus TCP", status: "online" },
  { id: "S-201", machine: "Mesin 2", type: "Power Meter",  param: "Voltage/Current/Power", unit: "V/A/kW",  protocol: "Modbus TCP", status: "online" },
  { id: "S-202", machine: "Mesin 2", type: "Thermocouple", param: "Temperature",            unit: "°C",     protocol: "OPC-UA",     status: "online" },
  { id: "S-301", machine: "Mesin 3", type: "Power Meter",  param: "Voltage/Current/Power", unit: "V/A/kW",  protocol: "Modbus TCP", status: "online" },
  { id: "S-302", machine: "Mesin 3", type: "Counter",      param: "Production Count",       unit: "pcs",    protocol: "Modbus TCP", status: "online" },
];

export const thresholds = [
  { param: "Voltage",       min: 380,  max: 420,  unit: "V",   alert: "Critical" },
  { param: "Current",       min: 0,    max: 120,  unit: "A",   alert: "Warning" },
  { param: "Power",         min: 0,    max: 80,   unit: "kW",  alert: "Warning" },
  { param: "Frequency",     min: 48,   max: 52,   unit: "Hz",  alert: "Critical" },
  { param: "Power Factor",  min: 0.85, max: 1.0,  unit: "—",   alert: "Warning" },
  { param: "Temperature",   min: 600,  max: 950,  unit: "°C",  alert: "Critical" },
  { param: "Flow Rate",     min: 10,   max: 20,   unit: "L/min", alert: "Warning" },
];

export const qualityStandards = [
  { element: "Si (Silicon)",   min: 6.5,  max: 8.5, unit: "%" },
  { element: "Fe (Iron)",      min: 0,    max: 0.5, unit: "%" },
  { element: "Cu (Copper)",    min: 0,    max: 0.1, unit: "%" },
  { element: "Mn (Manganese)", min: 0.2,  max: 0.5, unit: "%" },
  { element: "Mg (Magnesium)", min: 0.3,  max: 0.5, unit: "%" },
];

export const tariffs = [
  { period: "WBP (Peak)",     hours: "18:00 – 22:00", rate: 1644.5, unit: "Rp/kWh" },
  { period: "LWBP (Off-Peak)", hours: "22:00 – 18:00", rate: 1035.8, unit: "Rp/kWh" },
];