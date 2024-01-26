import UserModel from '../models/UserModel.js'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import CryptoJs from 'crypto-js'
import nodemailer from 'nodemailer'
import AddressModel from '../models/AddressModel.js'

// REGISTER with Activation LINK
export const registerUserController = async ( req,res) => {

    const {
        email,
        username,
        age,
        gender,
        password,
        firstName,
        lastName,
        addressInfo,
      } = req.body

    try {

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) { return res.status(httpStatus.CONFLICT).json({ error: "This e-mail already exists!" })  }
      
        const actvToken = jwt.sign(
            {email},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "7d"}
        )

        const newUser = new UserModel({
            email,
            username,
            age,
            gender,
            password: CryptoJs.AES.encrypt(password, process.env.PAS_SECURITY),
            firstName,
            lastName,
            activationToken: actvToken,
            isVerified: false,
            profile_img: "default.png",
            addresses: [new AddressModel(addressInfo)],
            resetPasswordToken: null,
            resetPasswordExpiry: null,
          });
        
          // then save user
          const savedUser = await newUser.save()

          const emailInfo = {
            from: process.env.EMAIL_FROM,
            to: email, 
            subject: "Account activation link for register",
            html: `<h1>Please Click to activate your mail.</h1>
            <p>http://localhost:${process.env.PORT}/vocov1/api/user/activation/${actvToken}</p>
            <hr/> `,
           }

           const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_FROM,
              pass: process.env.EMAIL_PW,
            },
          });
      
          transporter
            .sendMail(emailInfo)
            .then((sent) => {
              return res.status(httpStatus.OK).json({
                message: `Activation link has been sent to your ${email}.`,
              });
            })
            .catch((err) => {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error: err,
              });
            });


         } catch (err) {
                console.log("register err: ", err)
                res.status(httpStatus[500]).json({ error: "Registration failed !!" })
         }

}