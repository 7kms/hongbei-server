import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const CakeSchema = new Schema({
   cover:String,
   pictures:[],
   name:String,
   description:String,
   price:Number,
   standard:[],
   isPromotion:Boolean,
   promotionUrl: String,
   sales: Number,
   category: String
},{ collection: 'cake' });
const cake = mongoose.model('Cake', CakeSchema);

export default cake;
