import * as SQLite from "expo-sqlite";

type CourseSeed = {
  faculty: string;
  qualification: string;
  qualification_type: string;
  duration: string;
  minimum_aps: number | null;
  fps: string | null;
  english_hl: string | null;
  english_fal: string | null;
  mathematics: string | null;
  mathematical_literacy: string | null;
  physical_sciences: string | null;
  life_sciences: string | null;
  nbt: string | null;
  additional_requirements: string;
  apply_url: string;
};

const UKZN_COURSES: CourseSeed[] = [
  {
    faculty: "College of Agriculture, Engineering and Science",
    qualification: "BSc Engineering (Agricultural)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 33,
    fps: null,
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 5 (65%)",
    mathematical_literacy: "No",
    physical_sciences: "Level 5 (65%)",
    life_sciences: "Not Required",
    nbt: "No",
    additional_requirements: "Life Orientation Level 4",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Audiology",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Life Sciences or Physical Sciences Level 3; Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Speech-Language Therapy",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: "Level 3",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Dental Therapy",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 33,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Medical Science, Innovation and Entrepreneurship",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Occupational Therapy",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 33,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Optometry",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: "Level 3",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Oral Hygiene",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Pharmacy",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Agricultural Sciences, Life Sciences, or Physical Sciences Level 4; Life Orientation Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Physiotherapy",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 33,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Life Orientation Level 4; programme must be one of your 1st–3rd CAO choices.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "BSc Dietetics and Human Nutrition",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Agricultural Sciences, Life Sciences, or Physical Sciences Level 4; Life Orientation Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Sport Science",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3",
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements:
      "Mathematics OR Mathematical Literacy Level 3 accepted (matcher currently only checks Mathematics — see note below); Life Orientation Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Nursing",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3",
    mathematical_literacy: null,
    physical_sciences: null,
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "Mathematics OR Mathematical Literacy Level 3 accepted (matcher currently only checks Mathematics — see note below); Life Sciences Level 4 required only for Choice 1 applicants.",
    apply_url: "https://www.ukzn.ac.za",
  },
  {
    faculty: "College of Health Sciences",
    qualification: "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
    qualification_type: "Bachelor's Degree",
    duration: "6 Years",
    minimum_aps: null,
    fps: null,
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 5",
    life_sciences: "Level 5",
    nbt: null,
    additional_requirements:
      "Selection based on academic average, not a fixed APS; minimum 65% overall aggregate; Life Orientation Level 4; applicants selected on academic merit and ranking.",
    apply_url: "https://www.ukzn.ac.za",
  },
  
  
  // ======================================================
  // COLLEGE OF HUMANITIES
  // ======================================================

  {
    faculty: "College of Humanities",
    qualification: "BEd (Foundation Phase)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 3 (40–49%)",
    mathematical_literacy: "Level 4 (50–59%) accepted",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "Life Orientation Level 4; isiZulu Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BEd (Intermediate Phase)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 5 in Mathematics OR Level 5 in two of Mathematics, Mathematical Literacy, Technology, Life Sciences or Physical Sciences",
    mathematical_literacy: "Accepted",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "Life Orientation Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BEd (Senior Phase/FET)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: null,
    mathematical_literacy: "Accepted",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "Level 5 in any two NSC subjects pertaining to the selected teaching package; Life Orientation Level 4.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA (General Studies)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Life Orientation Level 4; one approved subject at Level 5, including Business Studies, Consumer Studies, Dramatic Arts, Economics, Geography, History, Information Technology, Life Sciences, Mathematics/Mathematical Literacy, Music, Religion Studies, Visual Arts or any Home Language/First Additional Language.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA Cultural and Heritage Tourism",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "General College of Humanities admission requirements apply.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA in Music",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: null,
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Not required",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "Life Orientation Level 4; audition required for music programmes.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA in Music Foundation",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Not required",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Life Orientation Level 4; audition required. Applicants from Quintiles 1–3 schools are given preference, while applicants from other quintiles may also be considered.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BSocSc (General Studies)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Life Orientation Level 4; one approved subject at Level 5.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BSocSc Geography & Environmental Management",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "One approved subject at Level 5.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BSocSc (Housing)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Mathematics required.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "Bachelor of Social Work",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Life Orientation Level 4; one approved subject at Level 5.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA Philosophy, Politics & Law",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 30,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "English and Life Orientation Level 4; one approved subject at Level 5.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA International Studies",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "General College of Humanities admission requirements apply.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BA Visual Art",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "Portfolio/departmental requirements may apply.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "BSocSc Government, Business & Ethics",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "One approved subject at Level 5.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "B Theology",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 28,
    fps: "48",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: "Mathematics or Mathematical Literacy accepted",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "General degree admission requirements apply.",
    apply_url: "https://www.ukzn.ac.za",
  },

  {
    faculty: "College of Humanities",
    qualification: "Humanities Extended Curriculum Programme",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 20,
    fps: "27",
    english_hl: "Level 4",
    english_fal: "Level 4",
    mathematics: null,
    mathematical_literacy: "Accepted",
    physical_sciences: null,
    life_sciences: null,
    nbt: "No",
    additional_requirements:
      "NSC-Deg with 20–27 APS points, English and Life Orientation Level 4. The programme provides extended access to Humanities and Social Sciences for students from disadvantaged schools.",
    apply_url: "https://www.ukzn.ac.za",
  },

];

export const seedUKZN = async (db: SQLite.SQLiteDatabase) => {
  const ukzn = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    ["University of KwaZulu-Natal"]
  );

  if (!ukzn) {
    throw new Error("University of KwaZulu-Natal not found.");
  }

  const institutionId = ukzn.id;

  for (const course of UKZN_COURSES) {
  const existing = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM courses
     WHERE institution_id = ?
     AND qualification = ?`,
    [institutionId, course.qualification]
  );

  if (existing) {
    continue;
  }

  await db.runAsync(
      `INSERT INTO courses (
        institution_id,
        institution_type,
        faculty,
        qualification,
        qualification_type,
        duration,
        province,
        minimum_aps,
        fps,
        english_hl,
        english_fal,
        mathematics,
        mathematical_literacy,
        physical_sciences,
        life_sciences,
        nbt,
        additional_requirements,
        apply_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        "university",
        course.faculty,
        course.qualification,
        course.qualification_type,
        course.duration,
        "KwaZulu-Natal",
        course.minimum_aps,
        course.fps,
        course.english_hl,
        course.english_fal,
        course.mathematics,
        course.mathematical_literacy,
        course.physical_sciences,
        course.life_sciences,
        course.nbt,
        course.additional_requirements,
        course.apply_url,
      ],
    );
  }

  console.log(`UKZN seeded: ${UKZN_COURSES.length} courses across faculties.`);
};