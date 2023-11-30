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

            const venueID = dataReceived.venueID;
            const musicianID = dataReceived.musicianID;

            const existingVenueProfile = await dbCollection.findOne({ userID: venueID });

            if (existingVenueProfile) {
                if (existingVenueProfile.savedArtists) {
                    if (existingVenueProfile.savedArtists.includes(musicianID)) {
                        // If artist is already saved
                        return response.status(201).json({ message: "Artist already saved."})
                    } else {
                        // If savedArtists array exists, add musicianID to it
                        await dbCollection.updateOne(
                            { userID: venueID },
                            { $addToSet: { savedArtists: musicianID } }
                        );
                        response.status(200).json({ message: "Musician saved" });
                    }
                } else {
                    // If savedArtists key doesn't exist, create it as an array and add musicianID
                    await dbCollection.updateOne(
                        { userID: venueID },
                        { $set: { savedArtists: [musicianID] } }
                    );
                    response.status(200).json({ message: "Musician saved" });
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