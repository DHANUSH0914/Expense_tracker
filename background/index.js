const express = require("express")
const cron = require("node-cron")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const expenseMail = require("./EmailService/Expense");

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("DB connection is Successful");
}).catch((err) => {
    console.log("connection",err);
});


const run = () => {
    cron.schedule('* * * * * *', () => {                              //sec min hr day month week
        // console.log('The task is running every second');               //Schedule the Process
        expenseMail()
    });
}
run();

app.listen(process.env.PORT, () => {
    console.log(`Background Server is running on port ${process.env.PORT}`)
})

