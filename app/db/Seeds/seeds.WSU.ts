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

export const WSU_COURSES: CourseSeed[] = [
  // Faculty of Natural Sciences

  // DIPLOMAS
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Diploma in Analytical Chemistry (W64001)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Diploma in Analytical Chemistry (ECP) (W64002)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 20,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Extended Curriculum entry",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Diploma in Consumer Science in Food and Nutrition (W64004)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Diploma in Consumer Science in Food and Nutrition (ECP) (W64039)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 20,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: "Level 3",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Extended Curriculum entry",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Diploma in Pest Management (W64005)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "No",
    physical_sciences: "Level 3",
    life_sciences: "Level 3",
    nbt: null,
    additional_requirements: "Life Sciences Level 3; Physical Sciences Level 3",
    apply_url: "https://www.wsu.ac.za",
  },

  // BSc MAINSTREAM
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Applied Mathematics (W64007)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Applied Statistical Sciences (W64009)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Biological Sciences (W64011)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 5",
    life_sciences: "Level 5",
    nbt: null,
    additional_requirements: "Both Physical Sciences and Life Sciences Level 5 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Chemistry (W64013)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 5",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 5 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Computer Science (W64015)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Environmental Studies (W64017)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements: "Life Sciences/Agriculture/Tourism Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Mathematics (W64019)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Natural Sciences",
    qualification: "Bachelor of Science in Pest Management (W64021)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements: "Both Physical Sciences and Life Sciences Level 4 required",
    apply_url: "https://www.wsu.ac.za",
  },

  // Faculty of Medicine & Health Sciences
  {
    faculty: "Faculty of Medicine & Health Sciences",
    qualification: "Bachelor of Medical Sciences (W65001)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "African Language Level 4; Physical Sciences Level 4; Life Sciences Level 4; One additional subject (excluding Life Orientation) at Level 4. Additional faculty selection criteria apply.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Medicine & Health Sciences",
    qualification: "Bachelor of Medicine in Clinical Practice (W65002)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "African Language Level 4; Physical Sciences Level 4; Life Sciences Level 4; One additional subject (excluding Life Orientation) at Level 4. Additional faculty selection criteria apply.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Medicine & Health Sciences",
    qualification: "Bachelor of Nursing (W65004)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "African Language Level 4; Physical Sciences Level 4; Life Sciences Level 4; One additional subject (excluding Life Orientation) at Level 4. Additional faculty selection criteria apply.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Medicine & Health Sciences",
    qualification: "Bachelor of Health Sciences in Medical Orthotics and Prosthetics (W65005)",
    qualification_type: "Bachelor's Degree",
    duration: "4 Years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements:
      "African Language Level 4; Physical Sciences Level 4; Life Sciences Level 4; One additional subject (excluding Life Orientation) at Level 4. Additional faculty selection criteria apply.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Medicine & Health Sciences",
    qualification: "Bachelor of Medicine and Bachelor of Surgery (MBChB) (W65006)",
    qualification_type: "Bachelor's Degree",
    duration: "6 Years",
    minimum_aps: 30,
    fps: null,
    english_hl: "Level 5",
    english_fal: null,
    mathematics: "Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 5",
    life_sciences: "Level 5",
    nbt: null,
    additional_requirements:
      "African Language Level 5; Physical Sciences Level 5; Life Sciences Level 5; One additional subject (excluding Life Orientation) at Level 5. Additional faculty selection criteria apply.",
    apply_url: "https://www.wsu.ac.za",
  },

  // Faculty of Management & Public Administration Sciences
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Higher Certificate in Versatile Broadcasting (W61001)",
    qualification_type: "Higher Certificate",
    duration: "1 Year",
    minimum_aps: 18,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Another language Level 3; any two additional subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Administrative Management (W61002)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any two additional subjects at Level 4.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Hospitality Management (W61003)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any three relevant school subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Human Resources Management (W61004)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any two school subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Human Resources Management (ECP) (W61005)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 20,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 3 accepted; any two school subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Journalism (W61006)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 5",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Another language Level 4; any two additional subjects at Level 4.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Local Government Finance (W61007)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Accounting Level 3 or Mathematics Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Local Government Finance (ECP) (W61008)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 20,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Accounting Level 2 or Mathematics Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 3 accepted.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Management (W61009)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 3 required; Mathematical Literacy Level 4 accepted.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Management (ECP) (W61010)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 20,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Accounting Level 2 required; Mathematical Literacy Level 3 accepted.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Marketing Management (W61011)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any other two subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Policing (W61012)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Any other four subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Office Management & Technology (W61013)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any other two subjects at Level 4.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Office Management & Technology (ECP) (W61014)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 19,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 3 accepted; any other two subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Public Management (W61015)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Any other four subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Public Relations Management (W61016)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 5",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Another language Level 4; any other two subjects at Level 4.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Public Relations Management (ECP) (W61017)",
    qualification_type: "Diploma (ECP)",
    duration: "4 Years",
    minimum_aps: 19,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Another language Level 3; any other two subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Small Business Management (W61018)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: "Mathematics Level 3 or Accounting Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any other two subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Sport Management (W61019)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 3",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Any other three subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Diploma in Tourism Management (W61020)",
    qualification_type: "Diploma",
    duration: "3 Years",
    minimum_aps: 21,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4 accepted; any three relevant school subjects at Level 3.",
    apply_url: "https://www.wsu.ac.za",
  },
  {
    faculty: "Faculty of Management & Public Administration Sciences",
    qualification: "Bachelor of Administration (W61029)",
    qualification_type: "Bachelor's Degree",
    duration: "3 Years",
    minimum_aps: 25,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Any other four subjects at Level 4.",
    apply_url: "https://www.wsu.ac.za",
  },
];
// Faculty of Law, Humanities & Social Sciences
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Diploma in Fashion (W66001)"
  qualification_type: "Diploma"
  duration: "3 Years"
  minimum_aps: 19
  fps: null
  english_hl: "Level 4"
  english_fal: null
  mathematics: "Mathematics Level 2 or Accounting Level 2"
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Mathematical Literacy Level 3 accepted. Students meeting minimum requirements are subject to an evaluation for final placement."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Diploma in Fine Art (W66002)"
  qualification_type: "Diploma"
  duration: "3 Years"
  minimum_aps: 19
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Students meeting minimum requirements are subject to an evaluation for final placement. In exceptional cases, applicants with English Level 2 may be admitted based on an excellent portfolio and successful internal assessment/interview."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Arts (W66004)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Achieve Level 4 in any two of the following: isiXhosa, Sesotho, Geography or History."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Arts (English) (W66029)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: "Level 5"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Achieve Level 4 in any one of the following: isiXhosa, Sesotho, Geography or History."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Anthropology) (W66007)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Anthropology) (ECP) (W66008)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Criminology) (W66009)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Criminology) (ECP) (W66010)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Philosophy) (W66011)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Philosophy) (ECP) (W66012)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Political Studies) (W66013)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Political Studies) (ECP) (W66014)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Population Studies) (W66015)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Population Studies) (ECP) (W66016)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Psychology) (W66017)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Psychology) (ECP) (W66018)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Sociology) (W66019)"
  qualification_type: "Bachelor's Degree"
  duration: "3 Years"
  minimum_aps: 25
  fps: null
  english_hl: null
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Science (Sociology) (ECP) (W66020)"
  qualification_type: "Bachelor's Degree (ECP)"
  duration: "4 Years"
  minimum_aps: 24
  fps: null
  english_hl: "Level 3"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Level 4 in any four additional subjects."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Laws (W66021)"
  qualification_type: "Bachelor's Degree"
  duration: "4 Years"
  minimum_aps: 26
  fps: null
  english_hl: "Level 5"
  english_fal: null
  mathematics: "Level 3"
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: null
  nbt: null
  additional_requirements: "Mathematical Literacy Level 4 accepted."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Psychology (W66022)"
  qualification_type: "Bachelor's Degree"
  duration: "4 Years"
  minimum_aps: 26
  fps: null
  english_hl: "Level 4"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: "Level 4"
  nbt: null
  additional_requirements: "African Language Level 4; Life Sciences Level 4; Character reference checks are conducted and a negative result may lead to deregistration."
  apply_url: "https://www.wsu.ac.za"
}
{
  faculty: "Faculty of Law, Humanities & Social Sciences"
  qualification: "Bachelor of Social Work (W66023)"
  qualification_type: "Bachelor's Degree"
  duration: "4 Years"
  minimum_aps: 26
  fps: null
  english_hl: "Level 4"
  english_fal: null
  mathematics: null
  mathematical_literacy: "Yes"
  physical_sciences: null
  life_sciences: "Level 4"
  nbt: null
  additional_requirements: "African Language Level 5; Life Sciences Level 4; Level 4 in any other three subjects (excluding Life Orientation); Character reference checks are conducted and a negative result may lead to deregistration."
  apply_url: "https://www.wsu.ac.za"
}
const courses = [
  //Faculty of Engineering, Built Environment & Information Technology
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Building Technology (W60001)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4 or Technical Mathematics Level 5",
    mathematical_literacy: "No",
    physical_sciences: "Level 3 or Technical Science Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 3 or Technical Science Level 4.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Building Technology (ECP) (W60002)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 3* or Technical Mathematics Level 4*",
    mathematical_literacy: "No",
    physical_sciences: "Level 3* or Technical Science Level 3*",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 3* or Technical Science Level 3*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Civil Engineering (W60003)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Civil Engineering (ECP) (W60004)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 3*",
    mathematical_literacy: "No",
    physical_sciences: "Level 3*",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 3*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Electrical Engineering (W60005)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Electrical Engineering (ECP) (W60006)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 3*",
    mathematical_literacy: "No",
    physical_sciences: "Level 3*",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 3*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Mechanical Engineering (W60007)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4 or Technical Mathematics Level 4",
    mathematical_literacy: "No",
    physical_sciences: "Level 4 or Technical Science Level 4",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 4 or Technical Science Level 4.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Mechanical Engineering (ECP) (W60008)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 3* or Technical Mathematics Level 3*",
    mathematical_literacy: "No",
    physical_sciences: "Level 3* or Technical Science Level 3*",
    life_sciences: null,
    nbt: null,
    additional_requirements: "Physical Sciences Level 3* or Technical Science Level 3*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Applications Development (W60009)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy accepted at Level 5.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Applications Development (ECP) (W60010)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 18,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 2*",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Business Analysis (W60011)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy accepted at Level 5.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Business Analysis (ECP) (W60012)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 18,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 2*",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Communication Networks (W60013)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy accepted at Level 5.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Communication Networks (ECP) (W60014)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 18,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 2*",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Support Services (W60015)",
    qualification_type: "Diploma",
    duration: "3 years",
    minimum_aps: 22,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 3",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy accepted at Level 5.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Engineering, Built Environment & Information Technology",
    qualification: "Diploma in Information and Communications Technology in Support Services (ECP) (W60016)",
    qualification_type: "Diploma",
    duration: "4 years",
    minimum_aps: 18,
    fps: null,
    english_hl: "Level 3*",
    english_fal: null,
    mathematics: "Level 2*",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "Mathematical Literacy Level 4*. Applicants may be one level below the mainstream requirement in one required subject.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
  //Faculty of Education
  
    faculty: "Education",
    qualification: "Bachelor of Education in Foundation Phase Teaching (W62006)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "isiXhosa HL Level 4; Mathematical Literacy Level 4; Life Orientation Level 5 (Major); Any other two subjects totalling 8 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Creative Arts History) (W62007)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Not Required",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; History Level 4; Music/Dance Studies/Dramatic Arts/Visual Arts Level 4; Any other three subjects totalling 8 APS points. Applicants without Music must complete a Music Aptitude Test.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Creative Arts English) (W62019)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 5",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Not Required",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; Music/Dance Studies/Dramatic Arts/Visual Arts Level 4; Any other subject Level 4; Any other three subjects totalling 7 APS points. Applicants without Music must complete a Music Aptitude Test.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Consumer & Management Science) (W62008)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Required",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; Consumer Studies or Hospitality or Tourism Level 4; Any other two subjects totalling 10 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Economic & Management Science) (W62009)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 2",
    mathematical_literacy: "Yes",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; Mathematical Literacy Level 4 accepted; Two of the following at Level 4: Accounting, Business Studies, Economics; Any other two subjects totalling 6 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Humanities) (W62010)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Not Required",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; History Level 4; Geography Level 4; Any other three subjects totalling 8 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Languages) (W62011)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 5",
    english_fal: null,
    mathematics: null,
    mathematical_literacy: "Not Required",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "isiXhosa HL/FAL Level 4; Any other two subjects at Level 4; Any other three subjects totalling 7 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Maths, Science & Technology) (W62012)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: "Level 4",
    nbt: null,
    additional_requirements: "African Language Level 4; Life Sciences or Physical Sciences Level 4; Any other two subjects totalling 8 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
  {
    faculty: "Education",
    qualification: "Bachelor of Education in Senior Phase & FET Teaching (Technical and Vocational Education) (W62018)",
    qualification_type: "Degree",
    duration: "4 years",
    minimum_aps: 24,
    fps: null,
    english_hl: "Level 4",
    english_fal: null,
    mathematics: "Level 4 or Technical Mathematics Level 4",
    mathematical_literacy: "No",
    physical_sciences: null,
    life_sciences: null,
    nbt: null,
    additional_requirements: "African Language Level 4; Any two of: Technical Sciences, EGD, Civil Technology, Electrical Technology, Mechanical Technology, Mathematics or Physical Sciences at Level 4; Any other two subjects totalling 8 APS points.",
    apply_url: "https://www.wsu.ac.za"
  },
{
  faculty: "Economic & Financial Sciences",
  qualification: "Diploma in Accountancy (W63001)",
  qualification_type: "Diploma",
  duration: "3 years",
  minimum_aps: 21,
  fps: null,
  english_hl: "Level 3",
  english_fal: null,
  mathematics: "Level 3",
  mathematical_literacy: "No",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Two additional subjects at Level 3.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Diploma in Financial Information Systems (W63002)",
  qualification_type: "Diploma",
  duration: "3 years",
  minimum_aps: 21,
  fps: null,
  english_hl: "Level 3",
  english_fal: null,
  mathematics: "Level 3",
  mathematical_literacy: "No",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Two additional subjects at Level 3.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Diploma in Internal Auditing – Mainstream (W63004)",
  qualification_type: "Diploma",
  duration: "3 years",
  minimum_aps: 21,
  fps: null,
  english_hl: "Level 3",
  english_fal: null,
  mathematics: "Level 3 or Accounting Level 3",
  mathematical_literacy: "Yes",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Mathematical Literacy accepted at Level 5.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Diploma in Internal Auditing – Extended (W63005)",
  qualification_type: "Diploma",
  duration: "4 years",
  minimum_aps: 20,
  fps: null,
  english_hl: "Level 3",
  english_fal: null,
  mathematics: "Level 3 or Accounting Level 3",
  mathematical_literacy: "Yes",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Mathematical Literacy accepted at Level 4.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Bachelor of Accounting (W63008)",
  qualification_type: "Degree",
  duration: "3 years",
  minimum_aps: 25,
  fps: null,
  english_hl: "Level 4",
  english_fal: null,
  mathematics: "Level 4",
  mathematical_literacy: "No",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Bachelor's degree endorsement required.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Bachelor of Accounting Sciences (W63009)",
  qualification_type: "Degree",
  duration: "4 years",
  minimum_aps: 27,
  fps: null,
  english_hl: "Level 5",
  english_fal: null,
  mathematics: "Level 4",
  mathematical_literacy: "No",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Bachelor's degree endorsement required.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Bachelor of Commerce (W63010)",
  qualification_type: "Degree",
  duration: "3 years",
  minimum_aps: 25,
  fps: null,
  english_hl: "Level 4",
  english_fal: null,
  mathematics: "Level 3",
  mathematical_literacy: "Yes",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Mathematical Literacy accepted at Level 5.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Bachelor of Commerce in Business Management (W63011)",
  qualification_type: "Degree",
  duration: "3 years",
  minimum_aps: 25,
  fps: null,
  english_hl: "Level 4",
  english_fal: null,
  mathematics: "Level 3",
  mathematical_literacy: "Yes",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Mathematical Literacy accepted at Level 5.",
  apply_url: "https://www.wsu.ac.za"
},
{
  faculty: "Economic & Financial Sciences",
  qualification: "Bachelor of Commerce in Economics (W63012)",
  qualification_type: "Degree",
  duration: "3 years",
  minimum_aps: 25,
  fps: null,
  english_hl: "Level 4",
  english_fal: null,
  mathematics: "Level 3",
  mathematical_literacy: "Yes",
  physical_sciences: null,
  life_sciences: null,
  nbt: null,
  additional_requirements: "Mathematical Literacy accepted at Level 5.",
  apply_url: "https://www.wsu.ac.za"
},
]
export async function seedWSU(db: SQLite.SQLiteDatabase) {
  // WSU's row already exists in the main "universities" seed list —
  // look up its id rather than inserting a new university row.
  const uni = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    ["Walter Sisulu University"]
  );

  if (!uni) {
    console.error("❌ WSU: university row not found, skipping course seed");
    return;
  }

  for (const course of WSU_COURSES) {
    await db.runAsync(
      `INSERT INTO courses (
        institution_id, institution_type, faculty, qualification, qualification_type,
        duration, province, minimum_aps, fps, english_hl, english_fal, mathematics,
        mathematical_literacy, physical_sciences, life_sciences, nbt,
        additional_requirements, apply_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uni.id,
        "university",
        course.faculty,
        course.qualification,
        course.qualification_type,
        course.duration,
        "Eastern Cape",
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
      ]
    );
  }
  console.log("✅ Seeded WSU courses");
}