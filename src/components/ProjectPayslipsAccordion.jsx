import { useState } from "react";
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";
import { format, subDays } from "date-fns";

import ProjectPayslipsFound from "./ProjectPayslipsFound";
import DateRangePickerComponent from "./DateRangePickerComponent";

export default function ProjectPayslipsAccordion(props) {
  const { openSection, setOpenSection, apiUrl, userData, projectView } = props;

  // ui states
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [payslipsFound, setPayslipsFound] = useState();

  // variable states
  const [payslips, setPayslips] = useState();
  const [searchFormData, setSearchFormData] = useState({
    id: projectView.id,
  });
  const initialStartDate = subDays(new Date(), 7);
  const initialEndDate = new Date();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
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

  const fetchProjectPayslips = async () => {
    const url = `${apiUrl}/site_payslips`;

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
          setMessage("No payslips found");
          setPayslipsFound(false);
        } else {
          setPayslips(data);
          setPayslipsFound(true);
        }
      }
    } catch (error) {
      console.log(error);
      setPayslipsFound(false);
      setMessage();
      setError(error.response.data.error);
    }
  };
  return (
    <>
      <div className="my-4 bg-white rounded-md p-6" tabIndex="0">
        <div
          onClick={() => {
            openSection === "Project Payslips"
              ? setOpenSection(null)
              : setOpenSection("Project Payslips");
          }}
          className=""
        >
          <div className="flex items-center justify-between">
            <div className="text-xl font-black text-slate-400">
              Project Payslips
            </div>
            <BsChevronDown
              className={`h-6 w-6 transition-all duration-500 text-slate-400 ${
                openSection == "Project Payslips" ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all ${
            openSection == "Project Payslips"
              ? "visible max-h-screen opacity-100"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          {payslipsFound && (
            <ProjectPayslipsFound
              apiUrl={apiUrl}
              payslips={payslips}
              searchFormData={searchFormData}
            />
          )}
          {!payslipsFound && (
            <>
              <div className="h-[1rem]"></div>
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
                <div className="w-full">
                  <button
                    className="bg-white w-full px-4 py-4 rounded-md border-[1px] border-slate-400 text-slate-500"
                    type="button"
                    onClick={fetchProjectPayslips}
                  >
                    Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
