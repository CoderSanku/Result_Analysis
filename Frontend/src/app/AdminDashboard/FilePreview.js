"use client";
import React from "react";
import "./FilePreview.css";

const FilePreview = ({ file }) => {
  if (!file) {
    return (
      <div className="file-preview">
        <h3>No File Selected</h3>
        <p>Select a file to preview it here.</p>
      </div>
    );
  }

  const fileURL = URL.createObjectURL(file);

  return (
    <div className="file-preview">
      <h3>Preview</h3>
      {file.type.startsWith("image/") ? (
        <img
          src={fileURL}
          alt={file.name}
          className="preview-image"
        />
      ) : file.type === "application/pdf" ? (
        <embed
          src={fileURL}
          type="application/pdf"
          width="100%"
          height="400px"
          className="preview-embed"
        />
      ) : (
        <p>Preview not available for this file type</p>
      )}
    </div>
  );
};

export default FilePreview;