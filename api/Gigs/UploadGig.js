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
        const dbCollection = db.collection("upcoming_gigs");

        // Retrieve data sent by signup_page and insert into databasee
        if (request.method === "POST") {
            // Save data to formData variable
            const formData = request.body;

            // Check if a gig with the same time and date already exists
            const existingGig = await dbCollection.findOne({
                venueName: formData.venueName,
                venueAddress: formData.venueAddress,
                dateSelected: formData.dateSelected,
                gigStartTime: formData.gigStartTime
            });

            if (existingGig) {
                // If a matching gig is found, return an error
                response.status(400).json({ error: "Duplicate gig data. A gig with the same time and date already exists." });
            } else {
                // If no match is found, insert the new gig
                const result = await dbCollection.insertOne(formData);
                response.status(200).json({ message: "Gig successfully posted.", result });
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
