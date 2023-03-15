import express, { Request, Response } from 'express';
import { getSearchOptions, getWeatherData } from './api';
import { retrieveDatafromDataBase, updatedPlaces } from './db';
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhosts:3000',
  })
);

app.post('/api/favorites', async (req: Request, res: Response) => {
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
    res.status(500).send('Error adding favorite');
  }
});

app.get('/api/weather/:lat/:lon', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.params;
    const weatherData = await getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

app.get('/api/favorites', async (req: Request, res: Response) => {
  try {
    const itemsFromDb = await retrieveDatafromDataBase();
    const { places, totalNumberOfPlaces } = itemsFromDb[0];
    res.json([{
      places,
      totalNumberOfPlaces,
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching favorites');
  }
});

app.delete('/api/favorites/:index', async (req: Request, res: Response) => {
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
    res.status(500).send('Error deleting favorite');
  }
});




app.listen(5001, () => {
  console.log(`Server running on port 5001`);
});
