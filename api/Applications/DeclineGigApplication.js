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
        const dbCollection = db.collection("gigs");

        if (request.method === 'POST') {
            const receivedData = request.body;
            const gigID = receivedData.gigID;
            const musicianID = receivedData.musicianID;

            const gigDocument = await dbCollection.findOne({ _id: new ObjectId(gigID) });

            if (!gigDocument) {
                response.status(400).json({ error: 'No gigs found' });
            } else {
                await dbCollection.updateOne(
                    { _id: new ObjectId(gigID) },
                    { $pull: { gigApplications: musicianID } }
                );
                response.status(200).json({ message: 'Musician application successfully removed.' });
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