const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
var corsOptions = {
  origin: "http://localhost:3000"
};

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to employer application." });
});

require("./app/routes/employeeroute")(app);

// listen port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});