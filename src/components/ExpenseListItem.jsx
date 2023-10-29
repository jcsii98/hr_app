import { BiDotsHorizontalRounded } from "react-icons/bi";
import { parseISO, format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import ListItemMenu from "./ListItemMenu";

export default function ExpenseListItem(props) {
  const { expense, index, setTab, setViewExpense, setExpensesAccordionTab } =
    props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MM/dd");
  };

  return (
    <>
      <div
        className={`flex items-center ${
          expense.status == "pending" && "text-slate-400"
        } ${expense.status == "approved" && "text-black"} ${
          expense.status == "rejected" && "text-red-400"
        } ${expense.status == "completed" && "text-blue-400"} ${
          index === 0 && "border-t-[1px]"
        } border-b-[1px] border-slate-400 py-2 relative`}
      >
        <div className="basis-1/3 flex flex-col truncate text-start px-1">
          <div>{expense.name}</div>
          <div>{formatDate(expense.date)}</div>
        </div>
        <div className="basis-1/3 flex flex-col truncate text-end px-1">
          <div>{formatter.format(expense.amount)}</div>
          <div>{expense.scope}</div>
        </div>
        <div className="text-black basis-1/3 flex justify-center">
          <ListItemMenu
            expense={expense}
            kind="expense"
            setTab={setTab}
            setViewExpense={setViewExpense}
            setExpensesAccordionTab={setExpensesAccordionTab}
          />
        </div>
      </div>
    </>
  );
}
