import { useState, useEffect } from "react";

import { BsChevronDown } from "react-icons/bs";
import ProjectsThumbnail from "./ProjectsThumbnail";

export default function ProjectsAccordion(props) {
  const { allProjects, apiUrl, name, setProjectTab, fetchProject, userData } =
    props;

  const [projects, setProjects] = useState(allProjects);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProjects(allProjects);
  }, [allProjects]);

  const renderProjects = (projectsFilter) =>
    projects &&
    projects.length > 0 &&
    projectsFilter().map((project) => (
      <ProjectsThumbnail
        userData={userData}
        setProjectTab={setProjectTab}
        fetchProject={fetchProject}
        project={project}
        key={project.id}
        apiUrl={apiUrl}
      />
    ));

  let projectsFilter = () => projects;

  if (name === "Active Projects") {
    projectsFilter = () =>
      projects.filter((project) => project.status === "active");
  }

  return (
    <>
      <div className="my-4 bg-white rounded-md p-6" tabIndex="0">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className=""
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-black text-slate-400">
              {name} — {renderProjects(projectsFilter)?.length || 0}
            </div>
            <BsChevronDown
              className={`h-6 w-6 transition-all duration-500 text-slate-400 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all ${
            isOpen
              ? "visible max-h-screen opacity-100"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          <div className="h-[1rem]"></div>
          <div className="h-[100px] bg-slate-100 rounded-md p-6 flex space-x-4 overflow-x-auto">
            {name == "All Projects" && (
              <>
                {" "}
                <button
                  onClick={() => setProjectTab("Adding")}
                  className="py-2 my-2 rounded-lg border-[1px] px-4 flex items-center border-slate-400 text-slate-400"
                >
                  Add
                </button>
              </>
            )}
            {renderProjects(projectsFilter)}
          </div>
        </div>
      </div>
    </>
  );
}
