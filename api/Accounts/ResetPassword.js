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

        // Store DB name and collections in variables
        const db = mongoClient.db("gigin_test_accounts");
        const dbCollection = db.collection("user_accounts");
        const passwordResetCollection = db.collection("password_reset_tokens");


        if (request.method === "POST") {
            // Save data to formData variable
            const receivedData = request.body;
            // Get token form formData
            const token = receivedData.token;
            // Find the user's email associated with the provided token
            const passwordResetUserRecord = await passwordResetCollection.findOne({ token });
            // Assign token in database to variable
            const tokenInDatabase = passwordResetUserRecord.token;

            // If there is no email associated with the token, return an error
            if (!passwordResetUserRecord) {
                response.status(400).json({ error: 'Invalid reset password link.' });
                return;
            }

            if (tokenInDatabase === token) {
                // Retrieve the user's email address if token matches
                const email = passwordResetUserRecord.email;
                // Hash the password entered into reset password
                const hashedPassword = await bcrypt.hash(receivedData.password, 10);
                // Replace the old password with the new password
                await dbCollection.updateOne(
                    { email },
                    { $set: { password: hashedPassword } }
                );
                // Delete the record associated with the token from the database
                await passwordResetCollection.deleteOne({ token });
            } else {
                response.status(401).json({ error: 'Invalid reset password code.' });
                return;
            }

            



            // Send success response message
            response.status(200).json({ message: "Password reset." });


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

