import { useState, useEffect } from "react";
import axios from "axios";

import LoadingPage from "../pages/LoadingPage";
import ProjectsAccordion from "../components/ProjectsAccordion";
import ProjectForm from "../components/ProjectForm";
import ProjectView from "./ProjectView";

export default function ProjectDash(props) {
  const { setDashTab, apiUrl, userData } = props;

  //   ui states
  const [isLoading, setIsLoading] = useState(true);
  const [projectTab, setProjectTab] = useState("Home");

  //   variables
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
  const [allProjects, setAllProjects] = useState();
  const [projectView, setProjectView] = useState();

  const fetchAllProjects = async () => {
    const url = `${apiUrl}/sites?status=all`;

    try {
      const response = await axios.get(`${url}`, {
        headers,
      });
      if (!response.status == 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);

        setAllProjects(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in fetchAllProjects:", error);
      setIsLoading(false);
    }
  };

  const fetchProject = async (projectId) => {
    const url = `${apiUrl}/sites/${projectId}`;

    try {
      const response = await axios.get(`${url}`, {
        headers,
      });
      if (!response.status == 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
        setProjectView(data);
      }
    } catch (error) {
      console.error("Error in fetchProject:", error);
    }
  };

  const handleBack = () => {
    setDashTab("Projects");
    setProjectTab("Home");
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {projectTab === "Home" && (
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
                    Projects / Sites
                  </div>
                </div>

                <ProjectsAccordion
                  userData={userData}
                  name="All Projects"
                  apiUrl={apiUrl}
                  allProjects={allProjects}
                  setProjectTab={setProjectTab}
                  fetchProject={fetchProject}
                />
                <ProjectsAccordion
                  userData={userData}
                  name="Active Projects"
                  apiUrl={apiUrl}
                  allProjects={allProjects}
                  setProjectTab={setProjectTab}
                  fetchProject={fetchProject}
                />
              </div>
            </>
          )}
          {projectTab === "Adding" && (
            <>
              <ProjectForm
                fetchProject={fetchProject}
                fetchAllProjects={fetchAllProjects}
                setProjectTab={setProjectTab}
                apiUrl={apiUrl}
              />
            </>
          )}
          {projectTab === "View" && (
            <>
              <ProjectView
                userData={userData}
                apiUrl={apiUrl}
                projectView={projectView}
                setProjectTab={setProjectTab}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
