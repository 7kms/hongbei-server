import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address:{},
    goods:[],
    totalPrice:{
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    onDeliver: {
        type: Boolean,
        default: false
    }
},{ collection: 'order' ,timestamps: true});


/**
 * Methods
 */

schema.methods = {

};
  

schema.statics = {
  
}
export default mongoose.model('Order', schema);