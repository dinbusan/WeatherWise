const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://d_in_busan:newc2liber@weather-app.i3vuj8z.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dataBaseName = 'weather-app';

const getWeatherCollection = async () => {
  await client.connect();
  const dataBase = client.db(dataBaseName);
  return dataBase.collection('favorites');
};

const createNewFavorite = async () => {
  const newFavorite = {
    places: [],
    totalNumberOfPlaces: 0,
    isFavorite: true,
  };

  const collection = await getWeatherCollection();
  const result = await collection.insertOne(newFavorite);
  console.log('Inserted new favorite with ID:', result.insertedId);
  return newFavorite;
};

export const retrieveDatafromDataBase = async () => {
  const collection = await getWeatherCollection();
  const favoriteDataBase = await collection.find({}).toArray();
  return favoriteDataBase;
};

export const updatedPlaces = async (places: any) => {
  const collection = await getWeatherCollection();
  await collection.updateOne({}, { $set: places });
  const updatedNewDataBase = await collection.find({}).toArray();
  return updatedNewDataBase;
};
