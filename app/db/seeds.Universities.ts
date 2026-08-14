// app/db/Seeds/seeds.Universities.ts

import * as SQLite from "expo-sqlite";

type UniversitySeed = {
  name: string;
  province: string;
  city: string;
  description: string;
  website: string;
  contact: string;
  minimum_aps: number;
  application_open_date: string;
  application_close_date: string;
  application_link: string;
  prospectus_link: string;
  image_url: string;
};

export const UNIVERSITIES: UniversitySeed[] = [
  {
    name: "University of Cape Town",
    province: "Western Cape",
    city: "Cape Town",
    description:
      "A research-intensive public university located in Cape Town, offering undergraduate and postgraduate programmes across a wide range of disciplines.",
    website: "https://www.uct.ac.za/",
    contact: "+27 21 650 9111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-07-31",
    application_link: "https://applyonline.uct.ac.za/",
    prospectus_link:
      "https://uct.ac.za/students/prospective-students/undergraduate-prospectus",
    image_url: "",
  },

  {
    name: "University of Pretoria",
    province: "Gauteng",
    city: "Pretoria",
    description:
      "A comprehensive public research university in Pretoria offering a broad range of undergraduate and postgraduate programmes.",
    website: "https://www.up.ac.za/",
    contact: "+27 12 420 3111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-06-30",
    application_link: "https://www.up.ac.za/online-application",
    prospectus_link: "https://www.up.ac.za/students/admission-information",
    image_url: "",
  },

  {
    name: "Stellenbosch University",
    province: "Western Cape",
    city: "Stellenbosch",
    description:
      "A research-focused university situated in Stellenbosch, offering programmes across sciences, humanities, business, engineering, education and other fields.",
    website: "https://www.sun.ac.za/",
    contact: "+27 21 808 9111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-07-31",
    application_link: "https://student.sun.ac.za/",
    prospectus_link: "https://www.sun.ac.za/english/maties/apply",
    image_url: "",
  },

  {
    name: "University of the Witwatersrand",
    province: "Gauteng",
    city: "Johannesburg",
    description:
      "A leading research-intensive university in Johannesburg, commonly known as Wits, with programmes across health sciences, engineering, commerce, humanities and sciences.",
    website: "https://www.wits.ac.za/",
    contact: "+27 11 717 1000",
    minimum_aps: 0,
    application_open_date: "2026-03-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.wits.ac.za/applications/",
    prospectus_link: "https://www.wits.ac.za/undergraduate/",
    image_url: "",
  },

  {
    name: "University of KwaZulu-Natal",
    province: "KwaZulu-Natal",
    city: "Durban",
    description:
      "A comprehensive research-led university with campuses across KwaZulu-Natal, offering programmes in numerous academic disciplines.",
    website: "https://ukzn.ac.za/",
    contact: "+27 31 260 1111",
    minimum_aps: 0,
    application_open_date: "2026-03-01",
    application_close_date: "2026-09-30",
    application_link: "https://applications.ukzn.ac.za/",
    prospectus_link: "https://applications.ukzn.ac.za/",
    image_url: "",
  },

  {
    name: "University of Johannesburg",
    province: "Gauteng",
    city: "Johannesburg",
    description:
      "A comprehensive university serving a diverse student population and offering programmes across business, engineering, technology, humanities, education and sciences.",
    website: "https://www.uj.ac.za/",
    contact: "+27 11 559 4555",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-10-31",
    application_link: "https://www.uj.ac.za/apply/",
    prospectus_link:
      "https://www.uj.ac.za/wp-content/uploads/2026/03/uj_prospectus2027_24-march-2027-final.pdf",
    image_url: "",
  },

  {
    name: "University of the Free State",
    province: "Free State",
    city: "Bloemfontein",
    description:
      "A public university with campuses in Bloemfontein, Qwaqwa and South Campus, offering programmes across a broad range of academic fields.",
    website: "https://www.ufs.ac.za/",
    contact: "+27 51 401 9111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-08-31",
    application_link: "https://apply.ufs.ac.za/Application/Start",
    prospectus_link: "https://www.ufs.ac.za/prospective/study-at-ufs",
    image_url: "",
  },

  {
    name: "North-West University",
    province: "North West",
    city: "Potchefstroom",
    description:
      "A multi-campus public university with campuses in Potchefstroom, Mahikeng and Vanderbijlpark.",
    website: "https://www.nwu.ac.za/",
    contact: "+27 18 299 1111",
    minimum_aps: 0,
    application_open_date: "2026-06-01",
    application_close_date: "2026-08-31",
    application_link: "https://studies.nwu.ac.za/",
    prospectus_link: "https://studies.nwu.ac.za/",
    image_url: "",
  },

  {
    name: "Tshwane University of Technology",
    province: "Gauteng",
    city: "Pretoria",
    description:
      "A university of technology offering career-focused programmes in fields including engineering, information technology, management, arts and sciences.",
    website: "https://www.tut.ac.za/",
    contact: "+27 12 382 5911",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.tut.ac.za/",
    prospectus_link: "https://www.tut.ac.za/",
    image_url: "",
  },

  {
    name: "Cape Peninsula University of Technology",
    province: "Western Cape",
    city: "Cape Town",
    description:
      "A university of technology providing career-oriented education and training across business, engineering, health, applied sciences, education and design.",
    website: "https://www.cput.ac.za/",
    contact: "+27 21 959 6911",
    minimum_aps: 0,
    application_open_date: "2026-05-11",
    application_close_date: "2026-09-30",
    application_link: "https://www.cput.ac.za/study-at-cput/undergraduate/apply",
    prospectus_link: "https://www.cput.ac.za/study-at-cput",
    image_url: "",
  },

  {
    name: "Nelson Mandela University",
    province: "Eastern Cape",
    city: "Gqeberha",
    description:
      "A comprehensive university in the Eastern Cape offering programmes across business, education, engineering, health sciences, humanities and sciences.",
    website: "https://www.mandela.ac.za/",
    contact: "+27 41 504 1111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.mandela.ac.za/Study-at-Mandela",
    prospectus_link: "https://www.mandela.ac.za/Study-at-Mandela",
    image_url: "",
  },

  {
    name: "University of the Western Cape",
    province: "Western Cape",
    city: "Cape Town",
    description:
      "A public university in the Western Cape with a strong focus on teaching, research, social justice and community engagement.",
    website: "https://www.uwc.ac.za/",
    contact: "+27 21 959 2911",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.uwc.ac.za/",
    prospectus_link: "https://www.uwc.ac.za/",
    image_url: "",
  },

  {
    name: "Rhodes University",
    province: "Eastern Cape",
    city: "Makhanda",
    description:
      "A research-intensive university in Makhanda known for its strong academic programmes and research environment.",
    website: "https://www.ru.ac.za/",
    contact: "+27 46 603 8111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://ross.ru.ac.za/",
    prospectus_link: "https://www.ru.ac.za/admissiongateway/",
    image_url: "",
  },

  {
    name: "University of Fort Hare",
    province: "Eastern Cape",
    city: "Alice",
    description:
      "A historic public university in the Eastern Cape offering programmes in education, science, agriculture, law, management, humanities and other fields.",
    website: "https://www.ufh.ac.za/",
    contact: "+27 40 602 2011",
    minimum_aps: 0,
    application_open_date: "2026-06-01",
    application_close_date: "2026-10-31",
    application_link: "https://www.ufh.ac.za/apply",
    prospectus_link: "https://www.ufh.ac.za/",
    image_url: "",
  },

  {
    name: "Walter Sisulu University",
    province: "Eastern Cape",
    city: "Mthatha",
    description:
      "A comprehensive university serving communities across the Eastern Cape with programmes in health, science, education, law, business and humanities.",
    website: "https://www.wsu.ac.za/",
    contact: "+27 47 502 2111",
    minimum_aps: 0,
    application_open_date: "2026-06-01",
    application_close_date: "2026-10-31",
    application_link: "https://applications.wsu.ac.za/",
    prospectus_link: "https://www.wsu.ac.za/",
    image_url: "",
  },

  {
    name: "University of Limpopo",
    province: "Limpopo",
    city: "Polokwane",
    description:
      "A public university in Limpopo offering programmes across health sciences, humanities, sciences, education and management.",
    website: "https://www.ul.ac.za/",
    contact: "+27 15 268 9111",
    minimum_aps: 0,
    application_open_date: "2026-05-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.ul.ac.za/",
    prospectus_link: "https://www.ul.ac.za/",
    image_url: "",
  },

  {
    name: "University of Venda",
    province: "Limpopo",
    city: "Thohoyandou",
    description:
      "A comprehensive rural university in Limpopo offering programmes in health sciences, agriculture, education, management, humanities and sciences.",
    website: "https://www.univen.ac.za/",
    contact: "+27 15 962 8000",
    minimum_aps: 0,
    application_open_date: "2026-05-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.univen.ac.za/",
    prospectus_link: "https://www.univen.ac.za/",
    image_url: "",
  },

  {
    name: "Sefako Makgatho Health Sciences University",
    province: "Gauteng",
    city: "Pretoria",
    description:
      "A specialised health sciences university offering education and training primarily in health-related disciplines.",
    website: "https://www.smu.ac.za/",
    contact: "+27 12 521 1111",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-07-31",
    application_link: "https://www.smu.ac.za/",
    prospectus_link: "https://www.smu.ac.za/",
    image_url: "",
  },

  {
    name: "Sol Plaatje University",
    province: "Northern Cape",
    city: "Kimberley",
    description:
      "A young public university in Kimberley offering programmes in education, humanities, natural and applied sciences, economic and management sciences.",
    website: "https://www.spu.ac.za/",
    contact: "+27 53 491 0000",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.spu.ac.za/",
    prospectus_link: "https://www.spu.ac.za/",
    image_url: "",
  },

  {
    name: "University of Mpumalanga",
    province: "Mpumalanga",
    city: "Mbombela",
    description:
      "A public university in Mpumalanga offering programmes in agriculture, education, information technology, hospitality, management and related fields.",
    website: "https://www.ump.ac.za/",
    contact: "+27 13 002 0000",
    minimum_aps: 0,
    application_open_date: "2026-06-01",
    application_close_date: "2026-11-30",
    application_link: "https://www.ump.ac.za/",
    prospectus_link: "https://www.ump.ac.za/",
    image_url: "",
  },

  {
    name: "University of South Africa",
    province: "Gauteng",
    city: "Pretoria",
    description:
      "A comprehensive open distance learning university offering undergraduate and postgraduate qualifications to students throughout South Africa and internationally.",
    website: "https://www.unisa.ac.za/",
    contact: "+27 12 429 3111",
    minimum_aps: 0,
    application_open_date: "2026-08-01",
    application_close_date: "2026-10-31",
    application_link: "https://www.unisa.ac.za/sites/myUnisa/default/Apply-for-admission",
    prospectus_link: "https://www.unisa.ac.za/sites/myUnisa/default/Apply-for-admission",
    image_url: "",
  },

  {
    name: "Central University of Technology",
    province: "Free State",
    city: "Bloemfontein",
    description:
      "A university of technology offering career-focused qualifications in engineering, health, management, humanities and applied sciences.",
    website: "https://www.cut.ac.za/",
    contact: "+27 51 507 3911",
    minimum_aps: 0,
    application_open_date: "2026-04-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.cut.ac.za/apply",
    prospectus_link: "https://www.cut.ac.za/prospectus",
    image_url: "",
  },

  {
    name: "Mangosuthu University of Technology",
    province: "KwaZulu-Natal",
    city: "Durban",
    description:
      "A university of technology in Durban providing career-focused programmes in engineering, management, natural sciences and related fields.",
    website: "https://www.mut.ac.za/",
    contact: "+27 31 907 7111",
    minimum_aps: 0,
    application_open_date: "2026-03-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.mut.ac.za/",
    prospectus_link: "https://www.mut.ac.za/",
    image_url: "",
  },

  {
    name: "Durban University of Technology",
    province: "KwaZulu-Natal",
    city: "Durban",
    description:
      "A university of technology with campuses in Durban and Pietermaritzburg offering technology-focused and career-oriented qualifications.",
    website: "https://www.dut.ac.za/",
    contact: "+27 31 373 2000",
    minimum_aps: 0,
    application_open_date: "2026-03-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.dut.ac.za/",
    prospectus_link: "https://www.dut.ac.za/",
    image_url: "",
  },

  {
    name: "University of Zululand",
    province: "KwaZulu-Natal",
    city: "Richards Bay",
    description:
      "A comprehensive university in northern KwaZulu-Natal offering programmes in arts, education, science, agriculture, commerce and law.",
    website: "https://www.unizulu.ac.za/",
    contact: "+27 35 902 6000",
    minimum_aps: 0,
    application_open_date: "2026-03-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.unizulu.ac.za/",
    prospectus_link: "https://www.unizulu.ac.za/",
    image_url: "",
  },

  {
    name: "Vaal University of Technology",
    province: "Gauteng",
    city: "Vanderbijlpark",
    description:
      "A university of technology in Vanderbijlpark offering career-focused qualifications in engineering, management, applied sciences and humanities.",
    website: "https://www.vut.ac.za/",
    contact: "+27 16 950 9000",
    minimum_aps: 0,
    application_open_date: "2026-06-01",
    application_close_date: "2026-09-30",
    application_link: "https://www.vut.ac.za/",
    prospectus_link: "https://www.vut.ac.za/",
    image_url: "",
  },
];

/**
 * Adds the extra university information columns to the existing
 * universities table without deleting the existing database.
 */
export const addUniversityInformationColumns = async (
  db: SQLite.SQLiteDatabase,
) => {
  const columns = await db.getAllAsync(
    "PRAGMA table_info(universities)",
  ) as { name: string }[];

  const existingColumns = new Set(
    columns.map((column) => column.name),
  );

  const newColumns = [
    {
      name: "description",
      sql: "ALTER TABLE universities ADD COLUMN description TEXT",
    },
    {
      name: "application_open_date",
      sql: "ALTER TABLE universities ADD COLUMN application_open_date TEXT",
    },
    {
      name: "application_close_date",
      sql: "ALTER TABLE universities ADD COLUMN application_close_date TEXT",
    },
    {
      name: "application_link",
      sql: "ALTER TABLE universities ADD COLUMN application_link TEXT",
    },
    {
      name: "prospectus_link",
      sql: "ALTER TABLE universities ADD COLUMN prospectus_link TEXT",
    },
  ];

  for (const column of newColumns) {
    if (!existingColumns.has(column.name)) {
      await db.execAsync(column.sql);
      console.log(`✅ Added university column: ${column.name}`);
    }
  }
};

/**
 * Seed / update all South African public universities.
 */
export const seedUniversities = async (
  db: SQLite.SQLiteDatabase,
) => {
  console.log("🏛 Starting university seed...");

  await addUniversityInformationColumns(db);

  for (const university of UNIVERSITIES) {
    const existing = await db.getFirstAsync(
      "SELECT id FROM universities WHERE name = ?",
      [university.name],
    ) as { id?: number } | null;

    if (existing?.id) {
      await db.runAsync(
        `
        UPDATE universities
        SET
          province = ?,
          city = ?,
          description = ?,
          website = ?,
          contact = ?,
          minimum_aps = ?,
          application_open_date = ?,
          application_close_date = ?,
          application_link = ?,
          prospectus_link = ?,
          image_url = ?
        WHERE id = ?
        `,
        [
          university.province,
          university.city,
          university.description,
          university.website,
          university.contact,
          university.minimum_aps,
          university.application_open_date,
          university.application_close_date,
          university.application_link,
          university.prospectus_link,
          university.image_url,
          existing.id,
        ],
      );
    } else {
      await db.runAsync(
        `
        INSERT INTO universities
        (
          name,
          province,
          city,
          description,
          website,
          contact,
          minimum_aps,
          application_open_date,
          application_close_date,
          application_link,
          prospectus_link,
          image_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          university.name,
          university.province,
          university.city,
          university.description,
          university.website,
          university.contact,
          university.minimum_aps,
          university.application_open_date,
          university.application_close_date,
          university.application_link,
          university.prospectus_link,
          university.image_url,
        ],
      );
    }
  }

  console.log(
    `✅ ${UNIVERSITIES.length} South African public universities seeded`,
  );
};