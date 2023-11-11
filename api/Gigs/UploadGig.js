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
        const db = mongoClient.db("gigin_test_accounts");
        const dbCollection = db.collection("gigs");

        if (request.method === "POST") {
            const formData = request.body;

            const gigInformation = {
                dateSelected: formData.dateSelected,
                musicGenres: formData.musicGenres,
                musicianArrivalTime: formData.musicianArrivalTime,
                gigStartTime: formData.gigStartTime,
                gigDuration: formData.gigDuration,
                guideFee: formData.guideFee,
                description: formData.description
            }

            const existingGigProfile = await dbCollection.findOne({
                venueName: formData.venueName,
                venueAddress: formData.venueAddress
            });

            // If user has already uploaded a gig, append the 'gigs' array with the new gig. Else, create a new gig profile for the venue.
            if (existingGigProfile) {
                const uploadGigData = await dbCollection.updateOne(
                    {
                        venueName: formData.venueName,
                        venueAddress: formData.venueAddress
                    },
                    {
                        $push: {
                            gigs: {
                                information: gigInformation,
                                applications: {},
                                confirmedMusician: {}
                            }
                        }
                    }
                );
                response.status(200).json({ message: "Gig data uploaded successfully", uploadGigData });
            } else {
                const createNewGigProfile = await dbCollection.insertOne({
                    venueName: formData.venueName,
                    venueAddress: formData.venueAddress,
                    gigs: [{
                        information: gigInformation,
                        applications: {},
                        confirmedMusician: {}
                    }]
                });
                response.status(200).json({ message: "Gig data uploaded successfully", createNewGigProfile });
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
