"use client";
import React, { useState } from "react";
import "./Fileselector.css";
import FilePreview from "./FilePreview";

const Fileselector = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  // Handle file selection
  const handleFileSelect = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...Array.from(event.dataTransfer.files)]);
  };

  // Prevent default behavior for dragover
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Remove a file from the list
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    if (selectedFileIndex === index && files.length > 1) {
      setSelectedFileIndex(0); // Reset preview to the first file
    }
  };

  // Upload the selected file to the backend
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("http://127.0.0.1:3000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${file.name.replace(".pdf", "")}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert("File uploaded and downloaded successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="file-upload">
        <h2>File Upload</h2>
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag and drop your files here, or</p>
          <label htmlFor="file-input" className="upload-btn">
            Click to Upload
          </label>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <h3>Selected Files:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <div className="btns">
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                    <button
                      className="preview-btn"
                      onClick={() => setSelectedFileIndex(index)}
                    >
                      Preview
                    </button>
                    <button
                      className="upload-btn2"
                      onClick={() => uploadFile(file)}
                    >
                      Upload
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <FilePreview file={files[selectedFileIndex]} />
    </div>
  );
};

export default Fileselector;
