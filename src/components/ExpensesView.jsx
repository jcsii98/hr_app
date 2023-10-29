import { parseISO, format } from "date-fns";

export default function ExpensesView(props) {
  const { viewExpense, setExpensesAccordionTab } = props;

  const formatAmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  });
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MM/dd/yyyy");
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
      <div
        className={`${
          viewExpense.status == "pending" ? "justify-between" : "justify-center"
        } flex space-x-4 `}
      >
        {viewExpense.status == "pending" && (
          <>
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
      </div>
    </>
  );
}
