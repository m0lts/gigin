import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local");
}

export default async function handler(request, response) {
    let mongoClient;

    try {
        // Connect to MongoDB
        mongoClient = await (new MongoClient(uri, options)).connect();

        // Store DB name and collections in variables
        const db = mongoClient.db("gigin_test_accounts");
        const dbCollection = db.collection("user_accounts");

        // Query the database to find documents with non-empty address fields
        const query = {
            $and: [
                { addressLine1: { $exists: true, $ne: "" } },
                { addressCity: { $exists: true, $ne: "" } },
                { addressPostCode: { $exists: true, $ne: "" } },
                { addressCountry: { $exists: true, $ne: "" } },
            ]
        };

        const result = await dbCollection.find(query).toArray();

        // Send the result to the front end
        response.status(200).json(result);
    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    } finally {
        // Close database connection
        if (mongoClient) {
            await mongoClient.close();
        }
    }
}
