"use client";

import Explanation from "@/components/Explanation";
import ImageUploader from "@/components/ImageUploader";
import ResultViewer from "@/components/ResultViewer";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const handleUpload = async (image: string) => {
    const res = await fetch("/api/vision", {
      method: "POST",
      body: JSON.stringify({ image }),
    });

    const data = await res.json();
    setResult(data);
  };
  return (
    <main>
      <h1>Cloud Vision API Demo</h1>
      <ImageUploader onUpload={handleUpload} />
      <ResultViewer data={result} />
      <Explanation />
    </main>
  );
}
