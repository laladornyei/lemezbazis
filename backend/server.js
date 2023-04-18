const path = require('path')
const express = require('express')
require('dotenv').config() // A .env fájlt olvassa
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log(`Database Connected ${database.host}`);
});

const lemezek = require('./routes/lemezek')
const termekek = require('./routes/termekek')
const hozzaszolasok = require('./routes/hozzaszolasok')
const postok = require('./routes/postok')
const wishlists = require('./routes/wishlists')
const ratings = require('./routes/ratings')
const auth = require('./routes/auth')
const { getLemezek } = require('./controllers/lemezek')

const app = express()

// body parser
app.use(express.json())

// cookie parser
app.use(cookieParser())

app.use(morgan('dev'))

app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/lemezek", lemezek);
app.use("/api/termekek", termekek);
app.use("/api/auth", auth);
app.use("/api/postok", postok);
app.use('/api/wishlists', wishlists);
app.use("/api/hozzaszolasok", hozzaszolasok);
app.use("/api/ratings", ratings);
app.use(errorHandler)  

app.get('/', (req, res) => {
    res.status(400).json({ success: false})
})

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));