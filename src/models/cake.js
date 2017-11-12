import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const CakeSchema = new Schema({
   isRemoved: {
       type: Boolean,
       default: false
   },
   cover: String,
   mainPageCover: String,
   pictures:[],
   name: {
       type: String,
       unique: true,
       required: true
   },
   description: String,
   helpInfo: String,
   store: Number,
   priceInfo:[],
   standards:[],
   isPromotion:Boolean,
   promotionUrl: String,
   onSale: Boolean,
   onMainPage: {
       type: Boolean,
       default: false
   },
   sales: {
        type: Number,
        default: 0
    },
   displaySales: {
       type: Number,
       default: 0
   },
   category: {
       type: Schema.Types.ObjectId,
       ref: 'Category'
   },
   createAt: {
       type: Date,
       default: Date.now
   }
},{ collection: 'cake' ,timestamps: true});
const cake = mongoose.model('Cake', CakeSchema);

export default cake;
