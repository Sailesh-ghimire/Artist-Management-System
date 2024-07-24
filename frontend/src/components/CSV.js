import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authHeader } from "../services/auth-header";
import csvImportExport from "../services/csvImportExport";

const ArtistCSVImportExport = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleExport = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5000/exportartists",
  //       {
  //         headers: {
  //           ...authHeader(),
  //           "Content-Type": "text/csv",
  //         },
  //       },
  //       {
  //         responseType: "blob",
  //       }
  //     );
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "artists.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to export artists");
  //   }
  // };

  // const handleImport = async () => {

  //   if (!file) {
  //     toast.error("Please select a CSV file to upload");
  //     return;
  //   }

  //   // const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     await axios.post("http://localhost:5000/importartists", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     toast.success("Artists imported successfully");
  //     setFile(null); // Clear file input on success
  //     document.getElementById("fileInput").value = "";

  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to import artists");
  //   }
  // };


  const handleExport = async () => {
  
    try {
      await csvImportExport.csvExport();
      toast.success("Artists exported successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export artists");
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a CSV file to upload");
      return;
    }

    try {
      await csvImportExport.csvImport(file);
      toast.success("Artists imported successfully");

      // Clear the file input and state
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      console.error(err);
      toast.error("Failed to import artists");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Import/Export Artists</h2>
      <button
        onClick={handleExport}
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export Artists to CSV
      </button>
      <input
              id="fileInput"

        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="ml-2"
      />
      <button
        onClick={handleImport}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default ArtistCSVImportExport;
