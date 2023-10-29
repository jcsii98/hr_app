import { useState } from "react";
import axios from "axios";

import { parseISO, format } from "date-fns";
import { BiDotsHorizontalRounded } from "react-icons/bi";
export default function ProjectPayslipsFound(props) {
  const { apiUrl, payslips, searchFormData } = props;

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MM/dd");
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });

  return (
    <>
      <div className="h-[1rem]"></div>
      <div className="bg-slate-100 rounded-md py-6 text-sm">
        <div className="flex flex-col items-center max-h-[200px] overflow-y-auto px-4">
          <div className="w-full overflow-x-hidden">
            {payslips &&
              payslips.length > 0 &&
              payslips.map((payslip, index) => (
                <div
                  className={`flex items-center ${
                    payslip.status == "pending" && "text-slate-400"
                  } ${payslip.status == "approved" && "text-black"} ${
                    payslip.status == "rejected" && "text-red-400"
                  } ${payslip.status == "completed" && "text-blue-400"} ${
                    index === 0 && "border-t-[1px]" // Add this condition
                  } border-b-[1px] border-slate-400 py-2`}
                  style={{ gridTemplateColumns: "90px 90px 90px" }}
                  // className={`flex items-center ${
                  //   payslip.id == 1 && "border-t-[1px]"
                  // } border-b-[1px] border-slate-400 py-2`}
                  key={payslip.id}
                >
                  {/* <div className="truncate text-start px-1">
                    
                  </div> */}
                  <div className="basis-1/3 flex flex-col truncate text-start px-1">
                    <div className="">{formatDate(payslip.date)}</div>
                    <div className="">{payslip.status}</div>
                  </div>
                  <div className="basis-1/3 flex flex-col truncate text-end px-1">
                    <div>{formatter.format(payslip.amount)}</div>
                    <div className="flex items-center justify-end">
                      <div>{formatDate(payslip.week_start)}</div>
                      {"-"}
                      <div>{formatDate(payslip.week_end)}</div>
                    </div>
                  </div>
                  <div className="text-black basis-1/3 flex justify-center">
                    <BiDotsHorizontalRounded />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* <div className="w-full">
        <button
          className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
          type="button"
          onClick={generatePayslip}
        >
          Generate Payslip
        </button>
      </div> */}
    </>
  );
}
