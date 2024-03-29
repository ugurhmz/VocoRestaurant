import UserModel from '../models/UserModel.js'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import CryptoJs from 'crypto-js'
import nodemailer from 'nodemailer'
import AddressModel from '../models/AddressModel.js'
import { loginValidation } from '../validations/UserValidate.js'

// REGISTER with Activation LINK
export const registerUserController = async (req, res) => {
  const {
    email,
    username,
    age,
    gender,
    password,
    profile_img = "default.png",
    addresses = [],
  } = req.body

  console.log("req.email", email)
  

  try {
    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({ error: "This e-mail already exists!" })
    }

    const actvToken = jwt.sign(
      { email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    )

    const encryptedPassword = CryptoJs.AES.encrypt(password, process.env.PAS_SECURITY).toString()

    const newUser = new UserModel({
      email,
      username,
      age,
      gender,
      password: encryptedPassword,
      activationToken: actvToken,
      isVerified: false,
      profile_img: profile_img,
      addresses: addresses.map(address => new AddressModel(address)),
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    })

    const savedUser = await newUser.save()

    await sendActivationEmail(email, actvToken)

    return res.status(httpStatus.OK).json({
      message: `Activation link has been sent to your ${email}.`,
    })
  } catch (err) {
    console.error("register err:", err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Registration failed !!" })
  }
}

// ACTIVATION LINK
export const userActivationController = async (req, res) => {
  try {
    console.log("req.params", req.params)
    const paramToken = req.params.token
    const findUserWithToken = await UserModel.findOne({
      activationToken: paramToken
    })

    if (findUserWithToken) {
      findUserWithToken.activationToken = null
      findUserWithToken.isVerified = true

      await findUserWithToken.save()

      return res.status(httpStatus.OK).json({
        message: "Registration successful."
      })
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "E-mail not verified !!"
      })
    }
  } catch (error) {
    console.error("userActivationController error:", error)
    return res.status(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS).json({
      error
    })
  }
}

const sendActivationEmail = async (email, actvToken) => {
  const emailInfo = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Account activation link for register",
    html: `<h1>Please Click to activate your mail.</h1>
           <p>http://localhost:${process.env.PORT}/vocov1/api/user/activation/${actvToken}</p>
           <hr/>`,
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PW,
    },
  })

  try {
    await transporter.sendMail(emailInfo)
  } catch (error) {
    throw error
  }
}

// LOGIN
export const userLoginController = async (req, res) => {
  try {

    const { error } = loginValidation.validate(req.body)
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message })
    }

    const findUser = await UserModel.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username },
      ]
    })

    if (!findUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: `No user found with this email: ${req.body.email}`
      })
    }

    if (!findUser.isVerified) {
      return res.status(httpStatus.NON_AUTHORITATIVE_INFORMATION).json({
        error: "Not Activated !!"
      })
    }

    const decryptUserPassword = CryptoJs.AES.decrypt(findUser.password, process.env.PAS_SECURITY)
    const userDbPassword = decryptUserPassword.toString(CryptoJs.enc.Utf8)

    if (userDbPassword !== req.body.password) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: "Invalid password !",
      })
    }

    const loginToken = jwt.sign(
      {
        id: findUser._id
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    )

    const { password, ...userWithoutPassword } = findUser._doc
    res.status(httpStatus.OK).json({
      ...userWithoutPassword,
      loginToken
    })

  } catch (err) {
    console.error("userLoginController error:", err)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error"
    })
  }
}
