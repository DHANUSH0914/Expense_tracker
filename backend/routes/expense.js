const express=require("express");
const router=express.Router();
const Expense=require("../models/Expense");





// ADD EXPENSE 

router.post("/",async(req,res)=>{
    console.log(req.body);
    try{
        const newExpense=await Expense(req.body);
        const expense=newExpense.save();
        res.status(201).json(expense);

    }catch(error){
        res.status(500).json(error);
    }
})

// Get Expense from DB

router.get("/",async(req,res)=>{
  
    try {
        const expenses=await Expense.find().sort({createdAt:-1}); //mongodb func
        res.status(200).json(expenses)

    } catch (error) {
        res.status(500).json(error);
    }
})

//update Expense

router.put("/:id",async(req,res)=>{
    try {
        const expense=await Expense.findByIdAndUpdate(
            req.params.id,                                    //pull the Id from the Given DataBase
            {
                $set:req.body
            },
            {new:true}
        );
        res.status(201).json(expense)
        
    } catch (error) {
        res.status(500).json(error);
    }

})

//Delete an Expense

router.delete("/:id",async(req,res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(201).json("Deleted Successfully")
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;