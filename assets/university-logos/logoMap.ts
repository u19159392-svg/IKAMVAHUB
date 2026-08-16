// app/assets/university-logos/logoMap.ts
//
// Maps each university's database id to its local logo file.
// Download a PNG/JPG logo, drop it in this folder, then add a line below.
// Find each id by checking the id column in your universities table
// (e.g. log getUniversities() once and note the ids).

export const universityLogos: Record<number, any> = {
  1: require("./NMU.jpg"),
  
};