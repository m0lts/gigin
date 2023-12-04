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
        const dbCollection = db.collection("venue_profiles");

        if (request.method === "POST") {
            const dataReceived = request.body;
            const venueID = dataReceived.venue;

            const venueProfile = await dbCollection.findOne({ userID: venueID });

            if (venueProfile) {
                const newReview = {
                  musician: dataReceived.musician,
                  rating: dataReceived.rating,
                  review: dataReceived.review
                };
            
                if (venueProfile.ratingsAndReviews && venueProfile.ratingsAndReviews.length > 0) {
                  // If ratingsAndReviews array exists, push the new review
                  await dbCollection.updateOne(
                    { userID: venueID },
                    { $push: { ratingsAndReviews: newReview } }
                  );
                } else {
                  // If ratingsAndReviews array doesn't exist, create it and add the new review
                  await dbCollection.updateOne(
                    { userID: venueID },
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