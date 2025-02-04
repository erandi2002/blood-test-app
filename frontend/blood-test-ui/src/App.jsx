import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./components/FileUpload"; // Import File Upload Component

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Blood Test Interpretation Platform
      </h1>

      {/* File Upload Component */}
      <FileUpload />

      {/* Logo Section */}
      <div className="flex justify-center space-x-4 mt-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Counter Section */}
      <div className="mt-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Count is {count}
        </button>
        <p className="mt-2 text-gray-600">
          Edit <code>src/App.jsx</code> and save to test HMR.
        </p>
      </div>

      {/* Additional Info */}
      <p className="read-the-docs mt-4">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}

export default App;
