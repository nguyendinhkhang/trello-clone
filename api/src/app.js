const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const ErrorMiddleware = require('./middlewares/Error')
const fileUpload = require('express-fileupload')
const UserRouter = require('./routes/UserRouter')
const BoardRouter = require('./routes/BoardRouter')
const ListRouter = require('./routes/ListRouter')
const CardRouter = require('./routes/CardRouter')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(fileUpload())

app.use('/api', UserRouter)
app.use('/api', BoardRouter)
app.use('/api', ListRouter)
app.use('/api', CardRouter)

app.use(ErrorMiddleware)

module.exports = app