import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: Schema.Types.String,
        required: true
    }
},{ collection: 'feed' ,timestamps: true});

export default mongoose.model('Feed', schema);