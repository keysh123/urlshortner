const shortid = require('shortid')
const URL = require('../models/url')
async function generateShortURL(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(404).send("url is required")
    }
    const shortId = shortid()
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitedHistory : []
    })
    return res.json({id : shortId})
}

async function redirect(req,res) {
    console.log('req.params:', req.params);
    const shortId=req.params.id
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push : {
            visitedHistory : {
                timestamp : Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
    // console.log(entry)
    // res.end("hii")
}
module.exports={generateShortURL,redirect}