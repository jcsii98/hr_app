import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";

export default function AddExpenseAccordion(props) {
  const { openSection, setOpenSection, apiUrl, projectView } = props;

  // ui states
  const [message, setMessage] = useState();
  const [errors, setErrors] = useState();

  const today = new Date();
  const [expenseDate, setExpenseDate] = useState(today);
  const [expenseFormData, setExpenseFormData] = useState({
    name: "",
    date: "",
    site_id: projectView.id,
    amount: "",
    scope: "",
    status: "pending",
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

  const handleSubmitExpense = async () => {
    const url = `${apiUrl}/expenses`;
    setErrors();
    setMessage("Adding expense");

    try {
      const response = await axios.post(`${url}`, expenseFormData, {
        headers,
      });
      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
        setMessage(`Expense ${data.name} has been added`);
      }
    } catch (error) {
      console.error("Error in handleSubmitExpense:", error);
      setMessage();
      setErrors(error.response.data.errors);
    }
  };

  return (
    <>
      <div className="my-4 bg-white rounded-md p-6" tabIndex="0">
        <div
          onClick={() => {
            openSection === "Add Expense"
              ? setOpenSection(null)
              : setOpenSection("Add Expense");
          }}
          className=""
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-black text-slate-400">Add Expense</div>
            <BsChevronDown
              className={`h-6 w-6 transition-all duration-500 text-slate-400 ${
                openSection == "Add Expense" ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all ${
            openSection == "Add Expense"
              ? "visible max-h-screen opacity-100"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          <div className="h-[1rem]"></div>
          <div className="bg-slate-100 rounded-md p-6 flex flex-col items-center">
            <div className="w-full pb-2">
              <input
                value={expenseFormData.name || ""}
                onChange={(e) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
                type="text"
                placeholder="Name / Short Description"
              ></input>
            </div>
            <div className="w-full pb-2">
              <input
                value={expenseFormData.date || ""}
                onChange={(e) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    date: format(new Date(e.target.value), "yyyy-MM-dd"),
                  }))
                }
                className="text-slate-400 w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
                type="date"
                placeholder="date"
              ></input>
            </div>
            <div className="w-full pb-2">
              <input
                value={expenseFormData.scope || ""}
                onChange={(e) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    scope: e.target.value,
                  }))
                }
                className="w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
                type="text"
                placeholder="Scope"
              ></input>
            </div>
            <div className="w-full pb-2">
              {" "}
              <input
                value={expenseFormData.amount || ""}
                onChange={(e) =>
                  setExpenseFormData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
                type="text"
                placeholder="Amount"
              ></input>
            </div>
            {message && <p className="pb-2 text-slate-400">{message}</p>}
            {errors && (
              <div className="w-full">
                {errors.map((error, index) => (
                  <p key={index} className="pb-2 text-red-400">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <div className="w-full">
              <button
                onClick={handleSubmitExpense}
                className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
