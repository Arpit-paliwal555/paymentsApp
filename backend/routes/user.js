//installed zod.
const express = require('express');
const router = express.Router();
const {users, accounts} = require('../db');
const zod = require('zod');
const { JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const signupSchema = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post('/signup', async (req, res) => {
    try{ 
        const {success} = signupSchema.safeParse(req.body);
    }catch(err){
        if(err instanceof zod.ZodError){
            console.log(err.issues);
        }
        return res.status(411).json({msg: "Invalid data"});
    }
    

    const existingUser = await users.findOne({userName: req.body.userName});
    if(existingUser){
        return res.status(411).json({msg:"User already exists"});
    }
    const user = await users.create({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
        })
    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);
    const account = await accounts.create({userId, balance: (1+Math.random() * 10000).toFixed(2)});
    
    res.status(200).json({msg:"User created successfully", token: token});
})
const loginSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
});
router.post('/signin', async (req, res) => {
    const {success} = loginSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"incorrect inputs"});
    }
    const existingUser = await users.findOne({
        userName: req.body.userName,
        password: req.body.password });

    if(!existingUser){
        return res.status(411).json({msg:"User does not exist"});
    }
    // const isPasswordCorrect = await bcrypt.compare(success.data.password, existingUser.password);
    // if(!isPasswordCorrect){
    //     return res.status(411).json({msg:"incorrect password"});
    // }
    const userId = existingUser._id;
    const token = jwt.sign({userId}, JWT_SECRET);
    return res.status(200).json({msg:"User logged in successfully", token: token});

})

updateSchema = zod.object({
    password : zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().length(6,100)
})
router.put('/update', async (req, res) => {
    const success = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"invalid inputs/password too short"});
    }
    const existingUser = await users.findOne({_Id: req.userId});
    if(!existingUser){
        res.status(411).json({msg:"User does not exist"});
    }
    const updatedUser = await users.updateOne({_Id: req.userId}, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
    })
    if(updatedUser.nModified === 0){
        return res.status(411).json({msg:"No changes made"});
    }
    return res.status(200).json({msg:"User updated successfully"});

})

 router.get('/profile', async (req, res) => {
    const filter = req.query.filter||"";
    const user1 = await users.find({
        $or: [{
            firstName: {
                $regex: filter,
                $options: 'i'
            }
        }, {
            lastName: {
                $regex: filter,
                $options: 'i'
            }
        }]
    })
    res.json({
        user: user1.map(user1 => ({
            username: user1.userName,
            firstName: user1.firstName,
            lastName: user1.lastName,
            _id: user1._id
        }))
    })
})
module.exports = router;