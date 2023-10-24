import { useState } from "react";
import axios from "axios";

export default function ProjectForm(props) {
  const { setProjectTab, apiUrl, fetchAllProjects } = props;

  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    const url = `${apiUrl}/sites`;

    try {
      const response = await axios.post(`${url}`, formData, { headers });
      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = response.data;
        console.log(data);
        fetchAllProjects();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div
          onClick={() => setProjectTab("Home")}
          className="text-3xl font-black text-slate-600"
        >
          {"<"} Add Project
        </div>
        <div className="bg-white p-6 rounded-md">
          <form onSubmit={handleSubmit}>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">
                Project Name
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormInputChange}
                className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
              ></input>
            </div>
            <div className="pb-4">
              <div className="font-medium pb-2 text-slate-700">
                Status (can be changed afterwards)
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  onChange={handleFormInputChange}
                  className="focus:outline-none focus:border-slate-600 mr-2"
                  id="activeStatus" // for associating label
                />
                <label htmlFor="activeStatus" className="text-slate-700">
                  Active
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  onChange={handleFormInputChange}
                  className="focus:outline-none focus:border-slate-600 mr-2"
                  id="hiddenStatus" // for associating label
                />
                <label htmlFor="hiddenStatus" className="text-slate-700">
                  Hidden
                </label>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="text-2xl font-black text-slate-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
