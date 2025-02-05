import { useState } from "react";
import Tesseract from "tesseract.js";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    // Convert Image to Text Using Tesseract.js
    Tesseract.recognize(file, "eng")
      .then(({ data: { text } }) => {
        setText(text);
        setMessage("Text extracted successfully!");
      })
      .catch(() => setMessage("Error processing the image."));
  };

  return (
    <div className="p-5 bg-gray-200 rounded-md">
      <input type="file" onChange={handleFileChange} className="mb-3" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Upload & Extract Text
      </button>
      <p className="mt-2 text-gray-700">{message}</p>
      <pre className="mt-3 bg-white p-3 rounded-md">{text}</pre>
    </div>
  );
}

export default FileUpload;
