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

// const createNewFavorite = async () => {
//   const newFavorite = {
//     places: [],
//     totalNumberOfPlaces: 0,
//     isFavorite: true,
//   };

//   const collection = await getWeatherCollection();
//   const result = await collection.insertOne(newFavorite);
//   return newFavorite;
// };

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


// import { collection, doc, getDoc, getDocs, updateDoc, } from 'firebase/firestore';
// import { dbConnection } from './firebaseConfig';




// const collectionName = 'favorites';
// const favoritesRef = collection(dbConnection, collectionName);


// interface Favorite {
//   id?: string; // optional "id" property
//   places: any[];
//   totalNumberOfPlaces: number;
//   isFavorite: boolean;
// }

// // const createNewFavorite = async () => {
// //   const newFavorite: Favorite = {
// //     places: [],
// //     totalNumberOfPlaces: 0,
// //     isFavorite: true,
// //   };

// //   const docRef = await favoritesCollection.add(newFavorite);
// //   newFavorite.id = docRef.id;

// //   return newFavorite;
// // };

// export const retrieveDatafromDataBase = async () => {
//   const querySnapshot = await getDocs(favoritesRef);
//   const favoriteDataBase: Favorite[] = [];
//   querySnapshot.forEach((doc:any ) => {
//     favoriteDataBase.push({ id: doc.id, ...doc.data() } as Favorite); // cast as "Favorite"
//   });
//   return favoriteDataBase;
// };

// export const updatedPlaces = async (id: string, places:any) => {
//   await updateDoc(doc(favoritesRef, id), { places });
//   const docSnapshot = await getDoc(doc(favoritesRef, id));
//   return { id: docSnapshot.id, ...docSnapshot.data() };
// };
