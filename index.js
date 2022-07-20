const express = require("express");
const port = 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server at port ${port}`);
  }
  console.log(`Server is running on port ${port}`);
});
