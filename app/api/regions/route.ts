import { NextResponse } from "next/server";

const regionsByState: Record<string, string[]> = {
  // Peninsular Malaysia
  Johor: [
    "Johor Bahru",
    "Kulai",
    "Kota Tinggi",
    "Mersing",
    "Batu Pahat",
    "Muar",
    "Segamat",
    "Pontian",
    "Tangkak",
    "Kluang"
  ],

  Kedah: [
    "Kota Setar",
    "Kuala Muda",
    "Kulim",
    "Kubang Pasu",
    "Baling",
    "Padang Terap",
    "Pendang",
    "Pokok Sena",
    "Sik",
    "Yan",
    "Bandar Baharu",
    "Langkawi"
  ],

  Kelantan: [
    "Kota Bharu",
    "Bachok",
    "Pasir Mas",
    "Tumpat",
    "Tanah Merah",
    "Kuala Krai",
    "Machang",
    "Gua Musang",
    "Pasir Puteh",
    "Jeli"
  ],

  Melaka: [
    "Melaka Tengah",
    "Alor Gajah",
    "Jasin"
  ],

  "Negeri Sembilan": [
    "Seremban",
    "Port Dickson",
    "Rembau",
    "Jelebu",
    "Jempol",
    "Kuala Pilah",
    "Tampin"
  ],

  Pahang: [
    "Kuantan",
    "Temerloh",
    "Jerantut",
    "Raub",
    "Bentong",
    "Lipis",
    "Cameron Highlands",
    "Maran",
    "Pekan",
    "Rompin",
    "Bera"
  ],

  "Pulau Pinang": [
    "Pulau",
    "Seberang Perai Utara",
    "Seberang Perai Tengah",
    "Seberang Perai Selatan"
  ],

  Perak: [
    "Kinta",
    "Manjung",
    "Hilir Perak",
    "Kerian",
    "Larut",
    "Matang",
    "Selama",
    "Kuala Kangsar",
    "Batang Padang",
    "Hulu Perak",
    "Perak Tengah",
    "Muallim",
    "Bagan Datuk"
  ],

  Perlis: [
    "Abi",
    "Arau",
    "Beseri",
    "Chuping",
    "Jejawi",
    "Kaki Bukit",
    "Kayang",
    "Kechor",
    "Kuala Perlis",
    "Kurong Anai",
    "Kurong Batang",
    "Ngulang",
    "Oran",
    "Padang Pauh",
    "Paya",
    "Padang Siding",
    "Sanglang",
    "Sena",
    "Seriab",
    "Sungai Adam",
    "Titi Tinggi",
    "Padang Besar",
    "Utan Aji",
    "Wang Bintong"
  ],

  Selangor: [
    "Petaling",
    "Gombak",
    "Hulu Selangor",
    "Hulu Langat",
    "Klang",
    "Kuala Langat",
    "Kuala Selangor",
    "Sabak Bernam",
    "Sepang",
    "Petaling",
    "Batu",
    "Setapak",
    "Ampang",
    "Ulu Kelang",
    "Cheras"
  ],

  Terengganu: [
    "Kuala Terengganu",
    "Kuala Nerus",
    "Marang",
    "Dungun",
    "Kemaman",
    "Hulu Terengganu",
    "Besut",
    "Setiu"
  ],

  // East Malaysia
  Sabah: [
    "West Coast",
    "Kota Kinabalu",
    "Penampang",
    "Tuaran",
    "Kota Belud",
    "Papar",
    "Kudat",
    "Kota Marudu",
    "Ranau",
    "Keningau",
    "Tambunan",
    "Tenom",
    "Beaufort",
    "Sipitang",
    "Kuala Penyu",
    "Nabawan",
    "Putatan",
    "Papar",
    "Beluran",
    "Kinabatangan",
    "Telupid",
    "Tongod",
    "Kunak",
    "Semporna",
    "Lahad Datu",
    "Tawau",
    "Kalabakan",
    "Kuala Penyu",
    "Membakut"
  ],

  Sarawak: [
    "Kuching",
    "Bau", 
    "Lundu",
    "Samarahan (Asajaya, Simunjan, Sebuyau, Gedong etc.)",
    "Serian",
    "Sri Aman",
    "Simanggang",
    "Betong",
    "Sarikei",
    "Sibu",
    "Mukah",
    "Bintulu",
    "Miri",
    "Kapit",
    "Limbang",
    "Lawas"
  ],

  // Federal Territories
  "WP Kuala Lumpur": [
    "Bandar Kuala Lumpur",
    "Kuala Lumpur",
    "Petaling",
    "Batu",
    "Setapak",
    "Ampang",
    "Ulu Kelang",
    "Cheras"
  ],

  "WP Putrajaya": [
    // precincts (central administration) — enumerated precincts
    "Precinct 1",
    "Precinct 2",
    "Precinct 3",
    "Precinct 4",
    "Precinct 5",
    "Precinct 6",
    "Precinct 7",
    "Precinct 8",
    "Precinct 9",
    "Precinct 10",
    "Precinct 11",
    "Precinct 12",
    "Precinct 13",
    "Precinct 14",
    "Precinct 15",
    "Precinct 16",
    "Precinct 17",
    "Precinct 18",
    "Precinct 19",
    "Precinct 20"
  ],

  "WP Labuan": [
    "Victoria",
    "Other"
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state") || "";

  const regions = regionsByState[state] || [];

  return NextResponse.json(regions);
}
