"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import type { EChartsType } from "echarts/core";
import { MapChart } from "echarts/charts";
import {
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ProvinceData } from "@/lib/types";

echarts.use([
  MapChart,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  TitleComponent,
  CanvasRenderer,
]);

interface ChinaMapProps {
  data: ProvinceData[];
  onProvinceClick?: (provinceName: string) => void;
  selectedProvince?: string;
}

// 优先使用本地 GeoJSON，远程作为备用
const CHINA_MAP_LOCAL = "/china.json";
const CHINA_MAP_REMOTE =
  "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";

let mapRegistered = false;

export function ChinaMap({ data, onProvinceClick, selectedProvince }: ChinaMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<EChartsType | null>(null);

  // 初始化图表
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstanceRef.current = chart;

    return () => {
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  // 加载地图数据并设置 option
  useEffect(() => {
    if (!chartInstanceRef.current) return;

    const chart = chartInstanceRef.current;

    const renderOption = () => {
      const max = Math.max(...data.map((d) => d.value), 1);

      chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: (params: { name: string; value?: number }) => {
            const val = params.value ?? 0;
            return `${params.name}<br/>医院数量：${val}`;
          },
        },
        visualMap: {
          left: "right",
          top: "bottom",
          min: 0,
          max,
          inRange: {
            color: [
              "#e0f2fe",
              "#bae6fd",
              "#7dd3fc",
              "#38bdf8",
              "#0ea5e9",
              "#0284c7",
              "#1e40af",
            ],
          },
          text: ["多", "少"],
          calculable: true,
          textStyle: {
            fontSize: 11,
          },
        },
        series: [
          {
            name: "医院分布",
            type: "map",
            map: "china",
            roam: false,
            layoutCenter: "center",
            layoutSize: "95%",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 10,
              },
            },
            data: data.map((item) => ({
              name: item.name,
              value: item.value,
            })),
          },
        ],
      });

      chart.on("click", (params: { name: string }) => {
        if (onProvinceClick) {
          onProvinceClick(params.name);
        }
      });
    };

    if (mapRegistered) {
      renderOption();
      return;
    }

    // 加载地图 GeoJSON（优先本地，远程备用）
    const loadMap = async (url: string): Promise<unknown> => {
      const res = await fetch(url);
      const text = await res.text();
      // 检查响应是否为有效 JSON
      if (text.trim().startsWith("<")) {
        throw new Error(`返回内容非 JSON: ${url}`);
      }
      return JSON.parse(text);
    };

    loadMap(CHINA_MAP_LOCAL)
      .catch(() => {
        console.warn("本地地图数据加载失败，尝试远程数据源...");
        return loadMap(CHINA_MAP_REMOTE);
      })
      .then((geoJson) => {
        echarts.registerMap("china", geoJson as Parameters<typeof echarts.registerMap>[1]);
        mapRegistered = true;
        renderOption();
      })
      .catch((err) => {
        console.error("加载地图数据失败:", err);
      });
  }, [data, onProvinceClick, selectedProvince]);

  // 响应式调整
  useEffect(() => {
    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={chartRef} className="h-full w-full" />;
}
