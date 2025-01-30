'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Check if we can receive messages from the extension
    const checkExtension = (event: MessageEvent) => {
      if (event.data.type === "FROM_EXTENSION") {
        console.log('Extension is installed');
      }
    };

    window.addEventListener("message", checkExtension);
    return () => window.removeEventListener("message", checkExtension);
  }, []);

  const sendMessageToExtension = (action: string, data = {}) => {
    window.postMessage({
      type: "FROM_NEXTJS",
      payload: {
        action,
        data
      }
    }, "*");
  };

  return (
    <div className="p-8">
      <h1>Next.js App with Chrome Extension Integration</h1>

      <button
        onClick={() => sendMessageToExtension("open_popup")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Extension
      </button>

      <p className="mt-4 text-red-500">
        Please install the Chrome extension to enable all features.
      </p>
    </div>
  );
}
