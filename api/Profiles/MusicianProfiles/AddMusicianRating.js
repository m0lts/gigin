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
        const dbCollection = db.collection("musician_profiles");

        if (request.method === "POST") {
            const dataReceived = request.body;
            const musicianID = dataReceived.musician;
            console.log(dataReceived);

            const musicianProfile = await dbCollection.findOne({ userID: musicianID });

            if (musicianProfile) {
                const newReview = {
                  venue: dataReceived.venue,
                  rating: dataReceived.rating,
                  review: dataReceived.review
                };
            
                if (musicianProfile.ratingsAndReviews && musicianProfile.ratingsAndReviews.length > 0) {
                  // If ratingsAndReviews array exists, push the new review
                  await dbCollection.updateOne(
                    { userID: musicianID },
                    { $push: { ratingsAndReviews: newReview } }
                  );
                } else {
                  // If ratingsAndReviews array doesn't exist, create it and add the new review
                  await dbCollection.updateOne(
                    { userID: musicianID },
                    { $set: { ratingsAndReviews: [newReview] } }
                  );
                }
            
                response.status(201).json({ message: "Profile data updated successfully" });
              } else {
                response.status(404).json({ error: "Musician not found" });
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