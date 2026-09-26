import express from "express";
import { config } from "dotenv";

// Load environment variables
config();

const PORT = process.env.PORT || 5000;
const app = express();

// TODO: Change Production base URL
// DB connection establish na ho tab tak server chalu nahi karna
app.listen(PORT, 
    () => {
        console.log(`Server is listening on ${process.env.NODE_ENV === "development" ? `http://localhost:${PORT}/api/v1` : `https://orbi-ji1n.onrender.com`}`)
    }
);