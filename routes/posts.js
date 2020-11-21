const express = require('express');

const router = express.Router();
const Post = require('../models/Post');


//Routes
//this is what is sent back when a request is sent to it

//this router gets back all the posts
router.get('/', async (req,res) => {
    try{
        const post = await Post.find();
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

//submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        field1: req.body.field1,
        field2: req.body.field2,
        field3: req.body.field3    
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.json({message: err});
    }
});

//gets back a specific post by the ID
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

//deleting a specific post
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({message: err});
    }
});

//updating a post
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set : {field1: req.body.field1}}
            );
            res.json(updatedPost);
    }catch(err){message: err};
});

module.exports = router;

//what he runs in browser to request to backend from frontend
// fetch('http://localhost:3000/posts')
// .then(result => {
//  console.log(reslt);
//  })