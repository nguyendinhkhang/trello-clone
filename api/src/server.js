const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const connectDB = require('./configs/connectDB')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')

const app = require('./app')
const PORT = process.env.PORT || 4000

connectDB()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connection.once('open', () => {
  console.log('Connected successfully to MongoDB!')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})


