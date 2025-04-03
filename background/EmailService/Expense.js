const dotenv=require("dotenv");
const sendMail=require("../helpers/sendMail");
const Expense=require("../models/Expense");
dotenv.config();

const expenseMail=async()=>{
    const expenses = await Expense.find();
    const totalExpense=expenses.reduce(
        (acc,expense)=>acc+expense.value,0
    )
    if(totalExpense>10000){
        let messageOption={
            from:process.env.EMAIL,
            to:process.env.TO_EMAIL,
            subject:"Warning",
            text:`Your Total Expenses is ${totalExpense},Please check Your Expenses and Make a Plan`
            
        }
        await sendMail(messageOption);
    }
}

module.exports=expenseMail;