import { useState } from "react";

export default function DashPage(props) {
  const { apiUrl, setIsLoggedIn, userData, setUserData } = props;

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];

    // You can now do something with the selected file, e.g., upload it to your server.
    // For simplicity, we'll just display its name here.
    console.log("Selected file:", selectedFile.name);
  };

  return (
    <>
      {userData.kind == "admin" && (
        <>
          <div className="text-3xl font-black text-slate-400">
            Hello, Admin!
          </div>
        </>
      )}
      {userData.kind == "user" && (
        <>
          <div className="text-3xl font-black text-slate-400 pb-10">
            Hello, User!
          </div>
          <input
            type="file"
            accept="image/*"
            capture="camera" // Use the device camera
            style={{ display: "none" }} // Hide the input element
            onChange={handleFileInputChange}
            id="fileInput" // Add an id to the input element
          />
          <label htmlFor="fileInput">
            <div className="flex flex-col justify-center items-center text-slate-400">
              <div className="w-36 h-36 rounded-full bg-slate-400"></div>
              <div className="pt-2">
                {!userData.profile_picture ? "Take a Photo" : "Change photo"}
              </div>
            </div>
          </label>
          {!userData.profile_picture && <></>}
        </>
      )}
    </>
  );
}
