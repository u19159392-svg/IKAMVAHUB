import * as SQLite from "expo-sqlite";

export const seedUP = async (db: SQLite.SQLiteDatabase) => {
  try {
    console.log("🌱 Starting University of Pretoria seed...");

    // =========================================================
    // FIND UNIVERSITY OF PRETORIA
    // =========================================================

    let university = await db.getFirstAsync<{
      id: number;
      name: string;
    }>(
      `SELECT id, name
       FROM universities
       WHERE name = ?`,
      ["University of Pretoria"]
    );

    // Create UP if it does not already exist
    if (!university) {
      await db.runAsync(
        `INSERT INTO universities
        (name, province, website, contact, minimum_aps, image_url)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          "University of Pretoria",
          "Gauteng",
          "www.up.ac.za",
          "012 420 3111",
          0,
          "",
        ]
      );

      university = await db.getFirstAsync<{
        id: number;
        name: string;
      }>(
        `SELECT id, name
         FROM universities
         WHERE name = ?`,
        ["University of Pretoria"]
      );
    }

    if (!university) {
      throw new Error("University of Pretoria could not be created.");
    }

    const universityId = university.id;

    console.log("🏛 UP University ID:", universityId);

    // =========================================================
    // PREVENT DUPLICATE COURSES
    // =========================================================

    const existing = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM courses
       WHERE institution_id = ?
       AND institution_type = ?`,
      [universityId, "university"]
    );

    if (existing && existing.count > 0) {
      console.log(
        `ℹ️ UP already has ${existing.count} courses. Skipping UP seed.`
      );
      return;
    }

    // =========================================================
    // COURSE HELPER
    // =========================================================

    const addCourse = async (
      faculty: string,
      qualification: string,
      qualificationType: string,
      duration: string,
      aps: number | null,
      englishHL: string = "",
      englishFAL: string = "",
      mathematics: string = "",
      mathematicalLiteracy: string = "",
      physicalSciences: string = "",
      lifeSciences: string = "",
      additionalRequirements: string = ""
    ) => {
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          universityId,
          "university",
          faculty,
          qualification,
          qualificationType,
          duration,
          "Gauteng",
          aps,
          "",
          englishHL,
          englishFAL,
          mathematics,
          mathematicalLiteracy,
          physicalSciences,
          lifeSciences,
          "",
          additionalRequirements,
          "https://www.up.ac.za/apply",
        ]
      );
    };

    // =========================================================
    // FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES
    // =========================================================

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Administration specialising in Public Administration and International Relations",
      "Bachelor's Degree",
      "3 Years",
      28,
      "5",
      "",
      "3",
      "4",
      "",
      "",
      "Mathematics level 3 OR Mathematical Literacy level 4."
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce in Accounting Sciences",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Investment Management",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Financial Management Sciences",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Econometrics",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Economics",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Law",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Statistics and Data Science",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Information Systems",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Agribusiness Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Business Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Supply Chain Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Marketing Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce specialising in Human Resource Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Economic and Management Sciences",
      "Bachelor of Commerce",
      "Bachelor's Degree",
      "4 Years",
      26,
      "4",
      "",
      "3",
      "",
      "",
      "",
      "Selection programme. Additional selection criteria apply."
    );

    // =========================================================
    // FACULTY OF EDUCATION
    // =========================================================

    await addCourse(
      "Education",
      "Bachelor of Education in Early Childhood Care and Education",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4"
    );

    await addCourse(
      "Education",
      "Bachelor of Education in Foundation Phase Teaching",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4"
    );

    await addCourse(
      "Education",
      "Bachelor of Education in Intermediate Phase Teaching",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4"
    );

    await addCourse(
      "Education",
      "Bachelor of Education in Senior Phase and Further Education and Training Teaching",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4",
      "",
      "",
      "",
      "5",
      "5",
      "Physical Sciences and Mathematics level 5 required for Physical Sciences/Life Sciences electives."
    );

    await addCourse(
      "Education",
      "Higher Certificate in Sports Sciences",
      "Higher Certificate",
      "1 Year",
      20,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Selection also considers sporting achievements."
    );

    await addCourse(
      "Education",
      "Higher Certificate in Sports Sciences",
      "Higher Certificate",
      "2 Years",
      20,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Online programme. Students need part-time access to relevant schools, sports clubs or accredited facilities."
    );

    // =========================================================
    // FACULTY OF ENGINEERING, BUILT ENVIRONMENT AND IT
    // =========================================================

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Chemical Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Civil Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Computer Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Electrical Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Electronic Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Industrial Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Mechanical Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Metallurgical Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering in Mining Engineering",
      "Bachelor's Degree",
      "4 Years",
      35,
      "5",
      "",
      "6",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Engineering",
      "Bachelor's Degree",
      "5 Years",
      33,
      "65%",
      "",
      "65%",
      "",
      "65%",
      "",
      "Five-year Engineering programme. Minimum 65% English, Mathematics and Physical Sciences."
    );

    // BUILT ENVIRONMENT

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Architecture",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "4",
      "",
      "4",
      "",
      "First study choice only. Selection includes an interview."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Construction Management",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5",
      "",
      "",
      "",
      "Mathematics level 5 OR Accounting level 5."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Real Estate",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5",
      "",
      "",
      "",
      "Mathematics level 5 OR Accounting level 5."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Quantity Surveying",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5",
      "",
      "",
      "",
      "Mathematics level 5 OR Accounting level 5."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Town and Regional Planning",
      "Bachelor's Degree",
      "4 Years",
      30,
      "5",
      "",
      "4"
    );

    // INFORMATION TECHNOLOGY

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Commerce specialising in Information Systems",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5",
      "",
      "",
      "",
      "Administered by the Faculty of Economic and Management Sciences."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Information Science",
      "Bachelor's Degree",
      "3 Years",
      28,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Mathematics level 5 is required if Information Systems is selected at first-year level."
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Information Science specialising in Publishing",
      "Bachelor's Degree",
      "3 Years",
      28,
      "5"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Information Science specialising in Multimedia",
      "Bachelor's Degree",
      "3 Years",
      30,
      "4",
      "",
      "5"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Information Technology in Information Systems",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Computer Science",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Engineering, Built Environment and Information Technology",
      "Bachelor of Science in Information Technology in Information and Knowledge Systems",
      "Bachelor's Degree",
      "3 Years",
      30,
      "4",
      "",
      "6"
    );

    // =========================================================
    // FACULTY OF HEALTH SCIENCES
    // =========================================================

    await addCourse(
      "Health Sciences",
      "Bachelor of Dental Surgery",
      "Bachelor's Degree",
      "5 Years",
      35,
      "5",
      "",
      "6",
      "",
      "5"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Oral Hygiene",
      "Bachelor's Degree",
      "3 Years",
      25,
      "4",
      "",
      "4",
      "",
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Dietetics",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4",
      "",
      "4",
      "",
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Nursing Science",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4",
      "",
      "4",
      "",
      "",
      "4",
      "Life Sciences, not Physical Sciences."
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Occupational Therapy",
      "Bachelor's Degree",
      "4 Years",
      30,
      "4",
      "",
      "4",
      "",
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Physiotherapy",
      "Bachelor's Degree",
      "4 Years",
      30,
      "4",
      "",
      "4",
      "",
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Radiography in Diagnostics",
      "Bachelor's Degree",
      "4 Years",
      30,
      "4",
      "",
      "4",
      "",
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Clinical Medical Practice",
      "Bachelor's Degree",
      "3 Years",
      28,
      "4",
      "",
      "4",
      "",
      "4",
      "Physical Sciences OR Life Sciences."
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Medicine and Surgery (MBChB)",
      "Bachelor's Degree",
      "6 Years",
      35,
      "5",
      "",
      "6",
      "",
      "5"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Sports Science",
      "Bachelor's Degree",
      "3 Years",
      30,
      "4",
      "",
      "4",
      "",
      "4",
      "Physical Sciences OR Life Sciences."
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Science in Food Management – Nutritional Science",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5",
      "Interfaculty programme."
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Arts in Audiology",
      "Bachelor's Degree",
      "4 Years",
      32,
      "4"
    );

    await addCourse(
      "Health Sciences",
      "Bachelor of Arts in Speech-Language Pathology",
      "Bachelor's Degree",
      "4 Years",
      32,
      "4"
    );

    // =========================================================
    // FACULTY OF HUMANITIES
    // =========================================================

    await addCourse(
      "Humanities",
      "Bachelor of Arts in Speech-Language Pathology",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "4",
      "",
      "",
      "",
      "Selection programme. Limited places."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts in Audiology",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "4",
      "",
      "",
      "",
      "Selection programme. Limited places."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts in Information Design",
      "Bachelor's Degree",
      "4 Years",
      30,
      "5",
      "",
      "",
      "",
      "",
      "",
      "Online portfolio required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Social Work",
      "Bachelor's Degree",
      "4 Years",
      30,
      "5",
      "",
      "",
      "",
      "",
      "",
      "Departmental selection required after first year."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts specialising in Law",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts specialising in Languages",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Social Science specialising in Industrial Sociology and Labour Studies",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Social Science in Heritage and Cultural Sciences – Heritage and Cultural Tourism",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Music",
      "Bachelor's Degree",
      "4 Years",
      30,
      "5",
      "",
      "",
      "",
      "",
      "",
      "Practical audition and theoretical test required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Music",
      "Bachelor's Degree",
      "5 Years",
      26,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Five-year programme. Practical audition and theoretical test required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Drama",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5",
      "",
      "",
      "",
      "",
      "",
      "Audition required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Drama",
      "Bachelor's Degree",
      "4 Years",
      26,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Foundation programme. Audition required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts specialising in Philosophy, Politics and Economics",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Political Science specialising in International Studies",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Political Science specialising in Political Studies",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts in Fine Arts",
      "Bachelor's Degree",
      "4 Years",
      30,
      "5",
      "",
      "",
      "",
      "",
      "",
      "A4 portfolio and UP competency test required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts in Fine Arts",
      "Bachelor's Degree",
      "5 Years",
      26,
      "4",
      "",
      "",
      "",
      "",
      "",
      "Foundation programme. A4 portfolio and competency test required."
    );

    await addCourse(
      "Humanities",
      "Bachelor of Arts specialising in Visual Studies",
      "Bachelor's Degree",
      "3 Years",
      30,
      "5"
    );

    // =========================================================
    // FACULTY OF LAW
    // =========================================================

    await addCourse(
      "Law",
      "Bachelor of Laws (LLB)",
      "Bachelor's Degree",
      "4 Years",
      35,
      "6"
    );

    await addCourse(
      "Law",
      "Bachelor of Commerce specialising in Law",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5"
    );

    await addCourse(
      "Law",
      "Bachelor of Arts specialising in Law",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5"
    );

    // =========================================================
    // FACULTY OF THEOLOGY AND RELIGION
    // =========================================================

    await addCourse(
      "Theology and Religion",
      "Bachelor of Theology",
      "Bachelor's Degree",
      "3 Years",
      28,
      "4"
    );

    await addCourse(
      "Theology and Religion",
      "Bachelor of Divinity",
      "Bachelor's Degree",
      "4 Years",
      28,
      "4"
    );

    await addCourse(
      "Theology and Religion",
      "Diploma in Theology",
      "Diploma",
      "3 Years",
      24,
      "4"
    );

    // =========================================================
    // FACULTY OF NATURAL AND AGRICULTURAL SCIENCES
    // =========================================================

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Agricultural Economics in Agribusiness Management",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Animal Science",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Applied Plant and Soil Sciences",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Plant Pathology",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Food Management – Culinary Science",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Food Management – Nutritional Science",
      "Bachelor's Degree",
      "4 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5",
      "Interfaculty programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Food Science",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Biochemistry",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Biotechnology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Ecology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Entomology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Genetics and Human Genetics",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Human Physiology, Genetics and Psychology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Medical Sciences",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Microbiology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Plant Science",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Zoology",
      "Bachelor's Degree",
      "3 Years",
      32,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Consumer Science specialising in Clothing Retail Management",
      "Bachelor's Degree",
      "4 Years",
      28,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Consumer Science specialising in Food Management",
      "Bachelor's Degree",
      "4 Years",
      28,
      "5",
      "",
      "4"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Actuarial and Financial Mathematics",
      "Bachelor's Degree",
      "3 Years",
      36,
      "5",
      "",
      "7"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Mathematics",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Applied Mathematics",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Mathematical Statistics",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "6"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Chemistry",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Environmental and Engineering Geology",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Geography – Geography and Environmental Science",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Geoinformatics",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Geology",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Meteorology",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Physics",
      "Bachelor's Degree",
      "3 Years",
      34,
      "5",
      "",
      "5",
      "",
      "5"
    );

    // =========================================================
    // EXTENDED PROGRAMMES
    // =========================================================

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Mathematics – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "65%",
      "",
      "",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Chemistry – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Geoinformatics – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Geology – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Meteorology – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Physics – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      32,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Applied Plant and Soil Sciences – Extended Programme",
      "Bachelor's Degree",
      "5 Years",
      30,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Agriculture in Plant Pathology – Extended Programme",
      "Bachelor's Degree",
      "5 Years",
      30,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Ecology – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      30,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    await addCourse(
      "Natural and Agricultural Sciences",
      "Bachelor of Science in Human Physiology – Extended Programme",
      "Bachelor's Degree",
      "4 Years",
      30,
      "58%",
      "",
      "58%",
      "",
      "58%",
      "",
      "Extended programme."
    );

    // =========================================================
    // FACULTY OF VETERINARY SCIENCE
    // =========================================================

    await addCourse(
      "Veterinary Science",
      "Bachelor of Veterinary Science",
      "Bachelor's Degree",
      "6 Years",
      35,
      "5",
      "",
      "5",
      "",
      "5"
    );

    await addCourse(
      "Veterinary Science",
      "Bachelor of Veterinary Nursing",
      "Bachelor's Degree",
      "3 Years",
      28,
      "4",
      "",
      "4",
      "",
      "4",
      "",
      "Physical Sciences OR Life Sciences."
    );

    // =========================================================
    // CHECK HOW MANY UP COURSES WERE INSERTED
    // =========================================================

    const result = await db.getFirstAsync<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM courses
       WHERE institution_id = ?
       AND institution_type = ?`,
      [universityId, "university"]
    );

    console.log(
      `✅ University of Pretoria courses seeded: ${result?.count ?? 0}`
    );

  } catch (error) {
    console.error("❌ UP seed error:", error);
  }
};

export default seedUP;