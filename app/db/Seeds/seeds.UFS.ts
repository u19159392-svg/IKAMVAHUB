export const insertUFSCourses = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    -- =========================================
    -- UFS - FACULTY OF EDUCATION
    -- FOUNDATION PHASE
    -- =========================================

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Foundation Phase - Afrikaans Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Afrikaans Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Foundation Phase - Sesotho Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Sesotho Home Language 4 (50%); English FAL 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Foundation Phase - isiZulu Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'isiZulu Home Language 4 (50%); English FAL 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Foundation Phase - English Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Afrikaans Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- INTERMEDIATE PHASE
    -- =========================================

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Mathematics, Natural Sciences, Technology and Afrikaans Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'Afrikaans Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Life Skills, Social Sciences and Afrikaans Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Afrikaans Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Mathematics, Natural Sciences and Technology and English Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'English Home Language; Afrikaans Home Language or First Additional Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Life Skills, Social Sciences and English Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'English Home Language; Afrikaans Home Language or First Additional Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Mathematics, Natural Sciences and Technology and Sesotho Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'Sesotho Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Life Skills, Social Sciences and Sesotho Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Sesotho Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Mathematics, Natural Sciences and Technology and isiZulu Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'isiZulu Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Intermediate Phase - Life Skills, Social Sciences and isiZulu Home Language',
      'Degree',
      '4 years',
      'Free State',
      30,
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'isiZulu Home Language 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- SENIOR PHASE AND FET
    -- =========================================

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Accounting and Business Studies',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'Accounting 4 (50%); Business Studies 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - EMS and Accounting',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      'Accounting 4 (50%); Economics 4 (50%) OR Business Studies 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Technology and Engineering Graphics and Design',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Engineering Graphics and Design 4 (50%)',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Life Sciences and Mathematics',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Technology and Life Sciences',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Mathematics and Physical Sciences',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Education',
      'Bachelor of Education in Senior and FET Phase - Geography and Life Sciences',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '3 (40%)',
      NULL,
      NULL,
      '5 (60%)',
      NULL,
      'Geography 5 (60%)',
      'https://apply.ufs.ac.za/Application/Start'
    )
  `);
};
// =========================================
// UFS - FACULTY OF HEALTH SCIENCES
// =========================================

export const insertUFSHealthSciences = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    -- MBChB
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Medicine and Bachelor of Surgery (MBChB)',
      'Degree',
      '6 years',
      'Free State',
      36,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BMedSc Radiation Science
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Medical Science in Radiation Science',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Occupational Therapy
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Occupational Therapy',
      'Degree',
      '4 years',
      'Free State',
      34,
      '5 (60%)',
      NULL,
      '4 (50%)',
      NULL,
      '4 (50%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Physiotherapy
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Physiotherapy',
      'Degree',
      '4 years',
      'Free State',
      34,
      '5 (60%)',
      NULL,
      '4 (50%)',
      NULL,
      '4 (50%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Optometry
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Optometry',
      'Degree',
      '4 years',
      'Free State',
      34,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Dietetics
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Dietetics',
      'Degree',
      '4 years',
      'Free State',
      34,
      '5 (60%)',
      NULL,
      '4 (50%)',
      NULL,
      '4 (50%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Biokinetics
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Health Sciences in Biokinetics',
      'Degree',
      '4 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      '4 (50%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Sports Coaching
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Health Sciences in Sports Coaching',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Nursing
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Nursing',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      '4 (50%)',
      '4 (50%)',
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- Social Work
    (
      1,
      'University',
      'Faculty of Health Sciences',
      'Bachelor of Social Work',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF NATURAL AND AGRICULTURAL SCIENCES
// =========================================

export const insertUFSNaturalSciences = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    -- =========================================
    -- COMPUTER SCIENCE & INFORMATICS
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Computer Science',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty selection requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Computer Information Systems',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Information Technology',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- MATHEMATICS
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Mathematics',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Applied Mathematics',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- STATISTICS & ACTUARIAL SCIENCE
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Mathematical Statistics',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '6 (70%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Strong Mathematics performance required',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Actuarial Science',
      'Degree',
      '3 years',
      'Free State',
      36,
      '5 (60%)',
      NULL,
      '7 (80%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- PHYSICS
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Physics',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      'Required',
      'Physical Sciences required',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- CHEMISTRY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Chemistry',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      'Required',
      'Physical Sciences required',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- BIOCHEMISTRY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Biochemistry',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Physical Sciences and Life Sciences',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- MICROBIOLOGY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Microbiology',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Life Sciences required',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- GENETICS
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Genetics',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Life Sciences and Physical Sciences',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- GEOLOGY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Geology',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      NULL,
      'Required',
      'Physical Sciences recommended',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- GEOGRAPHY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Geography',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required',
      'Subject to faculty requirements',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- BOTANY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Botany',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Life Sciences and Physical Sciences',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- =========================================
    -- ZOOLOGY
    -- =========================================

    (
      1,
      'University',
      'Faculty of Natural and Agricultural Sciences',
      'Bachelor of Science in Zoology',
      'Degree',
      '3 years',
      'Free State',
      32,
      '4 (50%)',
      NULL,
      '5 (60%)',
      NULL,
      '5 (60%)',
      '5 (60%)',
      'Required',
      'Life Sciences and Physical Sciences',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES
// =========================================

export const insertUFSEMS = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    -- BCOM GENERAL
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 4',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BUSINESS ANALYTICS
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Business and Financial Analytics',
      'Degree',
      '3 years',
      'Free State',
      34,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 4',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BUSINESS MANAGEMENT
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Business Management',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '3 (40%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 3',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- ECONOMICS
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Economics',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 4',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- FINANCE
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Finance',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 4',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- HUMAN RESOURCE MANAGEMENT
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Human Resource Management',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '3 (40%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 3',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- MARKETING
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce with specialisation in Marketing',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '3 (40%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 3',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BCOM LAW
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce in Law',
      'Degree',
      '3 years',
      'Free State',
      33,
      '4 (50%)',
      NULL,
      '3 (40%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 3',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BCOM ACCOUNTING
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Commerce in Accounting',
      'Degree',
      '3 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 4; Mathematics Level 4',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BACHELOR OF ACCOUNTING
    (
      1,
      'University',
      'Faculty of Economic and Management Sciences',
      'Bachelor of Accounting',
      'Degree',
      '3 years',
      'Free State',
      34,
      '5 (60%)',
      NULL,
      '6 (70%)',
      NULL,
      NULL,
      NULL,
      'Required - Mathematics NBT',
      'English Level 5; Mathematics Level 6',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF LAW
// =========================================

export const insertUFSLaw = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    (
      1,
      'University',
      'Faculty of Law',
      'Bachelor of Laws (LLB)',
      'Degree',
      '4 years',
      'Free State',
      33,
      '6 (70%)',
      NULL,
      '4 (50%)',
      '6 (70%)',
      NULL,
      NULL,
      'Required',
      'English HL or English FAL Level 6; Mathematics Level 4 OR Mathematical Literacy Level 6. Applicants who do not meet the four-year requirements may be considered for the five-year programme through selection.',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF LAW
// =========================================

export const insertUFSLaw = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    (
      1,
      'University',
      'Faculty of Law',
      'Bachelor of Laws (LLB)',
      'Degree',
      '4 years',
      'Free State',
      33,
      '6 (70%)',
      NULL,
      '4 (50%)',
      '6 (70%)',
      NULL,
      NULL,
      'Required',
      'English HL or English FAL Level 6; Mathematics Level 4 OR Mathematical Literacy Level 6. Applicants who do not meet the four-year requirements may be considered for the five-year programme through selection.',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF THE HUMANITIES
// =========================================

export const insertUFSHumanities = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    -- BA
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Arts',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'General BA degree with major/minor/elective combinations',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BACHELOR OF SOCIAL SCIENCES
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Social Sciences',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Subject combinations depend on selected academic plan',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- SOCIAL WORK
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Social Work',
      'Degree',
      '4 years',
      'Free State',
      30,
      '5 (60%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Selection applies',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- FINE ARTS
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Arts majoring in Fine Arts',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Fine Arts-specific selection/portfolio requirements may apply',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- MUSIC
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor in Music',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Music-specific admission/selection requirements apply',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- BA MUSIC
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Arts majoring in Music',
      'Degree',
      '3 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Music-specific admission/selection requirements apply',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- MUSIC DIPLOMA
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Diploma in Music',
      'Diploma',
      '2 years',
      'Free State',
      25,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Music-specific admission/selection requirements apply',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- MUSIC HIGHER CERTIFICATE
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Higher Certificate in Music Performance',
      'Higher Certificate',
      '1 year',
      'Free State',
      20,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Music-specific admission/selection requirements apply',
      'https://apply.ufs.ac.za/Application/Start'
    ),

    -- COMMUNITY DEVELOPMENT
    (
      1,
      'University',
      'Faculty of the Humanities',
      'Bachelor of Arts majoring in Community Development',
      'Degree',
      '4 years',
      'Free State',
      30,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'AL, QL',
      'Offered at Qwaqwa Campus',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};
// =========================================
// UFS - FACULTY OF THEOLOGY AND RELIGION
// =========================================

export const insertUFSTheology = () => {
  db.execSync(`
    INSERT INTO courses (
      institution_id,
      institution_type,
      faculty,
      qualification,
      qualification_type,
      duration,
      province,
      minimum_aps,
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

    VALUES

    (
      1,
      'University',
      'Faculty of Theology and Religion',
      'Bachelor of Divinity',
      'Professional Degree',
      '4 years',
      'Free State',
      28,
      '4 (50%)',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'Professional theological degree; faculty-specific requirements may apply',
      'https://apply.ufs.ac.za/Application/Start'
    );
  `);
};