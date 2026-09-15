import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import app from './app.js'; // Imports the express app from app.js
import { dbConnection } from './database/dbConnection.js';
import { seedDoctors } from './database/seedDoctors.js';
import { seedAdmin } from './database/seedAdmin.js';

// Configure dotenv to find the config.env file
dotenv.config({ path: './config/config.env' });

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

dbConnection().then(async () => {
    console.log("Connected to Database!");
    await seedAdmin();
    return seedDoctors();
}).then(() => {

    // Start the server only after the database connection is successful
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });

}).catch(err => {
    console.log(`Some error occurred while connecting to Database: ${err}`);
});