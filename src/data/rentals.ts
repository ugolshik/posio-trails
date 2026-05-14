import bikes from "@/assets/rental-bikes.jpg";
import bikes2 from "@/assets/rental-bikes2.jpg";
import bikes3 from "@/assets/rental-bikes3.jpg";
import bikes4 from "@/assets/rental-bikes4.jpg";
import ruka from "@/assets/trail-ruka.jpg";
import karhunkierros from "@/assets/trail-karhunkierros.jpg";

export interface Rental {
  id: string;
  name: string;
  region: "Ruka" | "Juuma" | "Posio" | "Kuusamo";
  address: string;
  phone?: string;
  email?: string;
  url: string;
  bikeTypes: string[];
  priceFrom?: string;
  notes: string;
  image: string;
}

export const rentals: Rental[] = [
  {
    id: "ruka-bikes",
    name: "Ruka Bikes",
    region: "Ruka",
    address: "Ruka, Kuusamo",
    phone: "+358 50 512 1233",
    email: "info@rukabikes.fi",
    url: "https://www.rukabikes.fi/en/",
    bikeTypes: ["E-MTB"],
    priceFrom: "€60 / day",
    notes: "Mondraker E-MTBs with helmet, lock and short briefing included.",
    image: bikes,
  },
  {
    id: "hill-ski-rent",
    name: "HILL Ski & Bike Rental",
    region: "Ruka",
    address: "Rukatunturintie 12, 93830 Kuusamo",
    phone: "+358 46 920 8231",
    email: "ruka@hillskirent.fi",
    url: "https://hillskirent.fi/en/ruka/biking/",
    bikeTypes: ["E-Fatbike", "MTB"],
    priceFrom: "€45 / day",
    notes: "Tunturi E-max e-fatbikes and Rock Machine MTBs. Open from 23 June.",
    image: ruka,
  },
  {
    id: "stella-polaris",
    name: "Stella Polaris Adventures",
    region: "Juuma",
    address: "Juuma, Kuusamo",
    phone: "+358 40 843 3425",
    email: "info@stellapolaris.fi",
    url: "https://stellapolaris.fi/en/equipment-rental/",
    bikeTypes: ["Fatbike", "SUP", "Kayak"],
    priceFrom: "€15 / 1 h",
    notes: "Right at the gate of Oulanka NP. Fatbikes, kayaks and SUP boards.",
    image: karhunkierros,
  },
  {
    id: "ruka-safaris",
    name: "Ruka Safaris",
    region: "Ruka",
    address: "Ruka, Kuusamo",
    url: "https://rukasafaris.fi/en/equipment-rental/",
    bikeTypes: ["Fatbike", "E-Fatbike"],
    priceFrom: "€55 / day",
    notes: "Accepts ePassi & Smartum.",
    image: bikes4,
  },
  {
    id: "kuusamo-safaris",
    name: "Kuusamo Safaris",
    region: "Ruka",
    address: "Kotatie 1, Rukatunturi",
    url: "https://kuusamosafaris.fi/en/electric-mountain-bike-rental/",
    bikeTypes: ["E-MTB"],
    priceFrom: "€70 / day",
    notes: "Operates from the Ruka Safari House.",
    image: bikes2,
  },
  {
    id: "lapin-satu-rental",
    name: "Lapin Satu — guest service",
    region: "Posio",
    address: "Lapin Satu, Posio",
    email: "reception@lapinsatu.fi",
    url: "/lapin-satu",
    bikeTypes: ["Request via reception"],
    notes: "No specialised rental shop in Posio yet — Lapin Satu reception arranges bikes for guests on request.",
    image: bikes3,
  },
];

export const getRental = (id: string) => rentals.find((r) => r.id === id);
