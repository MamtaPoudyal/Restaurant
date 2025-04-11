import mongoose from "mongoose";

  export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yakthungmachristeena:<db_password>@cluster0.lgxfe7v.mongodb.net/RESTAURANT').then(()=>console.log("DB connected"));
}