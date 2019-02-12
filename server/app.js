const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jurvio', {useNewUrlParser: true});

const articleRoute = require(`./routes/articleRoute.js`)

const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/articles', articleRoute);

app.get('/', (req, res) => {
  res.redirect('/articles')
})


app.listen(port, () => {
  console.log(`listening to port ----`, port)
})