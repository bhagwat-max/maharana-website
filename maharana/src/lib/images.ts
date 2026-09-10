/**
 * Central image utility.
 *
 * During development this resolves to curated, real Unsplash photography
 * (verified, hotlinkable IDs) grouped by subject. When real hotel photography
 * becomes available, replace the `id` values below — every component reads
 * through `img()`, so no JSX needs to change.
 */

const BASE = "https://images.unsplash.com/photo-";

export function img(id: string, width = 1600, quality = 80): string {
  return `${BASE}${id}?q=${quality}&w=${width}&auto=format&fit=crop`;
}

export const IMAGES = {
  architecture: {
    archway: "1682414181248-8b0d51289e88",
    carvedDoor: "1682414182071-385743071ec0",
    facade1: "1629725053305-9bb7886f9545",
    steps: "1682414180825-c0df1934387f",
    facade2: "1582998451055-5ce52763e246",
    windows: "1682414181845-a725f154a14a",
    monochrome: "1630986451252-b93e9e71af1a",
    laneway: "1682414180807-06299e2a66ca",
    aerial: "1682414181175-43b123e366a1",
    greenDoor: "1682414181308-400ec8176833",
    cityDusk: "1682414181159-6d470ea94f8c",
    skylight: "1682414181306-989d16258984",
    courtyardPatio: "1632641252948-ccbc2fb7d6e9",
  },
  rooms: {
    bedLinen: "1618773928121-c32242e63f39",
    gardenView: "1611892440504-42a792e24d32",
    bedGray: "1629140727571-9b5c6f6267b4",
    bedWhite: "1631049307264-da0ec9d70304",
    lobbyArch: "1573052905904-34ad8c27f0cc",
    pillows: "1576354302919-96748cb8299e",
    couch: "1590490360182-c33d57733427",
    bedLinen2: "1631049421450-348ccd7f8949",
  },
  dining: {
    thaliSilver: "1680993032090-1ef7ea9b51e5",
    platter: "1742281258189-3b933879867a",
    thaliSides: "1742281257687-092746ad6021",
    roundTray: "1546833999-b9f581a1996d",
    metalTray: "1711153419402-336ee48f2138",
    ceramicPlate: "1606843046080-45bf7a23c39f",
    plateFlowers: "1680359873864-43e89bf248ac",
  },
  textile: {
    scarves: "1779470703519-05af825e87cd",
    weaverHands: "1773739967506-2c858c8bde3c",
    market: "1763291966927-740c48e6afe5",
    stoneWallCraft: "1766585749270-441fb7a3a11f",
    fabricMarket: "1762764214015-d5c22646465b",
  },
} as const;
