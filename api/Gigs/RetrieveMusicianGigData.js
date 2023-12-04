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
        const dbCollection = db.collection("gigs");

        if (request.method === 'POST') {
            const receivedData = request.body;
            const userID = receivedData.userID;

            const currentDate = new Date();

            const appliedGigs = await dbCollection.find({
                gigApplications: userID,
                'confirmedMusician': { $nin: [userID] },
                'gigDate.short': { $gte: currentDate.toISOString().split('T')[0] }
            }).toArray();

            const confirmedGigs = await dbCollection.find({
                confirmedMusician: userID,
                'gigDate.short': { $gte: currentDate.toISOString().split('T')[0] }
            }).toArray();

            const pastGigs = await dbCollection.find({
                confirmedMusician: userID,
                'gigDate.short': { $lt: currentDate.toISOString().split('T')[0] }
            }).toArray();


            // Send the results to the frontend
            response.status(200).json({
                appliedGigs,
                confirmedGigs,
                pastGigs
            });

            

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