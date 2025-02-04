import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message || "Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed.");
    }
    
  };

  return (
    <div className="p-5 bg-gray-200 rounded-md">
      <input type="file" onChange={handleFileChange} className="mb-3" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Upload File
      </button>
      <p className="mt-2 text-gray-700">{message}</p>
    </div>
  );
}

export default FileUpload;
