import { useState } from "react";

import MyExpensesAccordion from "./MyExpensesAccordion";
import AddExpenseAccordion from "./AddExpenseAccordion";
import ProjectPayslipsAccordion from "./ProjectPayslipsAccordion";

export default function ProjectExpenses(props) {
  const { projectView, apiUrl, userData } = props;

  // ui states
  const [openSection, setOpenSection] = useState(null);

  return (
    <>
      <MyExpensesAccordion
        apiUrl={apiUrl}
        userData={userData}
        projectView={projectView}
        openSection={openSection}
        setOpenSection={setOpenSection}
      />
      <AddExpenseAccordion
        apiUrl={apiUrl}
        userData={userData}
        projectView={projectView}
        openSection={openSection}
        setOpenSection={setOpenSection}
      />
      {/* <ProjectPayslipsAccordion
        apiUrl={apiUrl}
        projectView={projectView}
        userData={userData}
        openSection={openSection}
        setOpenSection={setOpenSection}
      /> */}
    </>
  );
}
