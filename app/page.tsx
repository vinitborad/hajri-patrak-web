"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const timeCodePairs = [
    { time: "12:43:00", code: "122700" },
    { time: "12:43:01", code: "122701" },
    { time: "12:43:02", code: "122702" },
    { time: "12:43:03", code: "122703" },
    { time: "12:43:04", code: "122704" },
    { time: "12:43:05", code: "122705" },
    { time: "12:43:06", code: "122706" },
    { time: "12:43:07", code: "122707" },
    { time: "12:43:08", code: "122708" },
    { time: "12:43:09", code: "122709" },
    { time: "12:43:10", code: "122710" },
    { time: "12:43:11", code: "122711" },
    { time: "12:43:12", code: "122712" },
    { time: "12:43:13", code: "122713" },
    { time: "12:43:14", code: "122714" },
    { time: "12:43:15", code: "122715" },
    { time: "12:43:16", code: "122716" },
    { time: "12:43:17", code: "122717" },
    { time: "12:43:18", code: "122718" },
    { time: "12:43:19", code: "122719" },
    { time: "12:43:20", code: "122720" },
    { time: "12:43:21", code: "122721" },
    { time: "12:43:22", code: "122722" },
    { time: "12:43:23", code: "122723" },
    { time: "12:43:24", code: "122724" },
    { time: "12:43:25", code: "122725" },
    { time: "12:43:26", code: "122726" },
    { time: "12:43:27", code: "122727" },
    { time: "12:43:28", code: "122728" },
    { time: "12:43:29", code: "122729" },
    { time: "12:43:30", code: "122730" },
    { time: "12:43:31", code: "122731" },
    { time: "12:43:32", code: "122732" },
    { time: "12:43:33", code: "122733" },
    { time: "12:43:34", code: "122734" },
    { time: "12:43:35", code: "122735" },
    { time: "12:43:36", code: "122736" },
    { time: "12:43:37", code: "122737" },
    { time: "12:43:38", code: "122738" },
    { time: "12:43:39", code: "122739" },
    { time: "12:43:40", code: "122740" },
    { time: "12:43:41", code: "122741" },
    { time: "12:43:42", code: "122742" },
    { time: "12:43:43", code: "122743" },
    { time: "12:43:44", code: "122744" },
    { time: "12:43:45", code: "122745" },
    { time: "12:43:46", code: "122746" },
    { time: "12:43:47", code: "122747" },
    { time: "12:43:48", code: "122748" },
    { time: "12:43:49", code: "122749" },
    { time: "12:43:50", code: "122750" },
    { time: "12:43:51", code: "122751" },
    { time: "12:43:52", code: "122752" },
    { time: "12:43:53", code: "122753" },
    { time: "12:43:54", code: "122754" },
    { time: "12:43:55", code: "122755" },
    { time: "12:43:56", code: "122756" },
    { time: "12:43:57", code: "122757" },
    { time: "12:43:58", code: "122758" },
    { time: "12:43:59", code: "122759" },
    { time: "12:43:00", code: "122700" },
    { time: "12:44:01", code: "122701" },
    { time: "12:44:02", code: "122702" },
    { time: "12:44:03", code: "122703" },
    { time: "12:44:04", code: "122704" },
    { time: "12:44:05", code: "122705" },
    { time: "12:44:06", code: "122706" },
    { time: "12:44:07", code: "122707" },
    { time: "12:44:08", code: "122708" },
    { time: "12:44:09", code: "122709" },
    { time: "12:44:10", code: "122710" },
    { time: "12:44:11", code: "122711" },
    { time: "12:44:12", code: "122712" },
    { time: "12:44:13", code: "122713" },
    { time: "12:44:14", code: "122714" },
    { time: "12:44:15", code: "122715" },
    { time: "12:44:16", code: "122716" },
    { time: "12:44:17", code: "122717" },
    { time: "12:44:18", code: "122718" },
    { time: "12:44:19", code: "122719" },
    { time: "12:44:20", code: "122720" },
    { time: "12:44:21", code: "122721" },
    { time: "12:44:22", code: "122722" },
    { time: "12:44:23", code: "122723" },
    { time: "12:44:24", code: "122724" },
    { time: "12:44:25", code: "122725" },
    { time: "12:44:26", code: "122726" },
    { time: "12:44:27", code: "122727" },
    { time: "12:44:28", code: "122728" },
    { time: "12:44:29", code: "122729" },
    { time: "12:44:30", code: "122730" },
    { time: "12:44:31", code: "122731" },
    { time: "12:44:32", code: "122732" },
    { time: "12:44:33", code: "122733" },
    { time: "12:44:34", code: "122734" },
    { time: "12:44:35", code: "122735" },
    { time: "12:44:36", code: "122736" },
    { time: "12:44:37", code: "122737" },
    { time: "12:44:38", code: "122738" },
    { time: "12:44:39", code: "122739" },
    { time: "12:44:40", code: "122740" },
    { time: "12:44:41", code: "122741" },
    { time: "12:44:42", code: "122742" },
    { time: "12:44:43", code: "122743" },
    { time: "12:44:44", code: "122744" },
    { time: "12:44:45", code: "122745" },
    { time: "12:44:46", code: "122746" },
    { time: "12:44:47", code: "122747" },
    { time: "12:44:48", code: "122748" },
    { time: "12:44:49", code: "122749" },
    { time: "12:44:50", code: "122750" },
    { time: "12:44:51", code: "122751" },
    { time: "12:44:52", code: "122752" },
    { time: "12:44:53", code: "122753" },
    { time: "12:44:54", code: "122754" },
    { time: "12:44:55", code: "122755" },
    { time: "12:44:56", code: "122756" },
    { time: "12:44:57", code: "122757" },
    { time: "12:44:58", code: "122758" },
    { time: "12:44:59", code: "122759" },
  ]

  const [index, setIndex] = useState(0);
  const [currentCode, setCurrentCode] = useState('');

  //@ts-ignore
  const getCodeIndex = (startTime, currentTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`).getTime();
    const current = new Date(`1970-01-01T${currentTime}Z`).getTime();
    return Math.floor((current - start) / 1000); // Calculate the number of seconds elapsed
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; // Format time as "HH:MM:SS"
  };

  useEffect(() => {
    const startTime = "12:53:00";
    const currentTime = getCurrentTime();
    const startIndex = getCodeIndex(startTime, currentTime) + 3;
    setIndex(startIndex); // Set initial index

    const interval = setInterval(() => {
      setCurrentCode(timeCodePairs[index]?.code || ''); // Update the code to display
      setIndex(prevIndex => prevIndex + 1); // Increment the index each second
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index]);

  return (
    <main className="flex justify-center items-center min-h-screen bg-zinc-950 text-zinc-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Current Code:</h1>
        <p className="text-2xl font-mono">{currentCode}</p>
      </div>
    </main>
  );
}
