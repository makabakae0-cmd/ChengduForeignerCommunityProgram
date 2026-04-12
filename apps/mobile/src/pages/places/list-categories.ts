export interface PlaceCategoryOption {
  value: string;
  label: {
    zh: string;
    en: string;
  };
}

export const PLACE_LIST_CATEGORIES: PlaceCategoryOption[] = [
  {
    value: "public-service",
    label: {
      zh: "公共服务",
      en: "Public Services"
    }
  },
  {
    value: "food",
    label: {
      zh: "餐饮",
      en: "Food"
    }
  }
];
