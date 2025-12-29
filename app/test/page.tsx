"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Page = () => {
  const prompt = "give me a short poem about programming in urdu";
  const [output, setOutput] = useState<string>("");

  async function handleClick() {
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setOutput(`Error: ${response.status} - ${errorText}`);
        return;
      }

      const data = await response.json();
      setOutput(data.text || "No text returned");
    } catch (err) {
      console.error("Fetch error:", err);
      setOutput("Network error – check console");
    }
  }
  return (
    <>
      <div>{output}</div>
      <Button onClick={handleClick}>Click Me</Button>
    </>
  );
};

export default Page;
