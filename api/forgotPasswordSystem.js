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
        const dbCollection = db.collection("user_accounts");
        const passwordResetCollection = db.collection("password_reset_tokens");


        if (request.method === "POST") {
            // Save data to formData variable
            const receivedData = request.body;
            const email = receivedData.email;

            // Check if email is on database
            const userRecord = await dbCollection.findOne({ email });

            // End logic if user does not exist
            if (!userRecord) {
                response.status(400).json({ error: "Email not found" });
                return;
            }

            // Generate random token
            const generateRandomToken = (length) => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters[randomIndex];
                }
                return token;
            };
            const resetToken = generateRandomToken(10);

            // Create object to enter into document
            const dataToEnter = {
                email: email,
                token: resetToken,
                createdAt: new Date(),
            }

            // To be used when email system works
            const resetLink = `localhost:3000/resetpassword/${resetToken}`;
            console.log(resetLink);


            // Insert email and password reset token into password_reset_tokens db collection
            const result = await passwordResetCollection.insertOne(dataToEnter);
            response.status(200).json({ message: "Password reset email sent.", result });


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

