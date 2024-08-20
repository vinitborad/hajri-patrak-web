'use client';

import { useState, useEffect } from 'react';

export default function OffsetTimePage() {
  const [offsetSeconds, setOffsetSeconds] = useState(0);
  const [incrementedTime, setIncrementedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [passCode, setPassCode] = useState<string>('');
  const [codePairs, setCodePairs] = useState<{ Time: string; Code: string }[]>([]);
  const [currentCode, setCurrentCode] = useState<string | null>(null);
  const [oCode, setOCode] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const fetchTimeOffset = async () => {
    try {
      const localTime = new Date();
      const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
      const data = await response.json();
      const serverTime = new Date(data.utc_datetime);
      const timeDifference = serverTime.getTime() - localTime.getTime();
      const timeDifferenceInSeconds = timeDifference / 1000;
      setOffsetSeconds(timeDifferenceInSeconds);
      console.log('Time offset:', timeDifferenceInSeconds);
    } catch (error) {
      console.error('Failed to fetch time offset:', error);
    }
  };

  const fetchCodePairs = async (code: string) => {
    try {
      const response = await fetch(`http://192.168.1.30:3000/api/v1/code-pairs/get?codePass=${code}`);
      const data = await response.json();
      if (data.success) {
        setCodePairs(data.codePairsList);
        setOCode(data.oCode); // Store the OCode
        setIsPopupOpen(false); // Close the popup after successful fetch
        await fetchTimeOffset(); // Fetch time offset after successfully fetching code pairs
      } else {
        alert('Invalid passCode');
      }
    } catch (error) {
      console.error('Failed to fetch code pairs:', error);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const updatedTime = new Date(now.getTime() + offsetSeconds * 1000);
      setIncrementedTime(updatedTime.toISOString().substr(11, 8)); // Use UTC time format (HH:MM:SS)
      setCurrentTime(now.toISOString().substr(11, 8)); // Use UTC time format (HH:MM:SS)

      const matchingPair = codePairs.find(pair => {
        const pairTime = new Date(pair.Time);
        return (
          pairTime.getUTCHours() === updatedTime.getUTCHours() &&
          pairTime.getUTCMinutes() === updatedTime.getUTCMinutes() &&
          pairTime.getUTCSeconds() === updatedTime.getUTCSeconds()
        );
      });

      console.log('Time:', updatedTime.toISOString().substr(11, 8), 'Matching Pair:', matchingPair);

      if (matchingPair) {
        setCurrentCode(matchingPair.Code);
      }
    };

    if (codePairs.length > 0) {
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [codePairs]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Enter Pass Code</h2>
            <input
              type="text"
              value={passCode}
              onChange={(e) => setPassCode(e.target.value)}
              placeholder="Enter pass code"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => fetchCodePairs(passCode)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {!isPopupOpen && (
        <div className="flex flex-col lg:flex-row w-full max-w-6xl">
          {/* Left Column: Time Offset Adjuster */}
          <div className="flex-1 lg:mr-8">
            <h1 className="text-4xl font-bold mb-8">Time Offset Adjuster</h1>

            <div className="mb-8">
              <label className="text-lg mb-2 block">Enter Offset in Seconds:</label>
              <input
                type="number"
                value={offsetSeconds}
                onChange={(e) => setOffsetSeconds(Number(e.target.value))}
                placeholder="Offset seconds"
                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 text-center">
              <strong className="text-xl">Incremented Time:</strong> <p className="text-2xl mt-2">{incrementedTime || 'Loading...'}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 text-center">
              <strong className="text-xl">Current Time (JavaScript):</strong> <p className="text-2xl mt-2">{currentTime || 'Loading...'}</p>
            </div>
          </div>

          {/* Right Column: Codes Display */}
          <div className="flex-1 lg:ml-8 bg-blue-600 p-6 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-4xl font-mono text-center">
              {oCode} <span className="ml-4">{currentCode || 'Fetching...'}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
