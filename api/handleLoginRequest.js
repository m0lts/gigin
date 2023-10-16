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

        // Connect to MongoDB
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");



        // Store DB name and collections in variables
        const db = mongoClient.db("gigin_test_accounts");
        const dbCollection = db.collection("user_accounts");



        // Retrieve data sent by login_page and insert into databasee
        if (request.method === "POST") {
            // Save data to formData variable
            const formData = request.body;



            // Check if email is in either the musicians or venues collections
            const email = formData.email;
  
            const userRecord = await dbCollection.findOne({ email });

            if (!userRecord) {
                response.status(400).json({ error: "Email not found" });
                return;
            }

            // Assign password in database to dbPassword
            const dbPassword = userRecord.password;

            // Get password from formData
            const password = formData.password;

            // Compare the hashed password with the provided password
            const passwordMatch = await bcrypt.compare(password, dbPassword);

            if (passwordMatch) {
                const userForename = userRecord.forename;
                const userSurname = userRecord.surname;
                response.status(200).json({ userForename, userSurname });
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

