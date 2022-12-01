require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Allow access from origin (http://localhost:3000 - Client)
let corsOptions = {
    origin: "http://localhost:3000", 
    optionsSuccessStatus: 200
}
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const trainerRoutes = require("./app/routes/trainer.routes.js");
app.use("/api/v1/", trainerRoutes);

const leagueRoutes = require("./app/routes/league.routes.js");
app.use("/api/v1/", leagueRoutes);

const pokemonRoutes = require("./app/routes/pokemon.routes.js");
app.use("/api/v1/", pokemonRoutes);

const slotRoutes = require("./app/routes/slot.routes.js");
app.use("/api/v1/", slotRoutes);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});