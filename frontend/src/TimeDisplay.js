import React, { useState } from "react";
import axios from "axios";

const TimeDisplay = () => {
    const [timezone, setTimezone] = useState('');
    const [time, setTime] = useState(null);
    const [error, setError] = useState('');

    const fetchTime = async () => {
        if (!timezone) {
            setError('Please enter a valid timezone.');
            return;
        }

        setError('');
        try {
            const API_KEY = "7CU1MEZ8008N"; // Replace with your actual API key
            const response = await axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=${timezone}`);

            if (response.data.status === "OK") {
                setTime(response.data.formatted);  // Extracting formatted time
            } else {
                setTime(null);
                setError("Invalid timezone. Please check.");
            }
        } catch (error) {
            setTime(null);
            setError("Error fetching time. Check your API key or internet connection.");
            console.error("Error fetching time:", error);
        }
    };

    return (
        <div>
            <h2>World Time Display</h2>
            <input
                type="text"
                placeholder="Enter Timezone (e.g., Asia/Colombo)"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
            />
            <button onClick={fetchTime}>Get Time</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {time && <p>Current Date & Time: {time}</p>}
        </div>
    );
};

export default TimeDisplay;