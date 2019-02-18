require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;

const mongoose = require('mongoose');
mongoose.connect(`${process.env.databaseUrl}`, {useNewUrlParser: true});

const articleRoute = require(`./routes/articleRoute.js`)
const userRoute = require('./routes/userRoute')

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/user', userRoute);
app.use('/articles', articleRoute);

app.get('/', (req, res) => {
  res.redirect('/articles')
})

app.listen(port, () => {
  console.log(`listening to port ----`, port)
})