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
        const dbCollection = db.collection("musician_profiles");

        if (request.method === "POST") {
            const dataReceived = request.body;

            const venueID = dataReceived.venueID;
            const musicianID = dataReceived.musicianID;

            const existingMusicianProfile = await dbCollection.findOne({ userID: musicianID });

            if (existingMusicianProfile) {
                if (existingMusicianProfile.savedVenues) {
                    if (existingMusicianProfile.savedVenues.includes(venueID)) {
                        // If venue is already saved
                        return response.status(201).json({ venueID })
                    } else {
                        // If savedVenues array exists, add venueID to it
                        await dbCollection.updateOne(
                            { userID: musicianID },
                            { $addToSet: { savedVenues: venueID } }
                        );
                        response.status(200).json({ venueID });
                    }
                } else {
                    // If savedVenues key doesn't exist, create it as an array and add venueID
                    await dbCollection.updateOne(
                        { userID: musicianID },
                        { $set: { savedVenues: [venueID] } }
                    );
                    response.status(200).json({ venueID });
                }
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