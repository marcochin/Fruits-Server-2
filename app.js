const mongoose = require('mongoose');

// Connect to mongodb server and look for db called fruitsDB.
// If there is no fruitsDB it will create one.
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "Name is required!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// 1st param should be singular version ("Fruit") of the collections you want to create.
// If you want a fruits collection pass in "Fruit". Mongoose will automatically make it plural and
// lowercase, so dont worry. This creates a Fruits collection and data need to stick to the fruitsSchema.
// I thought noSql has no schema...
const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  // name: "Apple",
  rating: "10",
  review:"Solid fruit."
});

const orange = new Fruit({
  name: "Orange",
  rating: "5",
  review:"Round and orange"
});

const cherry = new Fruit({
  name: "Cherry",
  rating: "2",
  review:"Pop it."
});

const lemon = new Fruit({
  name: "Lemon",
  rating: "9",
  review:"Lemonade,"
});

// apple.save(); // Insert one

// https://mongoosejs.com/docs/api/model.html to find more apis to use
// Fruit.insertMany([cherry, orange, lemon], function(err){
//   if(err){
//     console.log("Failed to save the fruits.");
//   }else{
//     console.log("Saved all the fruits.");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "5e1e8a2dd59c717c901cad1c"}, {name: "Apple"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Updated successfully");
//   }
// });
//
// Fruit.deleteOne({_id: "5e1e8a2dd59c717c901cad1c"}, function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Deleted successfully");
//     }
// });


// Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
});

// Model
const Person = mongoose.model("Person", personSchema);

// Document
const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great Fruit"});

const person = new Person({
  name: "Marco",
  age: 30,
  favFruit: pineapple
});

person.save(); // Insert one

// Person.deleteMany({name: "Marco"}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Deleted many marcos :(");
//   }
// });





// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   // insertDocuments(db, function() {
//   //   client.close();
//   // });
//
//   findDocuments(db, function() {
//     client.close();
//   });
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([{
//       name: "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange",
//       score: 6,
//       review: "Kinda sour"
//     },
//     {
//       name: "Banana",
//       score: 9,
//       review: "Great stuff"
//     },
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// }
