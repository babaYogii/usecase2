const nodeMailer=require('nodemailer')
const jwt=require('jsonwebtoken')

exports.sendMail= async (req,res)=>{
    try {
        const token = jwt.sign({email:req.body.email},"json",{expiresIn:'10m'})
        const resetPasswordUrl=`http://localhost:4000/reset-password/${token}`
        console.log(resetPasswordUrl)
        // Create a transporter object
        const transporter = nodeMailer.createTransport({
          // Set up your email service and authentication details
          service: 'gmail',
        //   host: '127.0.0.1',
        // //  port: 25, // or the appropriate port number for your SMTP server
        //    secure: false,
          auth: {
            user: 'yogeshkodlinge121@gmail.com',
            pass: 'jaqlbghfgatjswya'
          },
        //   port:588
        });
    
        // Compose the email message
        const mailOptions = {
          from: 'yogeshkodlinge121@gmail.com',
          to: req.body.email,
          subject: 'Reset password with useCase2',
          html:`
          <h1>Welcome to My Email</h1>
          
          <p>${resetPasswordUrl}</p>
          <p>Link is only valid for 10 minutes</p>
      
          `
        };
        
        // Send the email
        let info=await transporter.sendMail(mailOptions);
        console.log("Email sent successfully"+info);  
        return res.status(201).json({message:'Email sent succesfully'})   
       
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({message:'Something went wrong while sending email'});
        // info.mes
      }
    
}


