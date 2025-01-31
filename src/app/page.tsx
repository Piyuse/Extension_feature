'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [extensionInstalled, setExtensionInstalled] = useState(false);

  useEffect(() => {
    // Check if extension is installed
    const checkExtension = (event: MessageEvent) => {
      if (event.data.type === "FROM_EXTENSION" && 
          event.data.payload === "EXTENSION_READY") {
        setExtensionInstalled(true);
      }
    };

    window.addEventListener("message", checkExtension);
    return () => window.removeEventListener("message", checkExtension);
  }, []);

  const openExtension = () => {
    window.postMessage({
      type: "FROM_NEXTJS",
      payload: {
        action: "OPEN_EXTENSION",
        data: {}
      }
    }, "*");
  };

  return (
    <div className="p-8">
      <h1>Next.js App with Chrome Extension Integration</h1>

      <button
        onClick={openExtension}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Extension
      </button>

      {!extensionInstalled && (
        <p className="mt-4 text-red-500">
          Please install the Chrome extension to enable all features.
        </p>
      )}
    </div>
  );
}