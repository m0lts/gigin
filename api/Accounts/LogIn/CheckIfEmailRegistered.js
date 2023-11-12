import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local")
}


export default async function handler(request, response) {
    let mongoClient;

    try {
        mongoClient = await (new MongoClient(uri, options)).connect();

        const db = mongoClient.db("gigin");
        const musicianCollection = db.collection("musician_accounts");
        const venueCollection = db.collection("venue_accounts");
        const promoterCollection = db.collection("promoter_accounts");
        const gigGoerCollection = db.collection("gigGoer_accounts");
        const passwordResetCollection = db.collection("password_reset_tokens");


        if (request.method === "POST") {
            const receivedData = request.body;
            const email = receivedData.email;

            let account = null;
            let accountType = null;

            if (!account && (account = await musicianCollection.findOne({ email }))) {
                accountType = "musician";
            }
            if (!account && (account = await venueCollection.findOne({ email }))) {
                accountType = "venue";
            }
            if (!account && (account = await promoterCollection.findOne({ email }))) {
                accountType = "promoter";
            }
            if (!account && (account = await gigGoerCollection.findOne({ email }))) {
                accountType = "gigGoer";
            }

            if (!account) {
                response.status(400).json({ error: "Email not found" });
                return;
            } else {
                response.status(200).json({ message: "Email correct."});
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
