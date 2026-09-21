import type { Hospital, ProvinceData } from "./types";

export const filterOptions = {
  region: [
    { label: "全国", value: "all" },
    { label: "华北", value: "huabei" },
    { label: "华东", value: "huadong" },
    { label: "华南", value: "huanan" },
    { label: "华中", value: "huazhong" },
    { label: "西南", value: "xinan" },
    { label: "西北", value: "xibei" },
    { label: "东北", value: "dongbei" },
  ],
  hospitalLevel: [
    { label: "全部", value: "all" },
    { label: "三级甲等", value: "sanjiayi" },
    { label: "三级乙等", value: "sanjiyi" },
    { label: "二级甲等", value: "erjiayi" },
    { label: "二级乙等", value: "erjiyi" },
    { label: "一级", value: "yiji" },
  ],
  hospitalType: [
    { label: "全部", value: "all" },
    { label: "综合医院", value: "zonghe" },
    { label: "专科医院", value: "zhuanke" },
    { label: "中医医院", value: "zhongyi" },
    { label: "妇幼保健院", value: "fuyou" },
  ],
  deviceCategory: [
    { label: "全部", value: "all" },
    { label: "生化分析仪", value: "biochem" },
    { label: "免疫分析仪", value: "immuno" },
    { label: "血液分析仪", value: "hematology" },
    { label: "凝血分析仪", value: "coag" },
    { label: "尿沉渣分析仪", value: "urine" },
  ],
  deviceModel: [
    { label: "全部", value: "all" },
    { label: "BS-2000M", value: "bs2000m" },
    { label: "BS-2200", value: "bs2200" },
    { label: "CL-8000", value: "cl8000" },
    { label: "CL-6000", value: "cl6000" },
    { label: "BC-7500", value: "bc7500" },
    { label: "BC-6800", value: "bc6800" },
  ],
};

// 按省份分组的医院数量（用于地图展示）
export const provinceMapData: ProvinceData[] = [
  { name: "北京市", value: 24 },
  { name: "天津市", value: 12 },
  { name: "河北省", value: 35 },
  { name: "山西省", value: 18 },
  { name: "内蒙古自治区", value: 10 },
  { name: "辽宁省", value: 22 },
  { name: "吉林省", value: 14 },
  { name: "黑龙江省", value: 16 },
  { name: "上海市", value: 28 },
  { name: "江苏省", value: 42 },
  { name: "浙江省", value: 38 },
  { name: "安徽省", value: 20 },
  { name: "福建省", value: 25 },
  { name: "江西省", value: 18 },
  { name: "山东省", value: 40 },
  { name: "河南省", value: 30 },
  { name: "湖北省", value: 26 },
  { name: "湖南省", value: 22 },
  { name: "广东省", value: 48 },
  { name: "广西壮族自治区", value: 16 },
  { name: "海南省", value: 8 },
  { name: "重庆市", value: 15 },
  { name: "四川省", value: 32 },
  { name: "贵州省", value: 12 },
  { name: "云南省", value: 14 },
  { name: "西藏自治区", value: 3 },
  { name: "陕西省", value: 18 },
  { name: "甘肃省", value: 10 },
  { name: "青海省", value: 5 },
  { name: "宁夏回族自治区", value: 6 },
  { name: "新疆维吾尔自治区", value: 8 },
  { name: "台湾省", value: 0 },
  { name: "香港特别行政区", value: 0 },
  { name: "澳门特别行政区", value: 0 },
];

const provinces = [
  "北京市", "上海市", "广东省", "江苏省", "浙江省", "山东省", "四川省",
  "河南省", "湖北省", "湖南省", "福建省", "安徽省", "江西省", "辽宁省",
  "陕西省", "重庆市", "河北省", "山西省", "云南省", "广西壮族自治区",
];

const cities: Record<string, string[]> = {
  北京市: ["东城区", "西城区", "朝阳区", "海淀区"],
  上海市: ["黄浦区", "徐汇区", "浦东新区", "静安区"],
  广东省: ["广州", "深圳", "东莞", "佛山"],
  江苏省: ["南京", "苏州", "无锡", "常州"],
  浙江省: ["杭州", "宁波", "温州", "绍兴"],
  山东省: ["济南", "青岛", "烟台", "潍坊"],
  四川省: ["成都", "绵阳", "德阳", "宜宾"],
  河南省: ["郑州", "洛阳", "开封", "新乡"],
  湖北省: ["武汉", "宜昌", "襄阳", "荆州"],
  湖南省: ["长沙", "株洲", "湘潭", "衡阳"],
  福建省: ["福州", "厦门", "泉州", "漳州"],
  安徽省: ["合肥", "芜湖", "蚌埠", "安庆"],
  江西省: ["南昌", "上饶", "九江", "赣州"],
  辽宁省: ["沈阳", "大连", "鞍山", "锦州"],
  陕西省: ["西安", "宝鸡", "咸阳", "渭南"],
  重庆市: ["渝中区", "江北区", "沙坪坝区", "渝北区"],
  河北省: ["石家庄", "唐山", "保定", "邯郸"],
  山西省: ["太原", "大同", "运城", "临汾"],
  云南省: ["昆明", "曲靖", "大理", "红河"],
  广西壮族自治区: ["南宁", "柳州", "桂林", "梧州"],
};

const levels = ["三级甲等", "三级乙等", "二级甲等", "二级乙等"];
const types = ["综合医院", "专科医院", "中医医院", "妇幼保健院"];
const allDeviceModels = ["BS-2000M", "BS-2200", "CL-8000", "CL-6000", "BC-7500", "BC-6800"];
const statuses: Hospital["status"][] = ["active", "pending", "inactive"];

const hospitalNames = [
  "人民医院", "中心医院", "第一人民医院", "第二人民医院", "第三人民医院",
  "中西医结合医院", "中医院", "妇幼保健院", "肿瘤医院", "心血管病医院",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateHospitals(): Hospital[] {
  const hospitals: Hospital[] = [];
  for (const province of provinces) {
    const cityList = cities[province] || [province];
    const count = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < count; i++) {
      const city = randomItem(cityList);
      hospitals.push({
        id: `h${hospitals.length + 1}`,
        name: `${city}${randomItem(hospitalNames)}`,
        province,
        city,
        level: randomItem(levels),
        type: randomItem(types),
        deviceCount: Math.floor(Math.random() * 8) + 1,
        deviceModels: randomItems(allDeviceModels, 1, 4),
        status: randomItem(statuses),
      });
    }
  }
  return hospitals;
}

export const mockHospitals: Hospital[] = generateHospitals();
