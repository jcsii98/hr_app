import React from "react";
import { format, isBefore } from "date-fns";

export default function DateRangePickerComponent(props) {
  const { startDate, endDate, onStartDateChange, onEndDateChange } = props;

  const handleDateChange = (date, isStartDate) => {
    if (isStartDate) {
      onStartDateChange(date); // Notify parent of change
    } else {
      onEndDateChange(date); // Notify parent of change

      // Check if the newly set endDate is before the current startDate
      if (isBefore(date, startDate)) {
        onStartDateChange(date); // Notify parent of change
      }
    }
  };

  const todayFormatted = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <div className="pb-4 w-full text-slate-500">
        <div className="">Start Date</div>
        <input
          type="date"
          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
          onChange={(e) => handleDateChange(new Date(e.target.value), true)}
          max={endDate ? format(endDate, "yyyy-MM-dd") : todayFormatted}
          className="w-full bg-white px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
        ></input>
      </div>
      <div className="pb-4 w-full text-slate-500">
        <div className="">End Date</div>
        <input
          type="date"
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
          onChange={(e) => handleDateChange(new Date(e.target.value), false)}
          max={todayFormatted}
          className="w-full bg-white px-4 py-4 rounded-md focus:outline-none focus:border-slate-600 border-[1px] border-slate-400"
        ></input>
      </div>
    </>
  );
}
