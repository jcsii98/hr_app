import { useState } from "react";
import axios from "axios";

import ScopeSelect from "./ScopeSelect";

export default function ExpensesEdit(props) {
  const {
    setExpensesAccordionTab,
    viewExpense,
    apiUrl,
    fetchExpenses,
    searchFormData,
  } = props;

  // ui states
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  // variable states
  const [editData, setEditData] = useState(viewExpense);
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

  const handleEditExpense = async () => {
    console.log(viewExpense);
    const url = `${apiUrl}/expenses/${viewExpense.id}`;
    setMessage("Editing expense");
    setErrors([]);

    try {
      const response = await axios.put(url, editData, { headers });
      if (response.status === 200) {
        const data = response.data;
        setMessage(`Expense "${data.name}" has been updated`);
        await Promise.all([fetchExpenses(searchFormData)]);
        setExpensesAccordionTab("Expenses Found");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in handleEditExpense:", error);
      setMessage("");
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
      } else {
        setErrors(["An error occurred while updating the expense."]);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const handleScopeChange = (selectedOption) => {
    setEditData((prev) => ({
      ...prev,
      scope: selectedOption.value,
    }));
  };
  return (
    <>
      <div className="bg-slate-100 rounded-md p-6 flex flex-col items-center">
        <div className="w-full pb-2">
          <input
            value={editData.name || ""}
            onChange={handleInputChange}
            name="name"
            className="w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
            type="text"
            placeholder="Name / Short Description"
          ></input>
        </div>
        <div className="w-full pb-2">
          <input
            value={editData.date}
            onChange={handleInputChange}
            name="date"
            className="text-slate-400 w-full px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
            type="date"
            placeholder="date"
          ></input>
        </div>
        <div className="w-full pb-2">
          <ScopeSelect
            selectedValue={editData.scope}
            handleScopeChange={handleScopeChange}
          />
        </div>
        <div className="w-full pb-2">
          {" "}
          <input
            value={editData.amount}
            onChange={handleInputChange}
            name="amount"
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

        <div className="w-full flex space-x-4">
          <button
            onClick={handleEditExpense}
            className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
          >
            Submit
          </button>
          <button
            onClick={() => setExpensesAccordionTab("View")}
            className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
