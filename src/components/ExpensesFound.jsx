import { useState } from "react";
import axios from "axios";

import { parseISO, format } from "date-fns";

import ExpenseListItem from "./ExpenseListItem";
export default function ExpensesFound(props) {
  const {
    expenses,
    searchFormData,
    apiUrl,
    setExpensesAccordionTab,
    setViewExpense,
  } = props;

  const [tab, setTab] = useState("Home");
  const [payslipData, setPayslipData] = useState({
    id: searchFormData.site_id,
    week_start: searchFormData.start_date,
    week_end: searchFormData.end_date,
    scope: searchFormData.scope,
  });
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

  const generatePayslip = async () => {
    const url = `${apiUrl}/site_payslips`;
    console.log(searchFormData);
    try {
      const response = await axios.post(url, payslipData, { headers: headers });

      if (response.status === 200) {
        // Payslip was successfully generated
        // You can add code here to handle the response if needed
        console.log("Payslip generated successfully");
      } else {
        // Handle any other response status codes if necessary
        console.log("Failed to generate payslip");
      }
    } catch (error) {
      console.error("An error occurred while generating the payslip:", error);
    }
  };

  return (
    <>
      {tab == "Home" && (
        <>
          <div className="bg-slate-100 rounded-md py-6 text-sm">
            <div className="flex flex-col items-center max-h-[200px] overflow-y-auto px-4">
              <div className="w-full overflow-x-hidden">
                {expenses &&
                  expenses.length > 0 &&
                  expenses.map((expense, index) => (
                    <ExpenseListItem
                      setExpensesAccordionTab={setExpensesAccordionTab}
                      setViewExpense={setViewExpense}
                      setTab={setTab}
                      expense={expense}
                      index={index}
                      key={expense.id}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="h-[1rem]"></div>
          <div className="w-full flex space-x-4">
            <button
              className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
              type="button"
              onClick={generatePayslip}
            >
              Generate Payslip
            </button>
            <button
              className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
              type="button"
              onClick={() => setExpensesAccordionTab("Home")}
            >
              Go Back
            </button>
          </div>
        </>
      )}
      {/* {tab == "View" && (
        <>
          <div className="bg-slate-100 rounded-md py-6 text-sm px-4">
            <div className="w-full flex items-center px-2 py-2 border-y-[1px] border-slate-400">
              <div className="basis-1/3 flex flex-col truncate text-start">
                <div className="">{viewExpense.name}</div>
                <div className="">{viewExpense.scope}</div>
              </div>
              <div className="basis-1/3 flex flex-col truncate text-end px-1">
                <div className="">{formatAmt.format(viewExpense.amount)}</div>
                <div className="">{formatDate(viewExpense.date)}</div>
              </div>
              <div className="basis-1/3 flex flex-col truncate text-end">
                <div className="">Status</div>
                <div>{viewExpense.status}</div>
              </div>
            </div>
          </div>
          {viewExpense.status == "pending" && (
            <>
              <div className="h-[1rem]"></div>
              <div className="flex space-x-4">
                <button
                  className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
                  type="submit"
                >
                  Edit
                </button>
                <button
                  className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
                  type="submit"
                >
                  Delete
                </button>
                <button
                  onClick={() => setTab("Home")}
                  className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
                  type="submit"
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </>
      )} */}
    </>
  );
}
