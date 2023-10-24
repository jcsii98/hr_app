import Boy from "../assets/boy.png";

export default function PersonnelThumbnail(props) {
  const { user } = props;
  const nameString = `${user.first_name[0]}. ${user.last_name}`;
  return (
    <>
      <div className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4">
        {" "}
        <div className="bg-white rounded-full w-16 h-16 flex justify-center items-center">
          <img src={Boy} className="place-self-center w-14 h-14 rounded-full" />
        </div>
        <div
          className={`${
            user.status === "approved" ? "text-slate-700" : "text-slate-400"
          }`}
        >
          {nameString}
        </div>
      </div>
      {/* <div className="rounded-full w-16 h-16 flex flex-col items-center justify-center">
        <img
          src={Boy}
          alt="Boy"
          className="place-self-center w-14 h-14 rounded-full"
        />
        <div className="text-slate-400">{nameString}</div>
      </div> */}
      {/* <div
        className={`py-2 my-2 rounded-full border-[1px] px-4 ${
          user.status == "pending"
            ? "border-slate-400 text-slate-400"
            : "border-slate-600 text-slate-600"
        }`}
      >
        {nameString}
      </div> */}
    </>
  );
}
