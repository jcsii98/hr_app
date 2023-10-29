import { useState } from "react";
import axios from "axios";

import { parseISO, format } from "date-fns";

import ExpenseListItem from "./ExpenseListItem";
export default function ExpensesFound(props) {
  const { expenses, searchFormData, apiUrl } = props;

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
      <div className="h-[1rem]"></div>
      <div className="bg-slate-100 rounded-md py-6 text-sm">
        <div className="flex flex-col items-center max-h-[200px] overflow-y-auto px-4">
          <div className="w-full overflow-x-hidden">
            {expenses &&
              expenses.length > 0 &&
              expenses.map((expense, index) => (
                <ExpenseListItem
                  expense={expense}
                  index={index}
                  key={expense.id}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="h-[1rem]"></div>
      <div className="w-full">
        <button
          className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
          type="button"
          onClick={generatePayslip}
        >
          Generate Payslip
        </button>
      </div>
    </>
  );
}
