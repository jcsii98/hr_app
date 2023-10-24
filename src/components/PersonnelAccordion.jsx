import { useState, useEffect } from "react";

import Boy from "../assets/boy.png";
import { BsChevronDown } from "react-icons/bs";

import PersonnelThumbnail from "./PersonnelThumbnail";

export default function PersonnelAccordion(props) {
  const { name, apiUrl, personnelFromProps, setPersonnelTab } = props;

  //   state variables
  const [users, setUsers] = useState(personnelFromProps);

  //   page UI states
  const [currentLetter, setCurrentLetter] = useState(null);
  const [preFilteredLength, setPreFilteredLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  let filteredUsers = users;
  if (name === "Verified Personnel") {
    filteredUsers = users.filter((user) => user.status === "approved");
  }

  const uniqueLetters = Array.from(
    new Set(filteredUsers.map((user) => user.last_name[0].toUpperCase()))
  ).sort();

  if (currentLetter) {
    filteredUsers = filteredUsers.filter(
      (user) => user.last_name[0].toUpperCase() === currentLetter
    );
  }

  useEffect(() => {
    setUsers(personnelFromProps);

    const unique = Array.from(
      new Set(personnelFromProps.map((user) => user.last_name[0].toUpperCase()))
    ).sort();

    if (unique[0] && !currentLetter) {
      setCurrentLetter(unique[0]);
    }

    let tempFilteredUsers = personnelFromProps;
    if (name === "Verified Personnel") {
      tempFilteredUsers = personnelFromProps.filter(
        (user) => user.status === "approved"
      );
    }
    setPreFilteredLength(tempFilteredUsers.length);
  }, [personnelFromProps]);

  return (
    <>
      <div className="my-4 bg-white rounded-md p-6" tabIndex="0">
        <div onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center justify-between">
            <div className="text-xl font-black text-slate-400">
              {name} — {preFilteredLength}
            </div>
            <BsChevronDown
              className={`h-6 w-6 transition-all duration-500 text-slate-400 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`transition-all ${
            isOpen
              ? "visible max-h-screen opacity-100"
              : "invisible max-h-0 opacity-0"
          } duration-500`}
        >
          <div className="h-[1rem]"></div>
          <div className="bg-slate-100 rounded-md p-6 flex flex-col items-center">
            <div className="w-full flex justify-start items-center overflow-x-auto overflow-y-hidden">
              {/* {name === "All Personnel" && (
                <div className="cursor-pointer font-medium text-sm flex-shrink-0 flex flex-col justify-center items-center space-y-4">
                  {" "}
                  <div className="hover:bg-slate-400 bg-white rounded-full w-16 h-16 flex justify-center items-center">
                    <img
                      src={Boy}
                      className="place-self-center w-14 h-14 rounded-full"
                    />
                  </div>
                  <div className="">Add</div>
                </div>
              )} */}
              {filteredUsers.map((user) => (
                <PersonnelThumbnail user={user} key={user.id} apiUrl={apiUrl} />
              ))}
            </div>
            <div className="">
              {uniqueLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setCurrentLetter(letter)}
                  className={`font-medium text-sm px-2 ${
                    currentLetter === letter
                      ? "text-slate-400"
                      : "text-slate-300"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
