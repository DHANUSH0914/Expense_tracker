const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function createTransporter(config) {
    const transporter = nodemailer.createTransport(config);
    return transporter;
}


let confirgurations = {
  
    service: "gmail",
    
    requireTLS: true,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
    }
}

const sendMail = async (messageOption) => {
    const transporter = await createTransporter(confirgurations);
    await transporter.verify();
    await transporter.sendMail(messageOption, (error, info) => {
        if (error) {
            console.log('Error sending email:',error)
        }
        console.log('Email sent:', info.response);
    })
}


module.exports = sendMail;