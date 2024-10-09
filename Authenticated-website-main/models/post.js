const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    CoverImage:{
        type:String,
        required:false,
    }

});

const Post = mongoose.model('post',postSchema);
module.exports=Post;