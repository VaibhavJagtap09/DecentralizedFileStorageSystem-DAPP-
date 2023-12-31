import {useState} from "react";
import axios from "axios";
import "./FileUpload.css"
const FileUpload = ({contract, account, provider}) => {
    const [file,setFile]=useState(null);
    const [fileName, setfileName]=useState("No file selected")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `da77392672bec166ff35`,
                pinata_secret_api_key: `782c03cc705c275022664af15f5b4d825a9e14a53ad06c81898ac1a15c275655`,
                "Content-Type": "multipart/form-data",
              },
            });
            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
            contract.add(account,ImgHash);
            alert("Successfully Image Uploaded");
            setfileName("No image selected");
            setFile(null);
          } catch (e) {
            alert("Unable to upload image to Pinata");
          }
        }
      };
      const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setfileName(e.target.files[0].name);
        e.preventDefault();
      };
      return (
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
              Choose Image
            </label>
            <input
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>
              Upload File
            </button>
          </form>
        </div>
      );
    };
export default FileUpload;