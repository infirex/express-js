const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./helpers/database/connectDB')
const router = require('./routers')
const customErrorHandler = require('./middlewares/customErrorHandler')
dotenv.config({ path: './config/env/config.env' })

connectDB();

const app = express();
app.use(express.json());

const {PORT} = process.env;

// Routers middleware

app.use('/api', router)
app.use(customErrorHandler)

app.listen(PORT, () => {
    console.log("App started on " + PORT);
})