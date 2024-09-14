const express=require('express')
const router=express.Router();
const {generateShortURL,redirect} =require("../controllers/url")

router.get("/:id", redirect);

module.exports=router