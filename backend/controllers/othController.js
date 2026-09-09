const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "userName, email, and password are required" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const user = new User({
      userName,
      password: hashpassword,
      email
    })

    const response = await user.save()
    res.status(201).json({
      message: 'User registered successfully',
      id: response._id,
      userName: response.userName,
      email: response.email
    })
  } catch (e) {
    if (e.code === 11000) {
      const field = Object.keys(e.keyPattern)[0]
      return res.status(409).json({ message: `${field} already exists. Please choose another.` })
    }
    console.error(e)
    res.status(500).json({ message: "Something went wrong. Please try again." })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const result = await User.findOne({ email })
    if (!result) {
      return res.status(404).json({ message: "user not found" })
    }

    const match = await bcrypt.compare(password, result.password)
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" })
    }

    const payload = { id: result._id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ token, userName: result.userName, email: result.email })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Something went wrong. Please try again." })
  }
}

module.exports = { registerUser, loginUser }