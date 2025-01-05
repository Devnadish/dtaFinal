interface WorkCategory {
  id: string;
  titleKey: string;
  icon: string;
  prefix: string;
  images?: string[]; // Assuming images are URLs or similar
}
export const workCategory: WorkCategory[] = [
  { id: "sm", titleKey: "smMenuTilte", icon: "simple-icons:dm", prefix: "sm" },
  {
    id: "uiux",
    titleKey: "uiUxMenuTitle",
    icon: "simple-icons:nextui",
    prefix: "ui",
  },
  {
    id: "identity",
    titleKey: "identityMenuTitle",
    icon: "simple-icons:accuweather",
    prefix: "identity",
  },
  {
    id: "signboard",
    titleKey: "singBoardMEnuTitle",
    icon: "teenyicons:sign-outline",
    prefix: "signboard",
  },
  {
    id: "cnc",
    titleKey: "cncMenuTitle",
    icon: "game-icons:circular-sawblade",
    prefix: "cnc",
  },
  {
    id: "character",
    titleKey: "Character",
    icon: "game-icons:charcuterie",
    prefix: "character",
  },
  {
    id: "coverpage",
    titleKey: "Coverpage",
    icon: "gis:landcover-map",
    prefix: "coverage",
  },
  {
    id: "logo",
    titleKey: "Logo",
    icon: "ion:logo-designernews",
    prefix: "logo",
  },
  {
    id: "flyer",
    titleKey: "flyer",
    icon: "codicon:file-media",
    prefix: "flyer",
  },
  {
    id: "infograph",
    titleKey: "infograph",
    icon: "tabler:chart-infographic",
    prefix: "infograph",
  },
  {
    id: "menu",
    titleKey: "menu",
    icon: "ic:sharp-restaurant-menu",
    prefix: "menu",
  },
  {
    id: "package",
    titleKey: "package",
    icon: "hugeicons:package",
    prefix: "package",
  },
  {
    id: "poster",
    titleKey: "poster",
    icon: "game-icons:target-poster",
    prefix: "poster",
  },
];
