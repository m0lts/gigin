import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local")
}

export default async function handler(request, response) {
    let mongoClient;

    try {

        // Connect to MongoDB
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");



        // Store DB name and collections in variables
        const db = mongoClient.db("gigin_test_accounts");
        const musiciansCollection = db.collection("musicians");
        const venuesCollection =  db.collection("venues");




        // Retrieve data sent by signup_page and insert into databasee
        if (request.method === "POST") {
            // Save data to formData variable
            const formData = request.body;



            // Check if email already exists in either the musicians or venues collections
            const email = formData.email;
            // Return error to frontend if true
            const musicianWithEmail = await musiciansCollection.findOne({ email });
            const venueWithEmail = await venuesCollection.findOne({ email });
            if (musicianWithEmail || venueWithEmail) {
                response.status(400).json({ error: 'Email address taken.' });
                return;
            }




            // Clean data and enter into database
            if (formData.selectedOption === 'musician') {
                // If user has selected musician in radio input, remove venue_name from data packet
                delete formData.venue_name;
                // Send data to database - inset one document containing data
                const result = await musiciansCollection.insertOne(formData);
                response.status(201).json({ message: "Document created successfully in musicians collection", result });
            } else if (formData.selectedOption === 'venue') {
                // Same for musician_name if venue selected
                delete formData.musician_name;
                // Send data to database - inset one document containing data
                const result = await venuesCollection.insertOne(formData);
                response.status(201).json({ message: "Document created successfully in venues collection", result });
            } else {
                response.status(400).json({ error: "Invalid selectedOption" });
                return;
            }


            // Return error if neither musician or venue selected
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
            console.log("MongoDB connection closed.");
        }
    }
}

