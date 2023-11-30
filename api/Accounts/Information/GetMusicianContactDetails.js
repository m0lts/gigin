import { MongoClient, ObjectId } from "mongodb";

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

        if (request.method === "POST") {
            const dataReceived = request.body;
            const userID = dataReceived.userID;

            const musicianID = new ObjectId(userID);
            
            const musicianAccount = await musicianCollection.findOne({ _id: musicianID })
            const musicianEmail = musicianAccount.email

            response.status(200).json({ musicianEmail })

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
