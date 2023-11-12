import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

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

        if (request.method === "POST") {
            const dataReceived = request.body;
            const email = dataReceived.email;
    
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
            }
    
            const dbPassword = account.password;
            const password = dataReceived.password;
            const passwordMatch = await bcrypt.compare(password, dbPassword);
    
            if (passwordMatch) {
                response.status(200).json({ account });
            } else {
                response.status(401).json({ error: 'Incorrect password' });
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

