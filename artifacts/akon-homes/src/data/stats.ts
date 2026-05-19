export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 850, suffix: "+", label: "Units Delivered" },
  { value: 12, suffix: "", label: "Premium Developments" },
  { value: 98, suffix: "%", label: "Occupancy Rate" },
];
