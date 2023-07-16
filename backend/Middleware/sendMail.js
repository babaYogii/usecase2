const nodeMailer=require('nodemailer')
const jwt=require('jsonwebtoken')
const User=require('../Model/userModel')

exports.sendMail= async (req,res)=>{
    try {
        const token = jwt.sign({email:req.body.email},"json",{expiresIn:'10m'})
        const user=await User.findOne({email:req.body.email});
        if(!user){return res.status(400).json({message:"no user found with given email"})}
        const resetPasswordUrl=`http://localhost:3000/reset-password/${token}`
        
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
          subject: 'Forgot Password? Reset here',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Reset Password</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  font-size: 24px;
                  color: #333333;
                  margin-top: 0;
                }
                p {
                  font-size: 16px;
                  color: #333333;
                  margin-bottom: 20px;
                }
                a {
                  display: inline-block;
                  text-decoration: none;
                  background-color: #000000;
                  border:1px solid #FFFFFF;
                  color: #FFFFFF;
                  padding: 10px 20px;
                  border-radius: 3px;
                  transition: background-color 0.3s;
                }
                a:hover {
                  background-color: #FFFFFF ;
                  color:#000000;
                  border:1px solid #000000;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Reset your WishMaster password</h1>
                <h4>WishMaster password reset</h4>
                <p>
                We heard that you lost your WishMaster password. Sorry about that!</p>
                <p>But don’t worry! You can use the following button to reset your password:</p>
                <a href="${resetPasswordUrl}">Reset Password</a>
                <p>If you don’t use this link within 10 minutes, it will expire. To get a new password reset link, visit: WishMaster </p>
                 <div>Thanks,</div>
                 <div>Team WishMaster</div>
                </div>
            </body>
            </html>
          `,
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


