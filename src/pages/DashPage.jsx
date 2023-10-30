import { useState, useEffect } from "react";
import axios from "axios";
// import React from "react";
// import Clock from "react-live-clock";

import LoadingPage from "./LoadingPage";

import ProjectDash from "../components/ProjectDash";
import PersonnelAccordion from "../components/PersonnelAccordion";

import { MdOutlineArrowBackIosNew } from "react-icons/md";

export default function DashPage(props) {
  const { apiUrl, setIsLoggedIn, userData, setUserData } = props;

  // ui states
  const [isLoading, setIsLoading] = useState(true);
  const [dashTab, setDashTab] = useState("Home");
  const [personnelTab, setPersonnelTab] = useState("Home");

  // variables
  const [allPersonnel, setAllPersonnel] = useState([]);

  const uid = localStorage.getItem("uid");
  const client = localStorage.getItem("client");
  const accessToken = localStorage.getItem("access-token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    uid,
    client,
    "access-token": accessToken,
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];

    // You can now do something with the selected file, e.g., upload it to your server.
    // For simplicity, we'll just display its name here.
    console.log("Selected file:", selectedFile.name);
  };

  const fetchAllPersonnel = async () => {
    const url = `${apiUrl}/users?status=all`;

    try {
      const response = await axios.get(`${url}`, {
        headers,
      });
      if (!response.status == 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
        setAllPersonnel(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in fetchAllPersonnel:", error);
    }
  };

  const handleSignOutClicked = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  // const fetchAllProjects = async () => {
  //   const url = `${apiUrl}/sites?status=all`;

  //   try {
  //     const response = await axios.get(`${url}`, {
  //       headers,
  //     });
  //     if (!response.status == 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     } else {
  //       const data = response.data;
  //       console.log(data);

  //       setAllProjects(data);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error in fetchAllProjects:", error);
  //     setIsLoading(false);
  //   }
  // };

  // const fetchProject = async (projectId) => {
  //   const url = `${apiUrl}/sites/${projectId}`;

  //   try {
  //     const response = await axios.get(`${url}`, {
  //       headers,
  //     });
  //     if (!response.status == 200) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     } else {
  //       const data = response.data;
  //       console.log(data);
  //       setProjectDashboard(data);
  //     }
  //   } catch (error) {
  //     console.error("Error in fetchProject:", error);
  //   }
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData.kind == "admin") {
        fetchAllPersonnel();
        // fetchAllProjects();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          {userData.kind == "admin" && (
            <>
              {dashTab == "Home" && (
                <>
                  {/* <Clock
                    date={"1997-12-31T14:15:23+01:00"}
                    format={"dddd, MMMM Mo, YYYY, h:mm:ss A"}
                    timezone={"Australia/Sydney"}
                  /> */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <div className="text-3xl font-black text-slate-600">
                        Admin Dashboard
                      </div>
                    </div>
                    <div
                      onClick={() => setDashTab("Home")}
                      className="text-2xl font-black text-slate-400"
                    >
                      My Profile
                    </div>
                    <div
                      onClick={() => setDashTab("Projects")}
                      className="text-2xl font-black text-slate-400"
                    >
                      Projects / Sites
                    </div>
                    <div
                      onClick={() => setDashTab("Personnel Management")}
                      className="text-2xl font-black text-slate-400"
                    >
                      Personnel Management
                    </div>
                    <div
                      onClick={handleSignOutClicked}
                      className="text-2xl font-black text-slate-400"
                    >
                      Sign Out
                    </div>
                  </div>
                </>
              )}

              {dashTab == "Projects" && (
                <>
                  <ProjectDash
                    userData={userData}
                    apiUrl={apiUrl}
                    setDashTab={setDashTab}
                  />
                </>
              )}
              {dashTab == "Personnel Management" && (
                <>
                  <div className="flex flex-col space-y-4">
                    <div
                      onClick={() => setDashTab("Home")}
                      className="flex items-center space-x-4"
                    >
                      <div className="text-3xl font-black text-slate-600">
                        {"<"}
                      </div>

                      <div className="text-3xl font-black text-slate-600">
                        Personnel Management
                      </div>
                    </div>
                    <PersonnelAccordion
                      name="All Personnel"
                      apiUrl={apiUrl}
                      personnelFromProps={allPersonnel}
                      setPersonnelTab={setPersonnelTab}
                    />
                    <PersonnelAccordion
                      name="Verified Personnel"
                      apiUrl={apiUrl}
                      personnelFromProps={allPersonnel}
                    />
                  </div>
                </>
              )}
            </>
          )}
          {/* {userData.kind == "user" && (
        <>
          <div className="text-3xl font-black text-slate-400 pb-10">
            User Dashboard
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
      )} */}
        </>
      )}
    </>
  );
}
