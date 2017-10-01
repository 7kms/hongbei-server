import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const itemSchema = new Schema({
   title: {
       type: String,
       unique: true,
       required: true
   },
   cover:{
       type: String,
       required: true
   },
   sections:[]
},{ collection: 'course' ,timestamps: true});

const course = mongoose.model('Course', itemSchema);


export default course;
