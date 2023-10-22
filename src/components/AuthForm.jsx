import { useState } from "react";
import axios from "axios";

export default function AuthForm(props) {
  const { apiUrl, setIsLoggedIn, setUserData, userData } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Logging in");
    setError(""); // Clear any previous errors

    setIsLoggedIn(true);
    // Hardcode the data for development purposes
    const hardcodedDataAdmin = {
      email: "jose1@email.com",
      provider: "email",
      uid: "jose1@email.com",
      id: 2,
      allow_password_change: false,
      kind: "admin",
      full_name: "jose1@email.com",
      profile_picture: null,
      personal_rate: null,
      birthday: null,
      status: "pending",
    };

    const hardcodedDataUser = {
      email: "user1@email.com",
      provider: "email",
      uid: "user1@email.com",
      id: 1,
      allow_password_change: false,
      kind: "user",
      full_name: "user1@email.com",
      profile_picture: null,
      personal_rate: 150,
      birthday: "1998-07-07",
      status: "approved",
    };

    setUserData(hardcodedDataUser);
    // try {
    //   const response = await axios.post(`${apiUrl}/auth/sign_in`, formData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     const data = response.data;
    //     console.log(data);
    //     setUserData(data.data);
    //     setIsLoggedIn(true);
    //     // Handle successful sign-in, e.g., update state or navigate to a new page.
    //   } else {
    //     console.error("Error during sign in:", response.data.error);
    //     setMessage(""); // Clear any previous messages
    //     setError(response.data.errors[0]);
    //   }
    // } catch (error) {
    //   console.error("Error during sign in:", error);
    //   setMessage(""); // Clear any previous messages
    //   if (error.response && error.response.data && error.response.data.errors) {
    //     setError(error.response.data.errors[0]); // Set the error from the network response
    //   } else {
    //     setError("An error occurred. Please try again."); // Set a generic error message
    //   }
    // }
  };

  return (
    <>
      <div className="">
        <div className="font-bold text-slate-400 text-3xl pb-4">Login</div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="">
            <div className="font-medium text-slate-400">Email</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-4 px-4"
            ></input>
          </div>
          <div className="">
            <div className="font-medium text-slate-400">Password</div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-4 px-4"
            ></input>
          </div>
          <div className="text-white font-medium">
            {message && <p className="text-slate-400">{message}</p>}
            {error && <p className="text-red-400">{error}</p>}
            <button
              className="w-full py-4 bg-slate-400 rounded-md"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
