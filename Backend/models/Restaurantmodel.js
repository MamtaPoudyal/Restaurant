import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,require:true}
})

const foodmeodel1 = mongoose.models.food || mongoose.model("food",foodschema)

export default foodmeodel1;