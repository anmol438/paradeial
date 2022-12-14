const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const passportJWT = require('./config/passport_jwt_strategy');
const MongoStore = require("connect-mongodb-session")(session);

const flash = require('connect-flash');
const flashMware = require('./config/middleware').setFlash;

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use("/uploads", express.static("./uploads"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layouts/layout");

app.use(
  session({
    name: "codeial",
    secret: "anmol",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000*60*60*24*30,
    },
    store: new MongoStore(
      {
        uri:process.env.MONGODB_URI || 'mongodb://localhost/codeial-database',
        autoRemove: 'disabled'
        
      },
      function (err) {
        if(err){
        console.log('connect-mongo -->', err);
        }
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.set_authenticated_user);
app.use(flash());
app.use(flashMware);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server at port ${port}`);
  }
  console.log(`Server is running on port ${port}`);
});
