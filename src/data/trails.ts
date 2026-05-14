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
import kattavalahti from "@/assets/trail-kattavalahti.jpg";
import riisiWinter from "@/assets/trail-riisi-winter.jpg";
import riisi2Winter from "@/assets/trail-riisi2-winter.jpg";
import korouomaWinter from "@/assets/trail-korouoma-winter.jpg";
import palotunturiWinter from "@/assets/trail-palotunturi-winter.jpg";

export type TrailType = "hiking" | "cycling" | "mtb" | "gravel" | "fatbike" | "kayak" | "skiing";
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
  winterImage?: string;
  routeCoords: [number, number][];
  lit?: boolean;
  skiStyle?: "skating" | "classic" | "both";
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
    winterImage: riisiWinter,
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
    winterImage: riisi2Winter,
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
    winterImage: korouomaWinter,
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
    winterImage: palotunturiWinter,
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
    id: "kattavalahti-bay-loop",
    name: "Kattavalahti Bay Loop",
    park: "Local — Posio",
    shortDescription: "Sheltered bay circuit launching from the Lapin Satu pier, circling the quiet Kattavalahti inlet.",
    description:
      "Launch from the municipal slipway beside Hotel Lapin Satu and paddle a full circuit of Kattavalahti, the sheltered bay that wraps around the Kattavaniemi headland. The water is calm and the forested shoreline makes this a perfect first paddle in the Posio area. The northern arm broadens into the main body of Posionjärvi, where you may spot white-tailed eagles fishing the shallows. Finish by rounding the tip of the headland and gliding back to the slipway. No portages, no rapids — just quiet boreal lake paddling a short walk from your accommodation.",
    type: "kayak",
    difficulty: "easy",
    lengthKm: 3.1,
    durationHours: [2, 3],
    loop: true,
    distanceFromPosioKm: 2,
    status: "seasonal",
    season: "summer",
    facilities: ["parking", "water"],
    tags: ["bay", "calm", "hotel", "beginner", "lake"],
    startPoint: {
      name: "Lapin Satu municipal slipway",
      address: "Kattavaniementie 1, 97900 Posio",
      coords: [66.095187, 28.135625],
    },
    links: [{ label: "Hotel Lapin Satu", url: "https://lapinsatu.com/en" }],
    image: kattavalahti,
    routeCoords: [
      [66.095194, 28.135639],
      [66.096436, 28.130270],
      [66.098322, 28.131839],
      [66.101492, 28.133515],
      [66.101907, 28.117205],
      [66.099094, 28.129122],
      [66.094211, 28.129289],
      [66.095173, 28.135624],
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
  {
    id: "kotivaaran-latu",
    name: "Kotivaaran latu",
    park: "Local — Posio",
    shortDescription: "Lit 5 km skating loop behind Posio sports field — groomed nightly, lit until 21:00.",
    description:
      "The main lit cross-country skiing loop in Posio, starting from the municipal sports field on Maaninkavaarantie. The track winds through the Kotivaara hill terrain with a few short climbs, making it a proper workout despite its compact length. It is machine-groomed for skating style (luistelutyyli) and illuminated until 21:00, so evening laps are possible even in the darkest weeks of January. One of the earliest trails to be prepared each season and the easiest to reach from the village centre. Dogs are not permitted on this track.",
    type: "skiing",
    difficulty: "medium",
    lengthKm: 5,
    durationHours: [0.5, 1.5],
    loop: true,
    distanceFromPosioKm: 0,
    status: "seasonal",
    season: "winter",
    lit: true,
    skiStyle: "skating",
    facilities: ["parking", "lit_track"],
    tags: ["lit", "skating", "training", "village"],
    startPoint: {
      name: "Posio sports field",
      address: "Maaninkavaarantie 1, 97900 Posio",
      coords: [66.1107, 28.1760],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "outdooractive.fi", url: "https://www.outdooractive.fi/fi/route/maastohiihto/posio/kotivaaran-latu-5km-/55297315/" },
    ],
    image: palotunturiWinter,
    routeCoords: [
      [66.1107, 28.1760], [66.1145, 28.1715], [66.1195, 28.1740],
      [66.1228, 28.1828], [66.1212, 28.1922], [66.1158, 28.1965],
      [66.1098, 28.1942], [66.1058, 28.1868], [66.1068, 28.1792],
      [66.1107, 28.1760],
    ],
  },
  {
    id: "kirintövaaran-ladut",
    name: "Kirintövaaran ladut",
    park: "Local — Posio",
    shortDescription: "Lit 15 km ski network at Kirintövaara fell — classic & skating, illuminated until 21:00.",
    description:
      "The main ski trail network in Posio, set around the Kirintövaara fell about 8 km from the village centre. Roughly 15 km of groomed terrain with a mix of open fell traverses and forested climbs, rated medium difficulty. Both classic (perinteinen) and skating (vapaa) tracks are prepared and illuminated until 21:00 — evening laps are possible throughout the season. This is the most versatile ski destination in the Posio area; shorter inner loops can be combined or linked with the Pentik-mäki connector for a longer outing. Ski rental available nearby at Lomakeskus Himmerki (approx. 15 €/day). Check infogis.fi/posio for grooming status before you go.",
    type: "skiing",
    difficulty: "medium",
    lengthKm: 15,
    durationHours: [1, 2.5],
    loop: true,
    distanceFromPosioKm: 8,
    status: "seasonal",
    season: "winter",
    lit: true,
    skiStyle: "both",
    facilities: ["parking", "lit_track"],
    tags: ["lit", "skating", "classic", "training", "fell"],
    startPoint: {
      name: "Kirintövaara ski centre",
      address: "Kiririnteentie 1, 97900 Posio",
      coords: [66.1485, 28.2050],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "outdooractive.fi", url: "https://www.outdooractive.fi/fi/route/maastohiihto/posio/kirintoevaaran-ladut/58987554/" },
      { label: "posiolapland.com — ski trails", url: "https://posiolapland.com/hiihtoladut/" },
    ],
    image: riisi2Winter,
    routeCoords: [
      [66.1485, 28.2050], [66.1550, 28.1970], [66.1630, 28.1910],
      [66.1700, 28.1990], [66.1730, 28.2130], [66.1700, 28.2280],
      [66.1620, 28.2370], [66.1530, 28.2340], [66.1460, 28.2230],
      [66.1430, 28.2120], [66.1485, 28.2050],
    ],
  },
  {
    id: "pentik-maki-kirintovaara-latu",
    name: "Pentik-mäki – Kirintövaara latu",
    park: "Local — Posio",
    shortDescription: "Lit 13.8 km connector linking the village sports field to Kirintövaara — flat training route for classic and skating.",
    description:
      "A long lit training route that runs from the Pentik-mäki area near the village sports field all the way to Kirintövaara, covering 13.8 km of mostly gentle terrain. Because the route is largely flat it works well as a high-volume training trail and also makes a natural warm-up or cool-down leg for a longer Kirintövaara session. Both classic and skating tracks are prepared (perinteinen ja vapaa) and the trail is illuminated until 21:00. Start from the sports field parking on Maaninkavaarantie or from the Erämaahotelli Kirikeskus lot at the Kirintövaara end. Check infogis.fi/posio for real-time grooming status.",
    type: "skiing",
    difficulty: "easy",
    lengthKm: 13.8,
    durationHours: [1, 2],
    loop: false,
    distanceFromPosioKm: 0,
    status: "seasonal",
    season: "winter",
    lit: true,
    skiStyle: "both",
    facilities: ["parking", "lit_track"],
    tags: ["lit", "skating", "classic", "training", "connector"],
    startPoint: {
      name: "Pentik-mäki / Posio sports field",
      address: "Maaninkavaarantie 5, 97900 Posio",
      coords: [66.0952, 28.1476],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "outdooractive.fi", url: "https://www.outdooractive.fi/fi/route/maastohiihto/finland/pentik-maeki-kirintoevaara-latu-13-8km-/55297512/" },
    ],
    image: palotunturiWinter,
    routeCoords: [
      [66.0952, 28.1476], [66.1020, 28.1540], [66.1090, 28.1620],
      [66.1160, 28.1720], [66.1230, 28.1830], [66.1290, 28.1920],
      [66.1350, 28.1980], [66.1410, 28.2020], [66.1485, 28.2050],
    ],
  },
  {
    id: "karitunturin-eramaalatu",
    name: "Karitunturin erämaalatu",
    park: "Local — Posio",
    shortDescription: "Demanding 14 km wilderness ski route from Kirintövaara to Karitunturi fell — classic and skating, unlit.",
    description:
      "A scenic wilderness route (erämaalatu) running 14 km from the Kirintövaara ski centre to the open summit of Karitunturi fell. The trail climbs significantly on both the approach and descent and is rated demanding — steep sections make it unsuitable for beginners. Both classic and skating tracks are prepared (perinteinen ja vapaa) but the route is not illuminated, so plan to ski it in daylight. The summit section offers wide fell panoramas across the Posio landscape. Start from the Erämaahotelli Kirikeskus parking area at Kirintövaara. Check infogis.fi/posio before setting out — this wilderness route may open later in the season than the village loops.",
    type: "skiing",
    difficulty: "demanding",
    lengthKm: 14,
    durationHours: [2, 3.5],
    loop: false,
    distanceFromPosioKm: 8,
    status: "seasonal",
    season: "winter",
    lit: false,
    skiStyle: "both",
    facilities: ["parking"],
    tags: ["wilderness", "fell", "panorama", "demanding", "classic", "skating"],
    startPoint: {
      name: "Erämaahotelli Kirikeskus / Kirintövaara",
      address: "Kiririnteentie 1, 97900 Posio",
      coords: [66.1485, 28.2050],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "outdooractive.fi", url: "https://www.outdooractive.fi/fi/route/maastohiihto/finland/karitunturin-eraemaalatu-14km-/59184421/" },
    ],
    image: korouomaWinter,
    routeCoords: [
      [66.1485, 28.2050], [66.1560, 28.2160], [66.1640, 28.2240],
      [66.1730, 28.2290], [66.1820, 28.2260], [66.1900, 28.2180],
      [66.1970, 28.2080], [66.2040, 28.1960], [66.2100, 28.1850],
    ],
  },
  {
    id: "riisitunturin-ladut",
    name: "Riisitunturin ladut",
    park: "Riisitunturi National Park",
    shortDescription: "Wilderness classic-style ski trails through Riisitunturi crown-snow forest — opens in February.",
    description:
      "Classic-style (perinteinen) ski trails winding through the famous crown-snow forests of Riisitunturi National Park. The fell's dense spruce trees build extraordinary tykkylumi (crown snow) formations in midwinter — skiing here between February and March is one of the most visually spectacular experiences in the Posio region. The trails are groomed seasonally and typically do not open until sufficient snow depth has built up, usually from early to mid-February. The terrain reflects the national park environment: undulating fell slopes, open bog sections and forest tracks. The trails are not illuminated — plan a full daylight outing. Use the same Riisitunturi parking area as the hiking trails. Check trail status at infogis.fi/posio.",
    type: "skiing",
    difficulty: "medium",
    lengthKm: 20,
    durationHours: [2, 4],
    loop: true,
    distanceFromPosioKm: 35,
    status: "seasonal",
    season: "winter",
    lit: false,
    skiStyle: "classic",
    facilities: ["parking", "toilet"],
    tags: ["classic", "wilderness", "national-park", "crown-snow", "scenic"],
    startPoint: {
      name: "Riisitunturi parking",
      address: "Patoniementie, 97999 Posio",
      coords: [66.18, 28.14],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "posiolapland.com — ski trails", url: "https://posiolapland.com/hiihtoladut/" },
      { label: "Riisitunturin erämaalatu PDF map", url: "https://posiolapland.com/wp-content/uploads/2021/01/Riisitunturin-eramaalatu.pdf" },
    ],
    image: riisiWinter,
    routeCoords: [
      [66.180, 28.140], [66.190, 28.118], [66.202, 28.108],
      [66.215, 28.118], [66.224, 28.140], [66.220, 28.165],
      [66.208, 28.182], [66.194, 28.178], [66.184, 28.165],
      [66.180, 28.140],
    ],
  },
  {
    id: "posionjarvi-aurinkolatu",
    name: "Posionjärven aurinkolatu",
    park: "Local — Posio",
    shortDescription: "Flat 16 km classic-style circuit around frozen lake Posionjärvi — ideal for beginners and families.",
    description:
      "A beloved 16.2 km classic-style ski circuit (perinteinen tyyli) that loops around frozen lake Posionjärvi and its forested shoreline. The route is almost entirely flat, making it one of the most beginner-friendly long trails in the region. It opens once the lake ice reaches safe thickness — usually January — and typically stays open until late April. On clear days the open lake sections offer wide panoramic views of the surrounding fell landscape. Dogs are welcome on this trail. Trail conditions are updated daily at infogis.fi/posio.",
    type: "skiing",
    difficulty: "easy",
    lengthKm: 16.2,
    durationHours: [1.5, 3],
    loop: true,
    distanceFromPosioKm: 1,
    status: "seasonal",
    season: "winter",
    lit: false,
    skiStyle: "classic",
    facilities: ["parking"],
    tags: ["classic", "flat", "lake", "family", "dogs-welcome"],
    startPoint: {
      name: "Posionjärvi trail start",
      address: "Maaninkavaarantie 5, 97900 Posio",
      coords: [66.0952, 28.1476],
    },
    links: [
      { label: "infogis.fi/posio — real-time trail conditions", url: "https://www.infogis.fi/posio/" },
      { label: "outdooractive.com", url: "https://www.outdooractive.com/en/route/cross-country-skiing/finland/posionjaerven-aurinkolatu-skiing-track-16km-/59206510/" },
    ],
    image: riisi2Winter,
    routeCoords: [
      [66.0952, 28.1476], [66.0892, 28.1522], [66.0822, 28.1582],
      [66.0752, 28.1632], [66.0682, 28.1602], [66.0622, 28.1522],
      [66.0582, 28.1432], [66.0592, 28.1312], [66.0642, 28.1202],
      [66.0712, 28.1152], [66.0792, 28.1182], [66.0862, 28.1232],
      [66.0922, 28.1312], [66.0952, 28.1476],
    ],
  },
];

export const getTrail = (id: string) => trails.find((t) => t.id === id);
