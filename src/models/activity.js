import mongoose from 'mongoose'
let Schema = mongoose.Schema;
const itemSchema = new Schema({
   title: String,
   picture: {
        type: String,
        required: true
    },
    enable: Boolean,
   desc: String
},{ collection: 'activity' ,timestamps: true});

const cake = mongoose.model('activity', itemSchema);


export default cake;
