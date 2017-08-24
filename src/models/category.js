import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const itemSchema = new Schema({
   name: {
       type: String,
       unique: true,
       required: true
   }
},{ collection: 'category' ,timestamps: true});

const cake = mongoose.model('Category', itemSchema);


export default cake;
