import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    info:{}
},{ collection: 'cart' ,timestamps: true});


/**
 * Methods
 */

schema.methods = {

};
  

schema.statics = {
  
}
export default mongoose.model('Cart', schema);