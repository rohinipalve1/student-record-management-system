const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();


router.post('/login', async (req,res)=>{
const admin = await Admin.findOne(req.body);
if(!admin) return res.status(401).json({msg:'Invalid'});
const token = jwt.sign({id:admin._id}, 'secret');
res.json({token});
});
module.exports = router;