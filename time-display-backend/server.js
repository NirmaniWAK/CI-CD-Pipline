const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware for JSON requests

// API route to get time based on timezone
app.get("/api/time/:timezone", async (req, res) => {
    const { timezone } = req.params;
    const API_KEY = "7CU1MEZ8008N"; // Replace with your actual API key

    try {
        const response = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=${timezone}`);

        if (response.data.status === "OK") {
            res.json({ status: "OK", time: response.data.formatted });
        } else {
            res.status(400).json({ status: "ERROR", message: "Invalid timezone" });
        }
    } catch (error) {
        res.status(500).json({ status: "ERROR", message: "Failed to fetch time data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});