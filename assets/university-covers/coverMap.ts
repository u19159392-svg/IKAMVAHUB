// app/assets/university-covers/coverMap.ts
//
// Maps each university's database id to its local cover/campus photo.
// Download a PNG/JPG campus photo, drop it in this folder, then add a line below.
// Any id not listed here falls back to a plain turquoise banner in the UI.

export const universityCovers: Record<number, any> = {
  // 1: require("./uct-campus.jpg"),
  // 2: require("./stellenbosch-campus.jpg"),
};