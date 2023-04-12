import express from "express";
import { getWeatherData } from "./api";
import { retrieveDatafromDataBase, updatedPlaces } from "./db";

const functions = require("firebase-functions");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/api/favorites", async (req, res) => {
  try {
    const dataFromDataBase = await retrieveDatafromDataBase();
    let { places, totalNumberOfPlaces } = dataFromDataBase[0];
    const favorite = req.body;
    places.push(favorite);
    totalNumberOfPlaces += 1;
    const updatedItemsFromDataBase = {
      places,
      totalNumberOfPlaces,
    };
    const updatedDb = await updatedPlaces(updatedItemsFromDataBase);
    res.json(updatedDb);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding favorite");
  }
});

app.get("/api/weather/:lat/:lon", async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const weatherData = await getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const itemsFromDb = await retrieveDatafromDataBase();
    const { places, totalNumberOfPlaces } = itemsFromDb[0];
    res.json([
      {
        places,
        totalNumberOfPlaces,
      },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching favorites");
  }
});

app.delete("/api/favorites/:index", async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const itemsFromDb = await retrieveDatafromDataBase();
    let { places } = itemsFromDb[0];
    places.splice(index, 1);
    const updatedItemsFromDb = {
      places,
      totalNumberOfPlaces: places.length,
    };
    const updatedDb = await updatedPlaces(updatedItemsFromDb);
    res.json(updatedDb);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting favorite");
  }
});

exports.app = functions.region("europe-west1").https.onRequest(app);
