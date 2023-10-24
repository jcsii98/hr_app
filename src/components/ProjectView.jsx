import { useState } from "react";

import ProjectExpenses from "./ProjectExpenses";

export default function ProjectView(props) {
  const { setProjectTab, projectView, apiUrl, userData } = props;

  const [tab, setTab] = useState("Home");
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div
            onClick={() => setProjectTab("Home")}
            className="text-3xl font-black text-slate-600"
          >
            {"<"}
          </div>
          <div
            onClick={() => setTab("Home")}
            className="text-3xl font-black text-slate-600"
          >
            {projectView.name} / {tab !== "Home" && <>{tab}</>}
          </div>
        </div>
        {tab == "Home" && (
          <>
            <div
              onClick={() => setTab("Expenses")}
              className="text-2xl font-black text-slate-400"
            >
              Expenses / Contracts
            </div>
            <div className="text-2xl font-black text-slate-400">
              Payroll / Shifts
            </div>
            <div className="text-2xl font-black text-slate-400">Misc.</div>
          </>
        )}
        {tab == "Expenses" && (
          <>
            <ProjectExpenses
              userData={userData}
              projectView={projectView}
              apiUrl={apiUrl}
            />
          </>
        )}
      </div>
    </>
  );
}
