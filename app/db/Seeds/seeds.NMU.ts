import * as SQLite from "expo-sqlite";

export const seedNMU = async (db: SQLite.SQLiteDatabase) => {
  try {
    console.log("🌱 Starting Nelson Mandela University seeding...");

    // =========================================================
    // 1. FIND OR CREATE NELSON MANDELA UNIVERSITY
    // =========================================================

    let university = await db.getFirstAsync<{
      id: number;
    }>(
      `SELECT id FROM universities
       WHERE name = ?`,
      ["Nelson Mandela University"]
    );

    let universityId: number;

    if (university) {
      universityId = university.id;
      console.log("ℹ️ NMU already exists with ID:", universityId);
    } else {
      const result = await db.runAsync(
        `INSERT INTO universities
        (
          name,
          province,
          website,
          contact,
          minimum_aps,
          image_url
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          "Nelson Mandela University",
          "Eastern Cape",
          "https://www.mandela.ac.za",
          "041 504 1111",
          null,
          "",
        ]
      );

      universityId = Number(result.lastInsertRowId);

      console.log(
        "✅ Nelson Mandela University created with ID:",
        universityId
      );
    }

    // =========================================================
    // 2. CHECK IF NMU COURSES ALREADY EXIST
    // =========================================================

    const existingCourses = await db.getAllAsync(
      `SELECT id
       FROM courses
       WHERE institution_id = ?`,
      [universityId]
    );

    if (existingCourses.length > 0) {
      console.log(
        `ℹ️ NMU already has ${existingCourses.length} courses.`
      );
      return;
    }

    console.log("🌱 Adding NMU undergraduate programmes...");

    // =========================================================
    // 3. NMU COURSES
    // =========================================================

    const courses = [

      // =====================================================
      // FACULTY OF EDUCATION
      // =====================================================

      {
        faculty: "Education",
        qualification: "Bachelor of Education (Foundation Phase)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Education",
        qualification: "Bachelor of Education (Intermediate Phase)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Education",
        qualification:
          "Bachelor of Education (Senior Phase and Further Education and Training) – Commerce",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Education",
        qualification:
          "Bachelor of Education (Senior Phase and Further Education and Training) – Science",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Education",
        qualification:
          "Bachelor of Education (Senior Phase and Further Education and Training) – Humanities",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Education",
        qualification:
          "Advanced Diploma in Technical and Vocational Teaching",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      // =====================================================
      // FACULTY OF ENGINEERING, BUILT ENVIRONMENT & TECHNOLOGY
      // =====================================================

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Higher Certificate in Mechatronic Engineering",
        qualification_type: "Higher Certificate",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Higher Certificate in Renewable Energy Engineering",
        qualification_type: "Higher Certificate",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Higher Certificate in IT (User Support Services)",
        qualification_type: "Higher Certificate",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Higher Certificate in Human Settlement Development",
        qualification_type: "Higher Certificate",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Diploma in Operations Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Diploma in Architectural Technology",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Diploma in Interior Design",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Diploma in Building",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Diploma in Information Technology: Software Development",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Diploma in Information Technology: Communication Networks",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Diploma in Information Technology: Support Services",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Quality",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Operations Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Architectural Design",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Architectural Technology",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Interior Design",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Quantity Surveying",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Construction Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Advanced Diploma in Information Technology",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Engineering (Mechatronics)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Bachelor of Engineering Technology (Electrical Engineering)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Bachelor of Engineering Technology (Industrial Engineering)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Bachelor of Engineering Technology (Mechanical Engineering)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Bachelor of Engineering Technology (Marine Engineering)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification:
          "Bachelor of Engineering Technology (Civil Engineering)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Architectural Studies",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Science in Construction Economics",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Science in Construction Management",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Human Settlement Development",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty:
          "Engineering, the Built Environment & Technology",
        qualification: "Bachelor of Information Technology",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      // =====================================================
      // FACULTY OF HEALTH SCIENCES
      // =====================================================

      {
        faculty: "Health Sciences",
        qualification: "Diploma in Sport Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Environmental Health",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Arts in Psychology",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Social Work",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Science in Dietetics",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Human Movement Science",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Health Sciences in Biokinetics",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Nursing",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Nursing (Extended Curriculum)",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      {
        faculty: "Health Sciences",
        qualification:
          "Bachelor of Radiography (Diagnostic)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification:
          "Bachelor of Emergency Medical Care",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification:
          "Bachelor of Health Sciences in Medical Laboratory Science",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification: "Bachelor of Pharmacy",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Health Sciences",
        qualification:
          "Bachelor of Medicine and Bachelor of Surgery (MBChB)",
        qualification_type: "Bachelor's Degree",
        duration: "6 years",
      },

      // =====================================================
      // FACULTY OF HUMANITIES
      // =====================================================

      {
        faculty: "Humanities",
        qualification: "Diploma in Music (Curriculum 1)",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification: "Diploma in Music (Curriculum 2)",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification: "Diploma in Public Relations Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification: "Diploma in Public Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Diploma in Public Management – Extended Curriculum",
        qualification_type: "Diploma",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Advanced Diploma in Public Relations Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty: "Humanities",
        qualification:
          "Advanced Diploma in Public Administration and Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty: "Humanities",
        qualification: "Bachelor of Visual Art",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 1: School Music",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 1: School Music – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 2: Performing Arts",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 2: Performing Arts – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 3: Music Technology",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 3: Music Technology – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 4: General",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Music – Stream 4: General – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      {
        faculty: "Humanities",
        qualification: "Bachelor of Arts",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification:
          "Bachelor of Arts in Media, Communication and Culture",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification: "Bachelor of Administration",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Humanities",
        qualification: "Bachelor of Arts in Politics and Economics",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      // =====================================================
      // FACULTY OF LAW
      // =====================================================

      {
        faculty: "Law",
        qualification: "Higher Certificate in Law Enforcement",
        qualification_type: "Higher Certificate",
        duration: "1 year",
      },

      {
        faculty: "Law",
        qualification: "Diploma in Law Enforcement",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Law",
        qualification: "Bachelor of Arts in Law",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Law",
        qualification: "Bachelor of Commerce in Law",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Law",
        qualification: "Bachelor of Laws (LLB)",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Law",
        qualification: "Bachelor of Laws (LLB) – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "5 years",
      },

      // =====================================================
      // FACULTY OF SCIENCE
      // =====================================================

      {
        faculty: "Science",
        qualification: "Diploma in Agricultural Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification: "Diploma in Analytical Chemistry",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification: "Diploma in Game Ranch Management",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification: "Diploma in Polymer Technology",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification: "Diploma in Chemical Process Technology",
        qualification_type: "Diploma",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Advanced Diploma in Analytical Chemistry",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty: "Science",
        qualification:
          "Advanced Diploma in Agricultural Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty: "Science",
        qualification:
          "Advanced Diploma in Game Ranch Management",
        qualification_type: "Advanced Diploma",
        duration: "1 year",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Biological Sciences",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Biological Sciences – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Biochemistry, Chemistry, Microbiology and Physiology",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Biochemistry, Chemistry, Microbiology and Physiology – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Environmental Sciences",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Environmental Sciences – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Geosciences (Geology and Geography)",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Geosciences (Geology and Geography) – Extended Curriculum",
        qualification_type: "Bachelor's Degree",
        duration: "4 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Computer Science",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },

      {
        faculty: "Science",
        qualification:
          "Bachelor of Science in Physical Science and Mathematics",
        qualification_type: "Bachelor's Degree",
        duration: "3 years",
      },
    ];

    // =========================================================
    // 4. INSERT COURSES
    // =========================================================

    for (const course of courses) {
      await db.runAsync(
        `INSERT INTO courses
        (
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
          course.faculty,
          course.qualification,
          course.qualification_type,
          course.duration,
          "Eastern Cape",
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          "See the official NMU undergraduate guide for programme-specific admission and subject requirements.",
          "https://www.mandela.ac.za/Study-at-Mandela",
        ]
      );
    }

    // =========================================================
    // 5. FINAL COUNT
    // =========================================================

    const totalNMUCourses = await db.getAllAsync(
      `SELECT id, faculty, qualification
       FROM courses
       WHERE institution_id = ?
       ORDER BY faculty, qualification`,
      [universityId]
    );

    console.log(
      `✅ NMU seeding completed. Total NMU courses: ${totalNMUCourses.length}`
    );

    console.log("🎓 NMU courses:", totalNMUCourses);

  } catch (error) {
    console.error("❌ NMU seeding error:", error);
  }
};