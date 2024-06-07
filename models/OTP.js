const mongoose = require("mongoose");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, 
	},
});
//function to send mail

async function sendVerificationEmail(email ,opt){

   try{
    const mailResponse =await mailSender(email, "Verifiaction mail form StudtNotion", otp)
    console.log("Email send Succesfully" , mailResponse)


   }
   catch(error){
          console.log("error occured while sending the email" ,errror)
          throw error;

   }
}


OTPSchema.pre("save", async function (next) {
	await sendVerificationEmail(this.email, this.otp);
    next();
});


module.exports =mongoose.model("OTP" , OTPSchema);
