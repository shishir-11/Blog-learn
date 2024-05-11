import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:Buffer,
    author:{type:Schema.Types.ObjectId, ref:'User'}
},{
    timestamps:true
});

const PostModel = model('Post',PostSchema);

export default PostModel;