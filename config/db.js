import mongoose from "mongoose";

 export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://shova:shovadulal@cluster0.q9ualiv.mongodb.net/Restaurant').then(()=>console.log("DB Connected"));
}