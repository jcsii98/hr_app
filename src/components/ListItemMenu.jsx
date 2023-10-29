import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";

export default function ListItemMenu(props) {
  const { kind, setViewExpense, expense, setExpensesAccordionTab } = props;

  const handleViewClicked = () => {
    console.log("List Item Clicked");
    setViewExpense(expense);
    setExpensesAccordionTab("View");
  };

  return (
    <>
      {kind == "expense" && (
        <>
          <div className="">
            <VscOpenPreview
              onClick={handleViewClicked}
              className="w-4 h-4 text-slate-500"
            />

            {/* <MdDeleteOutline className="w-4 h-4" /> */}
          </div>
        </>
      )}
    </>
  );
}
