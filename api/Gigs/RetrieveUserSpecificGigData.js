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

        if (request.method === 'POST') {
            const receivedData = request.body;
            const userName = receivedData.venueName;
            const userAddress = receivedData.venueAddress;

            const query = { venueName: userName, venueAddress: userAddress };
            const userDocument = await dbCollection.findOne(query);

            if (userDocument) {
                // Extract the gigs array from the document
                const gigsArray = userDocument.gigs || [];
                const profileObject = userDocument.profileInfo;

                // Send the gigs array back to the front end
                response.json({ gigs: gigsArray, profile: profileObject });
            } else {
                response.json({ gigs: [] });
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