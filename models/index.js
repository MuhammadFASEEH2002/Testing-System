import mongoose from "mongoose";
// import { Course } from "./Course.js";

(async () => {
  await mongoose.connect(`mongodb+srv://faseeh:Aeiou.123@testing-system.pnoppvs.mongodb.net/`);
})();

// export const db = { Course };