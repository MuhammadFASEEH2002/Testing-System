import mongoose from "mongoose";
const { model, Schema } = mongoose;

const StudentSchema = new Schema({
    firstName : {type: String, required:true},
    lastName: {type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
});

export const Student= model("student", StudentSchema);