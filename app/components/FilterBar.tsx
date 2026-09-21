"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterOptions } from "@/lib/mock-data";
import type { FilterOptions } from "@/lib/types";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
}

interface FilterConfig {
  key: keyof FilterOptions;
  label: string;
  options: { label: string; value: string }[];
}

const filterConfigs: FilterConfig[] = [
  { key: "region", label: "当前区域", options: filterOptions.region },
  { key: "hospitalLevel", label: "医院级别", options: filterOptions.hospitalLevel },
  { key: "hospitalType", label: "医院类型", options: filterOptions.hospitalType },
  { key: "deviceCategory", label: "开展装置", options: filterOptions.deviceCategory },
  { key: "deviceModel", label: "设备型号", options: filterOptions.deviceModel },
];

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex h-16 items-center gap-6 border-b bg-white px-6 dark:bg-zinc-950">
      {filterConfigs.map((config) => (
        <div key={config.key} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">
            {config.label}
          </label>
          <Select
            value={filters[config.key]}
            onValueChange={(value) => onFilterChange(config.key, value)}
          >
            <SelectTrigger className="h-8 w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
