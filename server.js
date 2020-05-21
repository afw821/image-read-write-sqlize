const express = require("express");
const app = express();
const path = require("path");
const db = require('./models');

global.__basedir = __dirname;

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//startup
require("./startup/routes")(app);
require("./routes/html")(app);

//server

db.sequelize.sync().then(function () {
    const PORT = process.env.PORT || 8822;
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
});