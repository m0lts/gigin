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
        const passwordResetCollection = db.collection("password_reset_tokens");


        if (request.method === "POST") {
            const receivedData = request.body;
            const token = receivedData.token;

            const resetPasswordAccount = await passwordResetCollection.findOne({ token });

            if (!resetPasswordAccount) {
                response.status(400).json({ error: 'Invalid reset password link.' });
                return;
            }

            if (resetPasswordAccount.token === token) {
                const email = resetPasswordAccount.email;
                const hashedPassword = await bcrypt.hash(receivedData.password, 10);
            
                // Define an array of collections to iterate through
                const collections = [
                  musicianCollection,
                  venueCollection,
                  promoterCollection,
                  gigGoerCollection,
                ];
            
                let passwordUpdated = false;
            
                // Iterate through each collection
                for (const collection of collections) {
                  const user = await collection.findOne({ email });
            
                  if (user) {
                    // Update the password in the current collection
                    await collection.updateOne({ email }, { $set: { password: hashedPassword } });
            
                    // Delete the record associated with the token from the password_reset_tokens collection
                    await passwordResetCollection.deleteOne({ token });
            
                    passwordUpdated = true;
                    break; // Break out of the loop if the password is updated in one collection
                  }
                }
            
                if (!passwordUpdated) {
                  response.status(404).json({ error: 'User not found in any collection.' });
                  return;
                }
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

