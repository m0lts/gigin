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

            const profileInformation = {
                summary: formData.summary,
                keyFeatures: formData.keyFeatures,
                venueDescription: formData.venueDescription,
                profilePictures: formData.profilePictures,
            }

            const existingGigProfile = await dbCollection.findOne({
                venueName: formData.venueName,
                venueAddress: formData.venueAddress
            });

            // If user already has a gig profile, update the profile. Else, create a new gig profile for the venue.
            if (existingGigProfile) {
                const uploadProfileData = await dbCollection.updateOne(
                    {
                        venueName: formData.venueName,
                        venueAddress: formData.venueAddress,
                    },
                    {
                        $set: {
                            profileInfo: profileInformation,
                        },
                    }
                );
                response.status(200).json({ message: "Profile data uploaded successfully", uploadProfileData });
            }
             else {
                const createNewGigProfile = await dbCollection.insertOne({
                    venueName: formData.venueName,
                    venueAddress: formData.venueAddress,
                    profileInfo: profileInformation
                });
                response.status(200).json({ message: "Profile data uploaded successfully", createNewGigProfile });
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
