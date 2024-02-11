const mongoose  = require('mongoose');
const {accounts} = require('../db');
const {authMiddleware} = require('../middleware');
const express = require('express');
//const app = express();
const router = express.Router();


router.get('/balance',authMiddleware, async (req, res) => {
    try{await accounts.findOne({userId: req.userId});}
    catch(err){
        console.log(err.response.data);
    return res.status(411).json({msg: "User does not exist"});
    }
    const account = await accounts.findOne({userId: req.userId});
    if(!account) {
        return res.status(404).send("Account not found"); 
    }
    res.set('Balance', account.balance);
    res.json({
        balance: account.balance
    })
    
})

router.post('/transfer',authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount, to} = req.body;
    const account = await accounts.findOne({userId: req.userId}).session(session);
    if(!account || account.balance < amount){
        return res.status(411).json({msg: "Insufficient funds"});
    }

    const toAccount = await accounts.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(411).json({msg: "User does not exist"});
    }
    await accounts.updateOne({userId: req.userId}, { $inc: {balance: -amount}}).session(session);
    await accounts.updateOne({userId: to}, { $inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({msg: "Transfer successful"});

});

module.exports = router;
