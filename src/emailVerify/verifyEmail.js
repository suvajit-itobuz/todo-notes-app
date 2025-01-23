import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: "suvajit@itobuz.com",
        pass: "qwerty",
      }

});

const mailData = {
    from : "suvajit@itobuz.com",
    to : "suvanit@itobuz.com",
    subject : "Verify Email",
    text : `${url}`,

}

transporter.sendMail(mailData,(error,info)=>{
    if(error){
        return console.log(error)
    }
    return info;
})