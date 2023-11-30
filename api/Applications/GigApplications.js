// Send musician's userID to gig document; append gig document with gigApplications[]

import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

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
        const dbCollection = db.collection("gigs");

        if (request.method === "POST") {
            const dataReceived = request.body;
            const userID = dataReceived.userID;
            const gigID = dataReceived.gigID;

            const gigObjectId = new ObjectId(gigID);

            const gigAppliedTo = await dbCollection.findOne({ _id: gigObjectId });
            
            if (gigAppliedTo) {
                const gigApplications = gigAppliedTo.gigApplications || [];
            
                if (!gigApplications.length) {
                    await dbCollection.updateOne(
                        { _id: gigObjectId },
                        { $set: { gigApplications: [userID] } }
                    );
                    response.status(200).json({ message: 'Gig application recieved.'});
                } else if (gigApplications.includes(userID)) {
                    response.status(400).json({ error: 'User already applied to this gig.' });
                } else {
                    await dbCollection.updateOne(
                        { _id: gigObjectId },
                        { $addToSet: { gigApplications: userID } }
                    );
                    response.status(200).json({ message: 'Gig application recieved.'});
                }
            } else {
                response.status(401).json({ error: 'Gig no longer exists.'})
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