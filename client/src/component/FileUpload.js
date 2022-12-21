import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    console.log(file);

    const formData = new FormData();
    formData.append("multi-files", file);
    formData.append("fileName", fileName);

    for (var key of formData.entries()) {
      console.log(key[0] + "," + key[1]);
    }

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const res = await axios.post("http://localhost:3001/upload", formData,{
        headers
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="App">
      <input type="file" name="multi-files" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default FileUpload;
