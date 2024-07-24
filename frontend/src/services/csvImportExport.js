import axios from "axios";
import { authHeader } from "./auth-header";




const csvExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/exportartists",
        {
          headers: {
            ...authHeader(),
            "Content-Type": "text/csv",
          },
        },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "artists.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const csvImport = async (file) => {

    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/importartists", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    } catch (err) {
    //   console.error(err);
      throw new Error("Failed to import artists");
    }
  };

  export default{
    csvExport,
    csvImport
  }