export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 2400, suffix: "+", label: "Homes Delivered" },
  { value: 6, suffix: "", label: "Countries" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];
