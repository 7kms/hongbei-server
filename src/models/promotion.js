import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const itemSchema = new Schema({
   point: {
       type: Number,
       required: true
   },
   reward: {
        type: Number,
        required: true
    },
    enable: {
        type: Boolean,
        default: false 
    }
},{ collection: 'promotion' ,timestamps: true});

const cake = mongoose.model('promotion', itemSchema);


export default cake;
