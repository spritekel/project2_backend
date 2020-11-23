const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline)
const { path } = require('dotenv/lib/env-options');

//adding multer to make temp storage
const multer = require('multer');

//tried to add temp storage but didnt work :(
//const storage = multer.diskStorage({
//    destination: function(req, file, cb){
//        cb(null, 'uploads');
//    },
    //Adding extension back to muler
//    filename: function(feq, file, cb){
//        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//    }
//});

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

//upload file post to server
router.post('/uploads', (req,res) => {
    console.log('Upload api triggered!!!.....');
    console.log(req.file);
    if(req.file === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }
    const file = req.file;
    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
    });

//better way of uploading using multer to handle the data
//    var upload = multer({storage: storage});
    const upload = multer();
    router.post('/upload', upload.single("file"), async function(req, res, next){
        
        //console.log("HEY hey from new upload function!!");
        console.log(req.file);
        const {file} = req;
        //if(file.detectedFileExtension != ".xlsx") next(new Error("Invalid file type!"));
        console.log(req.file.originalname);
        console.log(req.file.mimetype);
        const fileName = req.file.originalname;
        try {
            await pipeline(file.stream, fs.createWriteStream(`${__dirname}/uploads/${fileName}`));
            res.send("File uploaded!");    
        } catch (error) {
            res.send("Error uploading file");
        };  
        
    });

module.exports = router;

//what he runs in browser to request to backend from frontend
// fetch('http://localhost:3000/posts')
// .then(result => {
//  console.log(reslt);
//  })