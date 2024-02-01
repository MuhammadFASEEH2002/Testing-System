import mongoose from "mongoose";
import { Teacher } from "./Teacher.js";
import { Student } from "./Student.js";

// import { Course } from "./Course.js";

(async () => {
  await mongoose.connect(`mongodb+srv://faseeh:Aeiou.123@testing-system.pnoppvs.mongodb.net/`);
})();

export const db = {Teacher, Student};