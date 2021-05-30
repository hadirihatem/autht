const express = require("express");
const router = express.Router();
const authMiddelware = require("../helpers/authMiddleware");
const Post = require("../models/Post");

//ADD new Post
router.post('/', authMiddelware, (req, res) => {
  let newPost = new Post({ ...req.body, owner : req.userId });

  newPost
    .save()
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
});

//get all post

router.get('/',authMiddelware,(req,res)=>{
    Post.find()
    .then(posts=>res.send(posts))
    .catch((err)=>{
        console.log(err.message);
        res.status(500).json({msg:'Server Error'});
    });
});

//get user post 

router.get('/mypost',authMiddelware,(req,res)=>{
    User.find({owner:req.userId})
    .then(posts=>res.send(posts))
    .catch((err)=>{
        console.log(err.message);
        res.status(500).json({msg:'Server Error'});
    });
})


module.exports = router;
