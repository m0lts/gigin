import { MongoClient, ObjectId } from "mongodb";

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
        const dbCollection = db.collection("musician_profiles");

        if (request.method === 'POST') {
            const receivedData = request.body;
            const venueID = receivedData.venueID;
            const musicianID = receivedData.musicianID;

            const musicianProfileDocument = await dbCollection.findOne({ userID: musicianID });

            if (!musicianProfileDocument) {
                response.status(400).json({ error: 'No musicians found' });
            } else {
                await dbCollection.updateOne(
                    { userID: musicianID },
                    { $pull: { savedVenues: venueID } }
                );
                const savedVenues = [];
                response.status(200).json({ savedVenues });
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