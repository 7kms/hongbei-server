import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address:{},
    goods:{
        type: Schema.Types.Array,
        required: true
    },
    paid: {
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