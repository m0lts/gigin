import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local");
}



export default async function handler(request, response) {
    let mongoClient;

    try {
        mongoClient = await (new MongoClient(uri, options)).connect();
        const db = mongoClient.db("gigin");
        const dbCollection = db.collection("venue_profiles");

        if (request.method === "POST") {
            const dataReceived = request.body;

            const userID = dataReceived.userID;

            const existingVenueProfile = await dbCollection.findOne({ userID });

            if (existingVenueProfile) {
                // Construct the update object based on the modified fields in dataReceived
                // const updateObject = {};
                // for (const key in dataReceived) {
                //   // Only include fields that have been modified in the form
                //   if (dataReceived[key] !== existingVenueProfile[key]) {
                //     updateObject[key] = dataReceived[key];
                //   }
                // }
              
                // Update existing document with only the modified fields
                await dbCollection.updateOne({ userID }, { $set: dataReceived });
                response.status(201).json({ message: "Profile data updated successfully" });
              } else {
                // Insert new document
                await dbCollection.insertOne(dataReceived);
                response.status(200).json({ message: "Profile data uploaded successfully" });
              }

            
        } else {
            response.status(405).json({ error: "Method Not Allowed" });
        }

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
