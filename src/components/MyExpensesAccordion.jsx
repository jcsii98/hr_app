import { useState } from "react";
import axios from "axios";
import { format, subDays } from "date-fns";

import ExpensesFound from "./ExpensesFound";
import ExpensesView from "./ExpensesView";
import ExpensesEdit from "./ExpensesEdit";
import DateRangePickerComponent from "./DateRangePickerComponent";
import { BsChevronDown } from "react-icons/bs";
import ScopeSelect from "./ScopeSelect";

export default function MyExpensesAccordion(props) {
  const { apiUrl, projectView, userData, openSection, setOpenSection } = props;

  // ui states
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [expensesAccordionTab, setExpensesAccordionTab] = useState("Home");

  // variable states

  const [viewExpense, setViewExpense] = useState();
  const [expenses, setExpenses] = useState();
  const initialStartDate = subDays(new Date(), 7);
  const initialEndDate = new Date();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [searchFormData, setSearchFormData] = useState({
    start_date: format(initialStartDate, "yyyy-MM-dd"),
    end_date: format(initialEndDate, "yyyy-MM-dd"),
    site_id: projectView.id,
    user_id: userData.id,
    scope: "",
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

  const fetchExpenses = async () => {
    const url = `${apiUrl}/expenses?status=all`;

    setError();
    setExpenses();
    setMessage(
      `Searching for ${userData.first_name}'s transactions for ${projectView.name}`
    );

    try {
      const response = await axios.get(url, {
        headers: headers,
        params: searchFormData,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
        if (data.length < 1) {
          setMessage("No expenses found");
        } else {
          setMessage();
          setExpenses(data);
          setExpensesAccordionTab("Expenses Found");
        }
      }
    } catch (error) {
      console.error("Error in fetchExpenses:", error);
      setMessage();
      setError(error.response.data.error);
    }
  };
  const handleScopeChange = (selectedOption) => {
    setSearchFormData((prev) => ({
      ...prev,
      scope: selectedOption.value,
    }));
  };

  return (
    <>
      <div className="my-4 bg-white rounded-md p-6" tabIndex="0">
        <div
          onClick={() => {
            openSection === "My Expenses"
              ? setOpenSection(null)
              : setOpenSection("My Expenses");
          }}
          className=""
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-black text-slate-400">My Expenses</div>
            <BsChevronDown
              className={`h-6 w-6 transition-all duration-500 text-slate-400 ${
                openSection == "My Expenses" ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all ${
            openSection == "My Expenses"
              ? "visible max-h-screen opacity-100"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          <div className="h-[1rem]"></div>
          {expensesAccordionTab == "Expenses Found" && (
            <>
              <ExpensesFound
                setViewExpense={setViewExpense}
                setExpensesAccordionTab={setExpensesAccordionTab}
                apiUrl={apiUrl}
                expenses={expenses}
                searchFormData={searchFormData}
              />
            </>
          )}

          {expensesAccordionTab == "Home" && (
            <>
              <div className="bg-slate-100 rounded-md p-6 flex flex-col items-center">
                <DateRangePickerComponent
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={(date) => {
                    setStartDate(date);
                    setSearchFormData((prev) => ({
                      ...prev,
                      start_date: format(date, "yyyy-MM-dd"),
                    }));
                  }}
                  onEndDateChange={(date) => {
                    setEndDate(date);
                    setSearchFormData((prev) => ({
                      ...prev,
                      end_date: format(date, "yyyy-MM-dd"),
                    }));
                  }}
                />

                <div className="w-full pb-2">
                  <ScopeSelect
                    selectedValue={searchFormData.scope}
                    handleScopeChange={handleScopeChange}
                  />
                </div>
                {message && <p className="pb-2 text-slate-400">{message}</p>}
                {error && <p className="pb-2 text-red-400">{error}</p>}
                <div className="w-full">
                  <button
                    className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
                    type="button"
                    onClick={fetchExpenses}
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}

          {expensesAccordionTab == "View" && (
            <>
              <ExpensesView
                setExpensesAccordionTab={setExpensesAccordionTab}
                viewExpense={viewExpense}
                apiUrl={apiUrl}
              />
            </>
          )}
          {expensesAccordionTab == "Edit" && (
            <>
              <ExpensesEdit
                fetchExpenses={fetchExpenses}
                searchFormData={searchFormData}
                apiUrl={apiUrl}
                setExpensesAccordionTab={setExpensesAccordionTab}
                viewExpense={viewExpense}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
