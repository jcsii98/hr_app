import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

export default function ListItemMenu(props) {
  const { kind } = props;
  return (
    <>
      {kind == "expense" && (
        <>
          <div className="absolute right-0">
            <div className="bg-white rounded-md p-2 flex space-x-4">
              <BiEdit className="w-6 h-6" />
              <MdDeleteOutline className="w-6 h-6" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
