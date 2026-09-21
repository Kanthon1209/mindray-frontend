"use client";

import { useMemo, useState, useCallback } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { ChinaMap } from "./components/ChinaMap";
import { HospitalPanel } from "./components/HospitalPanel";
import { mockHospitals, provinceMapData } from "@/lib/mock-data";
import type { FilterOptions } from "@/lib/types";

const defaultFilters: FilterOptions = {
  region: "all",
  hospitalLevel: "all",
  hospitalType: "all",
  deviceCategory: "all",
  deviceModel: "all",
};

// 省份名 -> 区域映射
const provinceRegionMap: Record<string, string> = {
  北京市: "huabei", 天津市: "huabei", 河北省: "huabei", 山西省: "huabei", 内蒙古自治区: "huabei",
  上海市: "huadong", 江苏省: "huadong", 浙江省: "huadong", 安徽省: "huadong", 福建省: "huadong", 江西省: "huadong", 山东省: "huadong",
  广东省: "huanan", 广西壮族自治区: "huanan", 海南省: "huanan",
  河南省: "huazhong", 湖北省: "huazhong", 湖南省: "huazhong",
  重庆市: "xinan", 四川省: "xinan", 贵州省: "xinan", 云南省: "xinan", 西藏自治区: "xinan",
  陕西省: "xibei", 甘肃省: "xibei", 青海省: "xibei", 宁夏回族自治区: "xibei", 新疆维吾尔自治区: "xibei",
  辽宁省: "dongbei", 吉林省: "dongbei", 黑龙江省: "dongbei",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>();

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setSelectedProvince(undefined);
    },
    []
  );

  const handleProvinceClick = useCallback((provinceName: string) => {
    setSelectedProvince((prev) =>
      prev === provinceName ? undefined : provinceName
    );
  }, []);

  // 过滤医院列表
  const filteredHospitals = useMemo(() => {
    let result = mockHospitals;

    // 区域筛选
    if (filters.region !== "all") {
      result = result.filter(
        (h) => provinceRegionMap[h.province] === filters.region
      );
    }

    // 医院级别筛选
    if (filters.hospitalLevel !== "all") {
      const levelMap: Record<string, string> = {
        sanjiayi: "三级甲等",
        sanjiyi: "三级乙等",
        erjiayi: "二级甲等",
        erjiyi: "二级乙等",
        yiji: "一级",
      };
      const target = levelMap[filters.hospitalLevel];
      if (target) result = result.filter((h) => h.level === target);
    }

    // 医院类型筛选
    if (filters.hospitalType !== "all") {
      const typeMap: Record<string, string> = {
        zonghe: "综合医院",
        zhuanke: "专科医院",
        zhongyi: "中医医院",
        fuyou: "妇幼保健院",
      };
      const target = typeMap[filters.hospitalType];
      if (target) result = result.filter((h) => h.type === target);
    }

    // 设备型号筛选
    if (filters.deviceModel !== "all") {
      const modelMap: Record<string, string> = {
        bs2000m: "BS-2000M",
        bs2200: "BS-2200",
        cl8000: "CL-8000",
        cl6000: "CL-6000",
        bc7500: "BC-7500",
        bc6800: "BC-6800",
      };
      const target = modelMap[filters.deviceModel];
      if (target) {
        result = result.filter((h) => h.deviceModels.includes(target));
      }
    }

    // 省份点击筛选
    if (selectedProvince) {
      result = result.filter((h) => h.province === selectedProvince);
    }

    return result;
  }, [filters, selectedProvince]);

  // 过滤地图数据（只过滤区域）
  const mapData = useMemo(() => {
    if (filters.region === "all") return provinceMapData;

    return provinceMapData.filter(
      (p) => provinceRegionMap[p.name] === filters.region
    );
  }, [filters.region]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 dark:bg-zinc-900">
      <Header />

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      <main
        className="grid min-h-0 flex-1"
        style={{ gridTemplateColumns: "minmax(0, 7fr) minmax(360px, 3fr)" }}
      >
        {/* 左侧地图区域 */}
        <div className="relative min-h-0 overflow-hidden border-r bg-white dark:bg-zinc-950">
          <ChinaMap
            data={mapData}
            onProvinceClick={handleProvinceClick}
            selectedProvince={selectedProvince}
          />
          {selectedProvince && (
            <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium shadow-md dark:bg-zinc-900/90">
              已选择: {selectedProvince}
              <button
                onClick={() => setSelectedProvince(undefined)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* 右侧医院面板 */}
        <HospitalPanel
          hospitals={filteredHospitals}
          selectedProvince={selectedProvince}
        />
      </main>
    </div>
  );
}
