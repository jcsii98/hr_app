import { parseISO, format } from "date-fns";

export default function ExpensesFound(props) {
  const { expenses } = props;
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
      <div className="h-[1rem]"></div>
      <div className="bg-slate-100 rounded-md py-6 text-sm">
        <div className="px-4 w-full">
          <div
            className="grid items-center border-b-[1px] border-slate-300"
            style={{ gridTemplateColumns: "20px 50px 80px 80px 50px" }}
          >
            <div className="col-span-1 truncate text-start px-1">#</div>
            <div className="col-span-1 truncate text-start border-x-[1px] border-slate-300 px-1">
              Scope
            </div>
            <div className="col-span-1 truncate text-start px-1">Name</div>
            <div className="col-span-1 truncate text-end border-x-[1px] border-slate-300 px-1">
              Amount
            </div>
            <div className="col-span-1 truncate text-end px-1">Date</div>
          </div>
        </div>
        <div className="flex flex-col items-center max-h-[200px] overflow-y-auto px-4">
          <div className="w-full pb-2">
            {expenses &&
              expenses.length > 0 &&
              expenses.map((expense) => (
                <div
                  className="grid items-center"
                  style={{ gridTemplateColumns: "20px 50px 80px 80px 50px" }} // for example
                  key={expense.id}
                >
                  <div className="truncate text-start px-1">{expense.id}</div>
                  <div className="truncate text-start border-x-[1px] border-slate-300 px-1">
                    {expense.scope}
                  </div>
                  <div className="truncate text-start px-1">{expense.name}</div>
                  <div className="truncate text-end border-x-[1px] border-slate-300 px-1">
                    {formatter.format(expense.amount)}
                  </div>
                  <div className="truncate text-end px-1">
                    {formatDate(expense.date)}
                  </div>
                </div>
              ))}
          </div>

          <div className="w-full"></div>
        </div>
      </div>
    </>
  );
}
