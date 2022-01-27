const path = require("path");
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61f1d172aa237171ba332702")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const corsOptions = {
  origin: "https://<your_app_name>.herokuapp.com/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4,
};

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://admin:admin@cse341cluster-3dwlw.mongodb.net/shop?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL, options)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Reece",
          email: "email@email.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
