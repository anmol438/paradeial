const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const port = 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('layout', './layouts/layout');

app.use('/', require('./routes'));


app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server at port ${port}`);
  }
  console.log(`Server is running on port ${port}`);
});
