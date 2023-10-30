import { parseISO, format } from "date-fns";
import axios from "axios";
import { useState } from "react";

export default function ExpensesView(props) {
  const { viewExpense, setExpensesAccordionTab, apiUrl } = props;

  // ui states
  const [showConfirm, setShowConfirm] = useState(false);

  // variable states
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

  const formatAmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MM/dd/yyyy");
  };

  const handleEditClicked = () => {
    setExpensesAccordionTab("Edit");
  };

  const handleConfirmDelete = async () => {
    const url = `${apiUrl}/expenses/${viewExpense.id}`;

    try {
      const response = await axios.delete(url, { headers: headers });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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

      <div className="h-[1rem]"></div>
      {showConfirm && (
        <div className="flex flex-col items-center">
          <div className="text-md font-medium text-slate-400 pb-2">
            Confirm Deletion
          </div>
          <div className="flex space-x-4 w-full">
            <button
              className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
              type="submit"
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
              type="submit"
            >
              No
            </button>
          </div>
        </div>
      )}
      <div
        className={`${
          viewExpense.status == "pending" ? "justify-between" : "justify-center"
        } flex space-x-4 `}
      >
        {!showConfirm && (
          <>
            {viewExpense.status == "pending" && (
              <>
                <button
                  className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
                  type="submit"
                  onClick={handleEditClicked}
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-white w-full py-2 rounded-md border-[1px] border-slate-400 text-slate-500"
                  type="submit"
                >
                  Delete
                </button>
              </>
            )}

            <button
              onClick={() => setExpensesAccordionTab("Expenses Found")}
              className={`${
                viewExpense.status == "pending" ? "w-full" : "px-4"
              } bg-white py-2 rounded-md border-[1px] border-slate-400 text-slate-500`}
              type="submit"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </>
  );
}
