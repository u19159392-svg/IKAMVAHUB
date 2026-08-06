import * as SQLite from "expo-sqlite";

export const seedUKZN = async (db: SQLite.SQLiteDatabase) => {
  const ukzn = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM universities WHERE name = ?",
    ["University of KwaZulu-Natal"]
  );

  if (!ukzn) {
    throw new Error("University of KwaZulu-Natal not found.");
  }

  const institutionId = ukzn.id;
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
    english_hl,
    english_fal,
    mathematics,
    mathematical_literacy,
    physical_sciences,
    life_sciences,
    nbt,
    additional_requirements,
    apply_url
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    institutionId,
    "university",
    "College of Agriculture, Engineering and Science",
    "BSc Engineering (Agricultural)",
    "Bachelor's Degree",
    "4 Years",
    "KwaZulu-Natal",
    33,
    "Level 4",
    "Level 4",
    "Level 5 (65%)",
    "No",
    "Level 5 (65%)",
    "Not Required",
    "No",
    "Life Orientation Level 4",
    "https://www.ukzn.ac.za"
  ]
);

  console.log("UKZN ID:", institutionId);
};