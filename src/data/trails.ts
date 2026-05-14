import riisi from "@/assets/trail-riisi.jpg";
import riisi2 from "@/assets/trail-riisi2.jpg";
import korouoma from "@/assets/trail-korouoma.jpg";
import karhunkierros from "@/assets/trail-karhunkierros.jpg";
import gravel from "@/assets/trail-gravel.jpg";
import ruka from "@/assets/trail-ruka.jpg";
import palotunturi from "@/assets/trail-palotunturi.jpg";
import kayak from "@/assets/trail-kayak.jpg";
import kayak2 from "@/assets/trail-kayak2.jpg";
import lake from "@/assets/trail-lake.jpg";

export type TrailType = "hiking" | "cycling" | "mtb" | "gravel" | "fatbike" | "kayak";
export type Difficulty = "easy" | "medium" | "demanding";
export type Status = "open" | "partially_closed" | "seasonal";
export type Season = "all_year" | "summer" | "winter";

export interface Trail {
  id: string;
  name: string;
  park: string;
  shortDescription: string;
  description: string;
  type: TrailType;
  difficulty: Difficulty;
  lengthKm: number;
  durationHours: [number, number];
  loop: boolean;
  distanceFromPosioKm: number;
  status: Status;
  season: Season;
  warning?: string;
  facilities: string[];
  tags: string[];
  startPoint: { name: string; address: string; coords: [number, number] };
  links: { label: string; url: string }[];
  image: string;
  routeCoords: [number, number][];
}

export const trails: Trail[] = [
  {
    id: "riisin-raapasy",
    name: "Riisin rääpäsy",
    park: "Riisitunturi National Park",
    shortDescription: "Easy loop through the iconic crown-snow forests of Riisitunturi.",
    description:
      "A short loop trail circling the slopes of Riisitunturi fell. The route passes through old spruce forest famous for its 'crown snow' (tykkylumi) in winter and offers panoramic views from the open summit. Wooden duckboards keep your feet dry across the boggy sections. Beautiful in all seasons — snowshoeing in winter, wildflowers in summer.",
    type: "hiking",
    difficulty: "easy",
    lengthKm: 4.3,
    durationHours: [2, 3],
    loop: true,
    distanceFromPosioKm: 35,
    status: "open",
    season: "all_year",
    facilities: ["wilderness_hut", "campfire", "toilet", "parking"],
    tags: ["family", "snowshoe-friendly", "panorama"],
    startPoint: {
      name: "Riisitunturi parking",
      address: "Patoniementie, 97999 Posio",
      coords: [66.18, 28.14],
    },
    links: [{ label: "nationalparks.fi", url: "https://www.nationalparks.fi/riisitunturinp" }],
    image: riisi,
    routeCoords: [
      [66.180, 28.140], [66.188, 28.125], [66.198, 28.128],
      [66.204, 28.140], [66.202, 28.155], [66.194, 28.165],
      [66.184, 28.158], [66.180, 28.140],
    ],
  },
  {
    id: "riisin-rietas",
    name: "Riisin rietas",
    park: "Riisitunturi National Park",
    shortDescription: "Longer loop across hanging bogs and old-growth forest.",
    description:
      "The 'wilder' Riisi loop. Crosses the rare hanging bogs (rinnesuot) of Riisitunturi — a globally uncommon landscape where peat bogs cling to the hillside. Climbs to the open summit before descending back through dense old-growth forest. A great half-day adventure in summer or on snowshoes in winter.",
    type: "hiking",
    difficulty: "medium",
    lengthKm: 10.7,
    durationHours: [4, 5],
    loop: true,
    distanceFromPosioKm: 35,
    status: "open",
    season: "all_year",
    facilities: ["wilderness_hut", "campfire", "toilet", "parking"],
    tags: ["bogs", "panorama", "photographers"],
    startPoint: {
      name: "Riisitunturi parking",
      address: "Patoniementie, 97999 Posio",
      coords: [66.18, 28.14],
    },
    links: [{ label: "nationalparks.fi", url: "https://www.nationalparks.fi/riisitunturinp" }],
    image: riisi2,
    routeCoords: [
      [66.180, 28.140], [66.195, 28.108], [66.210, 28.112],
      [66.222, 28.130], [66.228, 28.155], [66.220, 28.185],
      [66.208, 28.198], [66.193, 28.190], [66.182, 28.168],
      [66.180, 28.140],
    ],
  },
  {
    id: "korouoma-frozen-falls",
    name: "Korouoma Frozen Falls",
    park: "Korouoma Nature Reserve",
    shortDescription: "Walk into the canyon to see Finland's famous frozen waterfalls.",
    description:
      "A short but spectacular winter descent into the Korouoma canyon to see the frozen waterfalls Jaska, Mammuttiputous and others. Best in February–March when ice climbers are at work on the frozen walls. The canyon walls rise 30–40 m on both sides. Steep stairs lead down to the canyon floor. Summer visits are also possible but the frozen falls are the main draw.",
    type: "hiking",
    difficulty: "medium",
    lengthKm: 5,
    durationHours: [2, 3],
    loop: false,
    distanceFromPosioKm: 30,
    status: "partially_closed",
    season: "winter",
    warning:
      "The 30 km long Korouoma loop is partially closed since 2019 — Pirunkirkko bridge was removed in 2021 and several huts are closed. Day routes from Saukkovaara remain open.",
    facilities: ["lean_to", "campfire", "toilet", "parking"],
    tags: ["winter", "ice-climbing", "canyon"],
    startPoint: {
      name: "Saukkovaara parking",
      address: "Korouomantie, 97700 Posio",
      coords: [66.31, 27.7],
    },
    links: [{ label: "nationalparks.fi", url: "https://www.nationalparks.fi/korouoma" }],
    image: korouoma,
    routeCoords: [
      [66.310, 27.700], [66.305, 27.712], [66.298, 27.728],
      [66.291, 27.742], [66.285, 27.755], [66.280, 27.762],
    ],
  },
  {
    id: "pieni-karhunkierros",
    name: "Pieni Karhunkierros",
    park: "Oulanka National Park",
    shortDescription: "The 'Little Bear's Trail' — Finland's most-loved day hike.",
    description:
      "A 12 km loop through the Oulanka river gorge, crossing dramatic hanging bridges and following rushing rapids. Starts and ends at the Juuma kiosk. Midsummer brings wildflowers and endless daylight. About 50 km from Posio, but absolutely worth the drive.",
    type: "hiking",
    difficulty: "medium",
    lengthKm: 12,
    durationHours: [4, 6],
    loop: true,
    distanceFromPosioKm: 50,
    status: "open",
    season: "summer",
    facilities: ["lean_to", "campfire", "water", "parking"],
    tags: ["river", "bridges", "iconic"],
    startPoint: {
      name: "Juuma kiosk",
      address: "Juumantie 133, 93999 Kuusamo",
      coords: [66.27, 29.38],
    },
    links: [{ label: "nationalparks.fi", url: "https://www.nationalparks.fi/oulankanp" }],
    image: karhunkierros,
    routeCoords: [
      [66.270, 29.380], [66.280, 29.360], [66.293, 29.368],
      [66.300, 29.390], [66.295, 29.418], [66.282, 29.438],
      [66.268, 29.430], [66.260, 29.408], [66.263, 29.390],
      [66.270, 29.380],
    ],
  },
  {
    id: "palotunturi-nature-path",
    name: "Palotunturi Nature Path",
    park: "Local — Posio",
    shortDescription: "Old-growth pine forest (200+ years) with a summit hut.",
    description:
      "A peaceful 4 km loop right next to Posio village. Climbs gently to the Palotunturi wilderness hut where you can rest by the campfire, then descends through 200-year-old pines. The closest trail to your accommodation. Lovely all year round.",
    type: "hiking",
    difficulty: "easy",
    lengthKm: 4,
    durationHours: [1, 2],
    loop: true,
    distanceFromPosioKm: 8,
    status: "open",
    season: "all_year",
    facilities: ["wilderness_hut", "campfire", "parking"],
    tags: ["family", "old-growth", "near-village"],
    startPoint: {
      name: "Palotunturi parking",
      address: "Palotunturintie, 97900 Posio",
      coords: [66.1, 28.16],
    },
    links: [],
    image: palotunturi,
    routeCoords: [
      [66.100, 28.160], [66.108, 28.148], [66.117, 28.152],
      [66.120, 28.165], [66.114, 28.178], [66.104, 28.174],
      [66.100, 28.160],
    ],
  },
  {
    id: "posio-gravel-loop",
    name: "Posio Gravel Loop",
    park: "Posio Region",
    shortDescription: "Multi-day bikepacking loop linking Korouoma, lakes & eskers.",
    description:
      "A 3–5 day bikepacking adventure starting from Posio. Day 1: Posio → Palotunturi wilderness hut (42 km, 350 m climbing). Day 2: Palotunturi → Keski-Voho lean-to (82 km, 1100 m). Mostly forest gravel and esker roads with a few singletrack sections. Cafés en route at Korouoma Wilderness Café and Livojärvi Kota Café.",
    type: "gravel",
    difficulty: "demanding",
    lengthKm: 180,
    durationHours: [24, 40],
    loop: true,
    distanceFromPosioKm: 0,
    status: "seasonal",
    season: "summer",
    facilities: ["wilderness_hut", "lean_to", "campfire", "water"],
    tags: ["bikepacking", "multi-day", "gravel"],
    startPoint: {
      name: "Posio village centre",
      address: "Kirkkotie, 97900 Posio",
      coords: [66.1, 28.16],
    },
    links: [{ label: "Bikeland.fi", url: "https://bikeland.fi/" }],
    image: gravel,
    routeCoords: [
      [66.100, 28.160], [66.140, 28.090], [66.200, 27.960],
      [66.310, 27.700], [66.380, 27.860], [66.420, 28.200],
      [66.390, 28.580], [66.300, 28.820], [66.210, 28.780],
      [66.150, 28.520], [66.110, 28.320], [66.100, 28.160],
    ],
  },
  {
    id: "kouvervaara-trail",
    name: "Kouvervaara Trail",
    park: "Ruka–Kuusamo",
    shortDescription: "43 km point-to-point combining gravel and flowing MTB.",
    description:
      "One of the signature rides of Ruka-Kuusamo. 25 km of gravel followed by 18 km of marked MTB singletrack ending at Ruka village. Best ridden on a hardtail or gravel bike with wide tyres. Trail is marked and maintained by the Ruka resort.",
    type: "mtb",
    difficulty: "medium",
    lengthKm: 43,
    durationHours: [4, 6],
    loop: false,
    distanceFromPosioKm: 45,
    status: "seasonal",
    season: "summer",
    facilities: ["water", "parking"],
    tags: ["mtb", "flow", "marked"],
    startPoint: {
      name: "Kouvervaara",
      address: "Kouvervaarantie, Kuusamo",
      coords: [66.16, 29.15],
    },
    links: [{ label: "ruka.fi cycling", url: "https://www.ruka.fi/en/cycling" }],
    image: ruka,
    routeCoords: [
      [66.160, 29.150], [66.178, 29.130], [66.200, 29.108],
      [66.225, 29.092], [66.248, 29.100], [66.268, 29.128],
      [66.285, 29.158], [66.300, 29.175],
    ],
  },
  {
    id: "posionjarvi-paddle",
    name: "Posionjärvi Lake Paddle",
    park: "Local — Posio",
    shortDescription: "Calm lake paddling from the village beach through forested islands.",
    description:
      "Launch from the sandy Posio beach and explore the forested islands of Posionjärvi. The lake is shallow and sheltered, ideal for beginners and families. Paddle south along the eastern shore for 8–10 km, passing several small islands and sandy bays. Return via the western shore for a full circuit. No portages required.",
    type: "kayak",
    difficulty: "easy",
    lengthKm: 12,
    durationHours: [2, 4],
    loop: true,
    distanceFromPosioKm: 1,
    status: "seasonal",
    season: "summer",
    facilities: ["parking", "water"],
    tags: ["beginner", "family", "islands", "lake"],
    startPoint: {
      name: "Posio village beach",
      address: "Rantatie, 97900 Posio",
      coords: [66.097, 28.163],
    },
    links: [],
    image: kayak,
    routeCoords: [
      [66.097, 28.163], [66.085, 28.172], [66.073, 28.180],
      [66.062, 28.172], [66.055, 28.155], [66.060, 28.138],
      [66.072, 28.130], [66.085, 28.138], [66.097, 28.163],
    ],
  },
  {
    id: "livojoki-river-float",
    name: "Livojoki River Float",
    park: "Posio Region",
    shortDescription: "Gentle river through boreal wilderness with good fishing.",
    description:
      "Put in at the Livojoki bridge north of Posio and float downstream through classic Finnish boreal landscape — pine-forested esker ridges, marshy bays and the occasional osprey. The river is calm with no significant rapids. Several pull-out spots for camping or day trips. Popular with anglers targeting grayling and pike.",
    type: "kayak",
    difficulty: "easy",
    lengthKm: 18,
    durationHours: [3, 5],
    loop: false,
    distanceFromPosioKm: 6,
    status: "seasonal",
    season: "summer",
    facilities: ["lean_to", "campfire", "parking"],
    tags: ["river", "fishing", "wilderness", "esker"],
    startPoint: {
      name: "Livojoki bridge launch",
      address: "Livojoentie, 97900 Posio",
      coords: [66.156, 28.042],
    },
    links: [],
    image: kayak2,
    routeCoords: [
      [66.156, 28.042], [66.145, 28.052], [66.133, 28.062],
      [66.120, 28.074], [66.108, 28.085], [66.095, 28.096],
      [66.082, 28.108],
    ],
  },
  {
    id: "oulanka-canoe-route",
    name: "Oulankajoki Canoe Route",
    park: "Oulanka National Park",
    shortDescription: "Classic Finnish whitewater canoe route through Oulanka gorge.",
    description:
      "One of Finland's most celebrated canoe routes. Put in at Juuma and paddle the Oulankajoki through the national park — steep gorge walls, demanding rapids (grades I–III), and wilderness campsites. The full route to Liikanen is 24 km. Portages are marked. Canoe and kayak hire available at the Juuma kiosk from Stella Polaris Adventures.",
    type: "kayak",
    difficulty: "medium",
    lengthKm: 24,
    durationHours: [5, 8],
    loop: false,
    distanceFromPosioKm: 50,
    status: "seasonal",
    season: "summer",
    warning: "Rapids up to grade III. Intermediate paddling skills required. Portages are well-marked.",
    facilities: ["lean_to", "campfire", "water", "parking"],
    tags: ["whitewater", "gorge", "classic", "camping"],
    startPoint: {
      name: "Juuma kiosk",
      address: "Juumantie 133, 93999 Kuusamo",
      coords: [66.27, 29.38],
    },
    links: [
      { label: "nationalparks.fi", url: "https://www.nationalparks.fi/oulankanp" },
      { label: "Stella Polaris gear hire", url: "https://stellapolaris.fi/en/equipment-rental/" },
    ],
    image: lake,
    routeCoords: [
      [66.270, 29.380], [66.272, 29.418], [66.276, 29.458],
      [66.281, 29.498], [66.287, 29.538], [66.293, 29.578],
      [66.298, 29.618],
    ],
  },
];

export const getTrail = (id: string) => trails.find((t) => t.id === id);
