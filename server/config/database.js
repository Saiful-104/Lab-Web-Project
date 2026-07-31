
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

const connectDB = async () => {
  try {
    await client.connect();
    database = client.db("scholarshipDB");
    console.log("✅ Connected to MongoDB successfully");
    
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB ping successful");
    
    return database;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!database) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return database;
};

const getCollection = (collectionName) => {
  const db = getDB();
  return db.collection(collectionName);
};


module.exports = { 
  connectDB,     
  getDB, 
  getCollection, 
  client 
};