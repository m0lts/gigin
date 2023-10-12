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




        // Retrieve data sent by login_page and insert into databasee
        if (request.method === "POST") {
            // Save data to formData variable
            const formData = request.body;



            // Check if email is in either the musicians or venues collections
            const email = formData.email;
  
            const musicianData = await musiciansCollection.findOne({ email });
            const venueData = await venuesCollection.findOne({ email });

            if (!musicianData && !venueData) {
                response.status(400).json({ error: "Email not found" });
                return;
            }

            let dbPassword;

            if (musicianData) {
                dbPassword = musicianData.password;
            } else if (venueData) {
                dbPassword = venueData.password;
            }

            // Get password from formData
            const password = formData.password;

            const userForename = musicianData.forename;
            const userSurname = musicianData.surname;

            if (password === dbPassword) {
                response.status(200).json({ userForename, userSurname, password });
            } else {
                response.status(401).json({ error: 'Incorrect password' });
            }



            // Return error if POST not used
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

