'use client';

import { useState, useEffect } from 'react';

export default function OffsetTimePage() {
  const [offsetSeconds, setOffsetSeconds] = useState(0);
  const [incrementedTime, setIncrementedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  const offSetFunction = async () => {
    try {
      // Get local time
      const localTime = new Date();

      // Get time from a reliable source (World Time API)
      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
      const data = await response.json();
      const serverTime = new Date(data.utc_datetime);

      // Calculate the difference in milliseconds
      const timeDifference = serverTime.getTime() - localTime.getTime();

      // Convert difference to seconds
      const timeDifferenceInSeconds = timeDifference / 1000;

      console.log(`Your clock is ${Math.abs(timeDifferenceInSeconds)} seconds ${(timeDifferenceInSeconds > 0) ? 'ahead' : 'behind'}.`);

      setOffsetSeconds(timeDifferenceInSeconds);
    } catch (error) {
      console.error('Failed to fetch time offset:', error);
    }
  };

  // Only call offSetFunction once when the component mounts
  useEffect(() => {
    offSetFunction();
  }, []); // The empty dependency array ensures this useEffect runs only once on mount

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const updatedTime = new Date(now.getTime() + offsetSeconds * 1000);
      setIncrementedTime(updatedTime.toLocaleTimeString());
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime(); // Set the initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [offsetSeconds]); // Re-run this effect if offsetSeconds changes

  return (
    <div style={{ padding: '20px' }}>
      <h1>Time Offset Adjuster</h1>

      <div>
        <label>Enter Offset in Seconds: </label>
        <input
          type="number"
          value={offsetSeconds}
          onChange={(e) => setOffsetSeconds(Number(e.target.value))}
          placeholder="Offset seconds"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>Incremented Time:</strong> {incrementedTime || 'Loading...'}
      </div>

      <div style={{ marginTop: '10px' }}>
        <strong>Current Time (JavaScript):</strong> {currentTime || 'Loading...'}
      </div>
    </div>
  );
}
