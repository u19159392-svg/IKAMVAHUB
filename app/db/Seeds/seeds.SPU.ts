import * as SQLite from "expo-sqlite";

export const seedSPU = async (refDb: SQLite.SQLiteDatabase) => {
  try {
    console.log("🌱 Starting Sol Plaatje University seed...");

    // =========================================================
    // FIND SOL PLAATJE UNIVERSITY
    // =========================================================

    const university = await refDb.getFirstAsync<{
      id: number;
      name: string;
    }>(
      `SELECT id, name
       FROM universities
       WHERE name = ?`,
      ["Sol Plaatje University"]
    );

    if (!university) {
      console.error(
        "❌ Sol Plaatje University was not found in the universities table."
      );

      console.error(
        "👉 Add Sol Plaatje University to the universities table first."
      );

      return;
    }

    const institutionId = university.id;

    console.log(
      "🏛 Sol Plaatje University ID:",
      institutionId
    );

    // =========================================================
    // PREVENT DUPLICATE SEEDING
    // =========================================================

    const existing = await refDb.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM courses
       WHERE institution_id = ?
       AND institution_type = ?`,
      [institutionId, "university"]
    );

    if (existing && existing.count > 0) {
      console.log(
        `ℹ️ SPU already has ${existing.count} courses. Skipping seed.`
      );
      return;
    }

    // =========================================================
    // SPU COURSES
    // =========================================================

    const courses = [

      // =======================================================
      // FACULTY OF EDUCATION
      // =======================================================

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Foundation Phase Teaching (Grade R-3)",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 3",
        mathematical_literacy: "Level 4",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. One of Afrikaans, Setswana or isiXhosa at HL/FAL Level 4. Mathematics Level 3 OR Mathematical Literacy Level 4. An alternative route allows APS 25 plus an SAQA-accredited ECD Level 5 qualification.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Intermediate Phase Teaching (Grades 4-6) – Languages, Mathematics, Natural Sciences and Technology",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 4",
        mathematical_literacy: null,
        physical_sciences: "Level 4",
        life_sciences: "Level 4",
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. One of Afrikaans, Setswana or isiXhosa at HL/FAL Level 4. Mathematics, Physical Sciences and Life Sciences are compulsory at Level 4.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Intermediate Phase Teaching (Grades 4-6) – Languages, Social Sciences and Life Skills",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. One of Afrikaans, Setswana or isiXhosa at HL/FAL Level 4. Geography OR History at Level 4.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Senior Phase and FET Phase Teaching – Life Sciences, Natural Sciences and Mathematics",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 4",
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: "Level 4",
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics and Life Sciences are compulsory at Level 4.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Senior Phase and FET Phase Teaching – Languages OR Language and History",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. One of Afrikaans or Setswana at HL/FAL Level 4. History at Level 4 if History is selected as an elective.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Senior Phase and FET Phase Teaching – History, Social Sciences and Language",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. One of Afrikaans or Setswana at HL/FAL Level 4. Geography and History are both compulsory at Level 4.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Bachelor of Education (B.Ed.) Senior Phase and FET Phase Teaching – Accounting, Economics, Business Studies plus Economic and Management Sciences",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Any two of Accounting, Business Studies or Economics at Level 4.",
      },

      {
        faculty: "Faculty of Education",
        qualification:
          "Postgraduate Certificate in Education (PGCE)",
        qualification_type: "Postgraduate Certificate",
        duration: "1 Year",
        minimum_aps: null,
        fps: null,
        english_hl: null,
        english_fal: null,
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "Approved Bachelor's degree at NQF Level 7 or appropriate 360-credit exit NQF Level 6 Diploma. The degree/diploma must include recognised school subjects. One FET school subject requires a major of at least 48 credits at NQF Level 7, plus another school subject with at least 24 credits at NQF Level 6. Face-to-face/online lectures and 10 weeks of teaching practice are compulsory.",
      },


      // =======================================================
      // FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES
      // =======================================================

      {
        faculty: "Faculty of Economic and Management Sciences",
        qualification:
          "Bachelor of Commerce in Accounting",
        qualification_type: "Bachelor's Degree",
        duration: "3 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 5 OR Level 4 with Accounting Level 3",
        mathematical_literacy: "Not specified as accepted",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics Level 5 OR Mathematics Level 4 AND Accounting Level 3. Recognition of Prior Learning may apply.",
      },

      {
        faculty: "Faculty of Economic and Management Sciences",
        qualification:
          "Bachelor of Commerce in Economics",
        qualification_type: "Bachelor's Degree",
        duration: "3 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 5 OR Level 4 with Economics/Business Studies Level 3",
        mathematical_literacy: "Not specified as accepted",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics Level 5 OR Mathematics Level 4 AND Economics/Business Studies Level 3. Recognition of Prior Learning may apply.",
      },

      {
        faculty: "Faculty of Economic and Management Sciences",
        qualification:
          "Diploma in Retail Business Management",
        qualification_type: "Diploma",
        duration: "3 Years",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 3",
        mathematical_literacy: "Level 5",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Diploma pass. At least one of Accounting, Business Studies or Economics at Level 4. Recognition of Prior Learning may apply.",
      },

      {
        faculty: "Faculty of Economic and Management Sciences",
        qualification:
          "Advanced Diploma in Management",
        qualification_type: "Advanced Diploma",
        duration: "1 Year",
        minimum_aps: null,
        fps: null,
        english_hl: null,
        english_fal: null,
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "Relevant Diploma at NQF Level 6, Bachelor's degree or equivalent. Student must have passed subjects related to management and obtained an average of 60%. RPL may apply.",
      },

      {
        faculty: "Faculty of Economic and Management Sciences",
        qualification:
          "Higher Certificate in Entrepreneurship",
        qualification_type: "Higher Certificate",
        duration: "1 Year",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 3",
        mathematical_literacy: "Level 4",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Level 4 granting access to Higher Certificate studies OR NC(V) Level 4 granting access to Higher Certificate studies OR Senior Certificate Level 4 without endorsement. At least one of Accounting, Business Studies or Economics at Level 3.",
      },


      // =======================================================
      // FACULTY OF HUMANITIES
      // =======================================================

      {
        faculty: "Faculty of Humanities",
        qualification:
          "Bachelor of Arts (B.A.)",
        qualification_type: "Bachelor's Degree",
        duration: "3 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 2",
        mathematical_literacy: "Level 3",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Geography major requires NSC Level 4. Focus areas include Afrikaans, English, Setswana, History, Heritage Studies, Geography, Mathematics and Sociology.",
      },

      {
        faculty: "Faculty of Humanities",
        qualification:
          "Higher Certificate in Heritage Studies",
        qualification_type: "Higher Certificate",
        duration: "1 Year",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 2",
        mathematical_literacy: "Level 3",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Higher Certificate requirement. The qualification provides theoretical and practical grounding in the heritage sector.",
      },

      {
        faculty: "Faculty of Humanities",
        qualification:
          "Higher Certificate in Court Interpreting",
        qualification_type: "Higher Certificate",
        duration: "1 Year",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Higher Certificate pass or NC(V) with appropriate subjects. At least one other African language is required: Home Language Level 4 OR First Additional Language Level 5. Mature-age applicants with relevant industry experience may be considered.",
      },


      // =======================================================
      // FACULTY OF NATURAL AND APPLIED SCIENCES
      // =======================================================

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Bachelor of Science (B.Sc.)",
        qualification_type: "Bachelor's Degree",
        duration: "3 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 4",
        mathematical_literacy: "Not accepted",
        physical_sciences: "Level 4",
        life_sciences: "Level 4",
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics, Physical Sciences and Life Sciences are required at Level 4. Specialisation areas include Mathematical and Computer Sciences, Physical Sciences and Biological Sciences.",
      },

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Bachelor of Science in Data Science",
        qualification_type: "Bachelor's Degree",
        duration: "3 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 5",
        mathematical_literacy: "Not accepted",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics Level 5 is required. Mathematical Literacy is not accepted.",
      },

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Bachelor of Environmental Science",
        qualification_type: "Bachelor's Degree",
        duration: "4 Years",
        minimum_aps: 30,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 4",
        mathematical_literacy: "Not accepted",
        physical_sciences: "Level 4",
        life_sciences: "Level 4",
        nbt: null,
        additional_requirements:
          "NSC Bachelor’s Degree pass. Mathematics, Physical Sciences and Life Sciences are required at Level 4. The programme includes Environmental Management Systems and Remote Sensing and Earth Observation.",
      },

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Diploma in Information and Communication Technology in Applications Development",
        qualification_type: "Diploma",
        duration: "3 Years",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 3",
        mathematical_literacy: "Level 5",
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "NSC Diploma pass. Mathematics Level 3 OR Mathematical Literacy Level 5. CAT or IT is highly recommended. The programme focuses on Applications Development.",
      },

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Diploma in Agriculture",
        qualification_type: "Diploma",
        duration: "3 Years",
        minimum_aps: 25,
        fps: null,
        english_hl: "Level 4",
        english_fal: "Level 5",
        mathematics: "Level 3",
        mathematical_literacy: "Level 5",
        physical_sciences: "Level 3",
        life_sciences: "Level 3",
        nbt: null,
        additional_requirements:
          "NSC Diploma pass. Physical Science Level 3. Life Sciences Level 3 OR Agricultural Sciences Level 3.",
      },

      {
        faculty: "Faculty of Natural and Applied Sciences",
        qualification:
          "Advanced Diploma in Information and Communication Technology (ICT) in Applications Development",
        qualification_type: "Advanced Diploma",
        duration: "1 Year",
        minimum_aps: null,
        fps: null,
        english_hl: null,
        english_fal: null,
        mathematics: null,
        mathematical_literacy: null,
        physical_sciences: null,
        life_sciences: null,
        nbt: null,
        additional_requirements:
          "Three-year Diploma in Information and Communication Technology or equivalent NQF Level 6 qualification in the same field. At least 60% average in third-year exit modules. RPL may apply.",
      },
    ];

    // =========================================================
    // INSERT COURSES
    // =========================================================

    for (const course of courses) {
      await refDb.runAsync(
        `
        INSERT INTO courses (
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          institutionId,
          "university",
          course.faculty,
          course.qualification,
          course.qualification_type,
          course.duration,
          "Northern Cape",
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
          "https://www.spu.ac.za/index.php/how-to-apply/",
        ]
      );
    }

    // =========================================================
    // VERIFY
    // =========================================================

    const result = await refDb.getFirstAsync<{ count: number }>(
      `
      SELECT COUNT(*) as count
      FROM courses
      WHERE institution_id = ?
      AND institution_type = ?
      `,
      [institutionId, "university"]
    );

    console.log(
      `✅ Sol Plaatje University seeded successfully: ${result?.count ?? 0} courses`
    );

  } catch (error) {
    console.error(
      "❌ Error seeding Sol Plaatje University:",
      error
    );
  }
};

export default seedSPU;