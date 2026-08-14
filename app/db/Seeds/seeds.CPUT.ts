import * as SQLite from "expo-sqlite";

export const seedCPUT = async (refDb: SQLite.SQLiteDatabase) => {
  try {
    console.log("🌱 Starting CPUT course seeding...");

    // -------------------------------------------------------
    // FIND / CREATE CPUT UNIVERSITY
    // -------------------------------------------------------

    let universities = await refDb.getAllAsync<{
      id: number;
      name: string;
    }>(
      `SELECT id, name FROM universities WHERE name = ?`,
      ["Cape Peninsula University of Technology"]
    );

    let cputId: number;

    if (universities.length > 0) {
      cputId = universities[0].id;

      console.log("🏫 CPUT already exists with ID:", cputId);
    } else {
      const result = await refDb.runAsync(
        `INSERT INTO universities
        (name, province, website, contact, minimum_aps, image_url)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          "Cape Peninsula University of Technology",
          "Western Cape",
          "www.cput.ac.za",
          "+27 (0)21 959 6767",
          null,
          "",
        ]
      );

      cputId = result.lastInsertRowId;

      console.log("🏫 CPUT created with ID:", cputId);
    }

    // -------------------------------------------------------
    // PREVENT DUPLICATE CPUT COURSES
    // -------------------------------------------------------

    const existing = await refDb.getAllAsync(
      `SELECT id FROM courses
       WHERE institution_id = ?
       AND institution_type = ?`,
      [cputId, "university"]
    );

    if (existing.length > 0) {
      console.log(
        `ℹ️ CPUT already has ${existing.length} courses. Skipping.`
      );
      return;
    }

    // -------------------------------------------------------
    // CPUT COURSES
    // 2026 CPUT PROSPECTUS
    // -------------------------------------------------------

    const courses = [

      // =====================================================
      // FACULTY OF APPLIED SCIENCES
      // =====================================================

      {
        faculty: "Applied Sciences",
        qualification: "Bachelor of Food Science & Technology",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 32,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "4",
        life_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Plus any two other subjects excluding languages, each at minimum Level 3 (40-49%).",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Nature Conservation",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "5",
        physical_sciences: "4",
        life_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Minimum requirements differ depending on Mathematics, Technical Mathematics or Mathematical Literacy.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Marine Science",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "4",
        life_sciences: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "45% or above in Mathematics or Physical Sciences if the other is 50% or above.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Environmental Management",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "3",
        mathematical_literacy: "5",
        physical_sciences: "4",
        life_sciences: "3",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Geography or Life Sciences at Level 4; other two subjects at Level 3 excluding Life Orientation.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Bachelor in Environmental Health",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "4",
        life_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Plus any other two subjects at Level 4 excluding Life Orientation.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Horticulture",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "5",
        physical_sciences: "4",
        life_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Subject to space, students may be admitted to the Foundation Programme with at least 40% in Life Sciences.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Landscape Architecture",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "5",
        physical_sciences: "4",
        life_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Subject to space, students may be admitted to the Foundation Programme with at least 40% in Life Sciences.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Mathematical Sciences",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "",
        life_sciences: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Physical Sciences, Accounting, Business Studies, Economics or Geography at Level 4; corresponding minimum 40% in one of these subjects.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Agriculture",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "",
        physical_sciences: "4",
        life_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Life Sciences or Physical Sciences required.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Agricultural Management",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "5",
        physical_sciences: "4",
        life_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Life Sciences or Physical Sciences required.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Biotechnology",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "5",
        life_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "45% or above in Mathematics, Physical Sciences or Life Sciences if the other three subjects are 50% or above.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Analytical Chemistry",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "4",
        mathematical_literacy: "",
        physical_sciences: "5",
        life_sciences: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "45% or above in Mathematics or Physical Sciences if the other one is 50% or above.",
      },

      {
        faculty: "Applied Sciences",
        qualification: "Diploma in Consumer Science: Food & Nutrition",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "3",
        mathematical_literacy: "",
        physical_sciences: "4",
        life_sciences: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "45% or above in Mathematics or Physical Sciences if the other three are 50% or above.",
      },

      // =====================================================
      // FACULTY OF BUSINESS & MANAGEMENT SCIENCES
      // =====================================================

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Accountancy",
        qualification_type: "Diploma",
        minimum_aps: 38,
        mathematics: "3",
        mathematical_literacy: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "English Level 4 and one of Mathematics Level 3, Mathematical Literacy Level 5 or Accounting Level 4. Mathematics and Accounting are doubled for APS.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Accountancy (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 36,
        mathematics: "3",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "English Level 4 and one of Mathematics Level 3, Mathematical Literacy Level 4 or Accounting Level 3.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Entrepreneurship",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Business Studies, Economics, Accounting or Consumer Studies at Level 4.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Entrepreneurship (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 22,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Business Studies, Economics, Accounting or Consumer Studies at Level 4.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Banking",
        qualification_type: "Diploma",
        minimum_aps: 24,
        mathematics: "3",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Including ICT and Accounting, Economics, Business, Consumer Studies, Management Practice, Financial Management or Marketing. Part-time students require full-time employment.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Bachelor of Business Informatics",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 25,
        mathematics: "3",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "NCV applicants require at least 60-69% in three fundamental subjects including English and Mathematics or Mathematical Literacy, plus four aligned vocational subjects.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Human Resources Management",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Including Economics, Business or Accounting.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Human Resources Management (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Including Economics, Business or Accounting.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Management",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Including Economics, Business or Accounting.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Management (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Including Economics, Business or Accounting.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Marketing",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Business, Accounting or Economics at Level 4.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Marketing (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Business, Accounting or Economics at Level 4.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Business & Information Administration",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Business, Economics, Accounting, CAT or IT. Part-time applicants require employment, CV and employer letter.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Business & Information Administration (Foundation)",
        qualification_type: "Diploma - Foundation",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Business, Economics, Accounting, CAT or IT.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Operations Management",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "3",
        mathematical_literacy: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Mathematics is required; Mathematical Literacy and Technical Mathematics are not accepted.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Public Administration",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Economics, Business or Accounting at Level 3.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Public Administration (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "3",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Economics, Business or Accounting at Level 2.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Retail Business Management",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "An NSC with at least three years relevant retail experience may also be considered.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Tourism Management",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Tourism, Economics, Hospitality Studies, Business, Accounting, Consumer Studies, History or Geography. Motivation letter required.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Tourism Management (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Tourism, Economics, Hospitality Studies, Business, Accounting, Consumer Studies, History or Geography.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Events Management",
        qualification_type: "Diploma",
        minimum_aps: 28,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Tourism, Economics, Hospitality Studies, Business, Accounting, CAT or IT. Motivation letter required.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Events Management (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 24,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Tourism, Economics, Hospitality Studies, Business, Accounting, CAT or IT.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Sport and Leisure Management",
        qualification_type: "Diploma",
        minimum_aps: 25,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Non-Academic Review Component required. Participation in sport or leadership at international, national or provincial level is recommended.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Sport and Leisure Management (Extended)",
        qualification_type: "Diploma - Extended",
        minimum_aps: 23,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Non-Academic Review Component required.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Hospitality and Hotel Management",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Accounting, Consumer Studies, Business, Hospitality Studies, Life Sciences or Tourism. Work experience recommended.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Hospitality and Food & Beverage Management",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Accounting, Consumer Studies, Business, Hospitality Studies, Life Sciences or Tourism. Work experience recommended.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Hospitality Management & Professional Cookery",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One of Accounting, Consumer Studies, Business, Hospitality Studies, Life Sciences or Tourism. Work experience recommended.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Diploma in Real Estate",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "2",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Economics, Business or Accounting at Level 4 for full-time study. Part-time applicants must be employed and have relevant experience.",
      },

      {
        faculty: "Business & Management Sciences",
        qualification: "Bachelor of Paralegal Studies",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        mathematics: "3",
        mathematical_literacy: "",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "One official language at Level 4 excluding English.",
      },

      // =====================================================
      // FACULTY OF EDUCATION
      // =====================================================

      {
        faculty: "Education",
        qualification: "Bachelor in Education: Foundation Phase Teaching",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 32,
        english_hl: "4",
        english_fal: "3",
        mathematics: "",
        mathematical_literacy: "",
        additional_requirements:
          "Four subjects at Level 4 including an official South African language, another official language at Level 3, and a subject related to the chosen teacher education electives. Selection applies.",
      },

      {
        faculty: "Education",
        qualification: "Bachelor in Education: Intermediate Phase Teaching",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 32,
        english_hl: "4",
        english_fal: "3",
        additional_requirements:
          "Four subjects at Level 4 including an official South African language and another official language at Level 3. Selection applies.",
      },

      {
        faculty: "Education",
        qualification: "Bachelor in Education: Senior Phase and Further Education & Training Teaching",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 32,
        english_hl: "4",
        english_fal: "3",
        additional_requirements:
          "Electives include Mathematics, Accounting, Physical Science, Life Sciences and Mathematical Literacy. Mathematics, Accounting, Physical Science and Life Sciences require at least 50%; Mathematical Literacy requires 60%.",
      },

      {
        faculty: "Education",
        qualification: "Diploma in Grade R Teaching",
        qualification_type: "Diploma",
        additional_requirements:
          "Currently not offered full-time. Requires Matric with ECD Level 4/5 or Educare Level 5 and Grade R teaching experience.",
      },

      {
        faculty: "Education",
        qualification: "Diploma in Early Childhood Development Care and Education",
        qualification_type: "Diploma",
        additional_requirements:
          "Currently only offered at Mowbray campus and not full-time. Requires ECD/Educare qualifications and experience working with children aged 4-6.",
      },

      // =====================================================
      // FACULTY OF HEALTH & WELLNESS SCIENCES
      // =====================================================

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BHSc in Medical Laboratory Sciences",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 38,
        english_hl: "4",
        english_fal: "4",
        mathematics: "4",
        mathematical_literacy: "5",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Preference is given to candidates with higher APS scores.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BHSc in Medical Laboratory Sciences (Extended)",
        qualification_type: "Bachelor's Degree - Extended",
        minimum_aps: 30,
        english_hl: "4",
        english_fal: "4",
        mathematics: "4",
        mathematical_literacy: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Consideration may be given to applicants with Level 3 (minimum 48%) in either Mathematics or Physical Sciences, subject to space.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "HC in Dental Assisting",
        qualification_type: "Higher Certificate",
        minimum_aps: 25,
        english_hl: "3",
        mathematics: "2",
        mathematical_literacy: "3",
        physical_sciences: "3",
        additional_requirements:
          "Early closing date applies.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BHSc Dental Technology",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 33,
        english_hl: "4",
        mathematics: "4",
        mathematical_literacy: "4",
        physical_sciences: "4",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BHSc Dental Technology (ECP)",
        qualification_type: "Bachelor's Degree - Extended",
        minimum_aps: 27,
        english_hl: "4",
        mathematics: "3",
        mathematical_literacy: "4",
        physical_sciences: "4",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "HC in Emergency Medical Care",
        qualification_type: "Higher Certificate",
        minimum_aps: 26,
        english_hl: "3",
        mathematics: "3",
        mathematical_literacy: "4",
        life_sciences: "3",
        physical_sciences: "3",
        additional_requirements:
          "Selection interview, medical, physical and environmental assessment.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Diploma in Emergency Care",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "3",
        mathematics: "3",
        life_sciences: "3",
        physical_sciences: "3",
        additional_requirements:
          "Selection interview, medical, physical and environmental assessment.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Bachelor of Emergency Medical Care",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 35,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Selection interview, medical, physical and environmental assessment.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Bachelor of Emergency Medical Care (ECP)",
        qualification_type: "Bachelor's Degree - Extended",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Subject to space. Consideration may be given to applicants with 47-49% in any one of English, Mathematics, Life Sciences or Physical Sciences.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Diploma in Somatology",
        qualification_type: "Diploma",
        minimum_aps: 24,
        english_hl: "4",
        mathematics: "3",
        mathematical_literacy: "4",
        physical_sciences: "4",
        additional_requirements:
          "24 APS with Mathematics or 25 APS with Mathematical Literacy. Hepatitis inoculation required.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Bachelor of Nursing",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        mathematical_literacy: "5",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Applicants will be invited to a selection interview.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "Bachelor of Nursing (ECP)",
        qualification_type: "Bachelor's Degree - Extended",
        minimum_aps: 27,
        english_hl: "4",
        mathematics: "3",
        mathematical_literacy: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Applicants will be invited to a selection interview.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BHSc in Opticianry",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 32,
        english_hl: "4",
        mathematics: "4",
        mathematical_literacy: "5",
        life_sciences: "4",
        physical_sciences: "4",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BSc in Diagnostic Radiography",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Health screening questionnaire may be required.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BSc in Diagnostic Ultrasound",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Health screening questionnaire may be required.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BSc in Radiation Therapy",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Health screening questionnaire may be required.",
      },

      {
        faculty: "Health & Wellness Sciences",
        qualification: "BSc in Nuclear Medicine Technology",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 30,
        english_hl: "4",
        mathematics: "4",
        life_sciences: "4",
        physical_sciences: "4",
        additional_requirements:
          "Physical Sciences is compulsory. Health screening requirements may apply.",
      },

      // =====================================================
      // FACULTY OF INFORMATICS & DESIGN
      // =====================================================

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Journalism",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "5",
        english_fal: "5",
        mathematics: "3",
        mathematical_literacy: "4",
        additional_requirements:
          "For English HL/FAL: 50% excluding English requirement as specified in prospectus.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Photography",
        qualification_type: "Diploma",
        minimum_aps: 30,
        english_hl: "4",
        english_fal: "4",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Public Relations & Communication",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "5",
        english_fal: "5",
        mathematics: "2",
        mathematical_literacy: "4",
        additional_requirements:
          "One official language excluding English at the required level.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Product Design",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
        additional_requirements:
          "Design-related selection requirements may apply.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Architectural Technology",
        qualification_type: "Diploma",
        minimum_aps: 30,
        english_hl: "4",
        english_fal: "4",
        mathematics: "4",
        mathematical_literacy: "6",
        additional_requirements:
          "Extended Curriculum option available.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Interior Design",
        qualification_type: "Diploma",
        minimum_aps: 30,
        english_hl: "4",
        english_fal: "4",
        mathematics: "4",
        mathematical_literacy: "6",
        additional_requirements:
          "Extended Curriculum option available.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Fashion",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
        additional_requirements:
          "Extended Curriculum option available.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Visual Communication Design",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
        additional_requirements:
          "Extended Curriculum option available.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Film Production",
        qualification_type: "Diploma",
        minimum_aps: 30,
        english_hl: "5",
        english_fal: "5",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Applications Development",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Communication Networks",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Multimedia Applications",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Higher Certificate in ICT",
        qualification_type: "Higher Certificate",
        minimum_aps: 24,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Jewellery Design & Manufacture",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "3",
        mathematical_literacy: "5",
        additional_requirements:
          "Extended Curriculum option available.",
      },

      {
        faculty: "Informatics & Design",
        qualification: "Diploma in Urban & Regional Planning",
        qualification_type: "Diploma",
        minimum_aps: 28,
        english_hl: "4",
        english_fal: "4",
        mathematics: "4",
        mathematical_literacy: "5",
        additional_requirements:
          "Compulsory Geography, Economics, Business Studies or Tourism at Level 4. English HL/FAL excluding English at specified level.",
      },

      // =====================================================
      // FACULTY OF ENGINEERING & BUILT ENVIRONMENT
      // =====================================================

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Chemical Engineering",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Mathematics and Physical Science requirements apply. Technical Science is not accepted as a substitute for Physical Science.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Engineering Technology in Chemical Engineering",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "5",
        english_fal: "5",
        additional_requirements:
          "Method 2. Physical Science required.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Civil Engineering",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. ECP options are available according to prospectus requirements.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Engineering Technology in Civil Engineering",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "5",
        english_fal: "5",
        additional_requirements:
          "Method 2.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Clothing & Textile Technology",
        qualification_type: "Diploma",
        minimum_aps: 26,
        mathematics: "3",
        mathematical_literacy: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Online selection test. Mathematical Literacy is accepted for this qualification.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Construction",
        qualification_type: "Diploma",
        minimum_aps: 25,
        mathematics: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Unweighted NSC points. Recommended subject includes Accounting, Business, Economics, Civil Technology, Engineering Graphics & Design, CAT, IT, Physical Science or Technical Science.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Engineering Technology in Electrical Engineering",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Recommended CAT, IT or Electrical Technology. Further N4 requirements apply.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Engineering Technology in Computer Engineering",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Recommended CAT, IT or Electrical Technology. Further N4 requirements apply.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Engineering Technology in Electrical Engineering",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "5",
        english_fal: "5",
        additional_requirements:
          "Method 2. Recommended CAT, IT or Electrical Technology.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Engineering Technology in Computer Engineering",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "5",
        english_fal: "5",
        additional_requirements:
          "Method 2. Recommended CAT, IT or Electrical Technology.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma: Engineering: Industrial",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Mechatronics is recommended.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Mechanical Engineering",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Electrical Technology, Engineering Graphics & Design or Mechatronics recommended.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Mechanical Engineering (Mechatronics)",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Method 2. Electrical Technology, Engineering Graphics & Design or Mechatronics recommended.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Diploma in Geomatics",
        qualification_type: "Diploma",
        minimum_aps: 30,
        mathematics: "4",
        physical_sciences: "4",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Geomatics combines surveying and cartography.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Geomatics",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "5",
        english_fal: "5",
        additional_requirements:
          "Specialising in Surveying or Geographic Information Science.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Marine Engineering",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Eyesight and medical assessment by an approved SAMSA Medical Practitioner.",
      },

      {
        faculty: "Engineering & the Built Environment",
        qualification: "Bachelor of Nautical Science",
        qualification_type: "Bachelor's Degree",
        minimum_aps: 36,
        mathematics: "5",
        physical_sciences: "5",
        english_hl: "4",
        english_fal: "4",
        additional_requirements:
          "Eyesight and medical requirements by an approved SAMSA Medical Practitioner.",
      },

    ];

    // -------------------------------------------------------
    // INSERT COURSES
    // -------------------------------------------------------

    for (const course of courses) {
      await refDb.runAsync(
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cputId,
          "university",
          course.faculty,
          course.qualification,
          course.qualification_type,
          "Not specified in prospectus",
          "Western Cape",
          course.minimum_aps ?? null,
          "",
          course.english_hl ?? "",
          course.english_fal ?? "",
          course.mathematics ?? "",
          course.mathematical_literacy ?? "",
          course.physical_sciences ?? "",
          course.life_sciences ?? "",
          "",
          course.additional_requirements ?? "",
          "https://www.cput.ac.za/study/apply",
        ]
      );
    }

    console.log(
      `✅ CPUT successfully seeded: ${courses.length} courses`
    );

  } catch (error) {
    console.error("❌ CPUT seed error:", error);
  }
};

export default seedCPUT;