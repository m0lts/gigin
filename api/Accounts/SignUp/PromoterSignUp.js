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
            delete dataReceived.verifyPassword;

            // Check if email already exists in any collection
            const email = dataReceived.email;
            const emailInMusicianDatabase = await musicianCollection.findOne({ email });
            const emailInVenueDatabase = await venueCollection.findOne({ email });
            const emailInPromoterDatabase = await promoterCollection.findOne({ email });
            const emailInGigGoerDatabase = await gigGoerCollection.findOne({ email });
            if (emailInPromoterDatabase) {
                response.status(400).json({ error: 'Email address taken.' });
                return;
            } else if (emailInMusicianDatabase) {
                response.status(401).json({ error: 'That email address is associated with a musician account.' });
                return;
            } else if (emailInVenueDatabase) {
                response.status(401).json({ error: 'That email address is associated with a venue account.' });
                return;
            } else if (emailInGigGoerDatabase) {
                response.status(401).json({ error: 'That email address is associated with a gig goer account.' });
                return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(dataReceived.password, 10);
            dataReceived.password = hashedPassword;
            
            // Upload account to musicians collection
            const result = await promoterCollection.insertOne(dataReceived);
            response.status(201).json({ message: "Account successfully created.", result });

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
