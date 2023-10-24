import { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

import AuthPage from "./pages/AuthPage";
import DashPage from "./pages/DashPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl);

  // ui states
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // variables
  const [userData, setUserData] = useState();
  const [headers, setHeaders] = useState(); // NOTE: this is unused currently

  const rememberMe = async () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");

    if (uid && client && accessToken) {
      try {
        const response = await axios.get(`${apiUrl}/remember_me`, {
          headers: {
            uid: uid,
            client: client,
            "access-token": accessToken,
          },
        });

        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          setUserData(responseData);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          const errorData = response.data;
          console.warn("Unexpected response:", response); // Added this line
          console.log(errorData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error with rememberMe:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    rememberMe();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="h-full w-full px-6 py-8 flex flex-col">
          {isLoggedIn ? (
            <DashPage
              userData={userData}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              apiUrl={apiUrl}
            />
          ) : (
            <AuthPage
              userData={userData}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              apiUrl={apiUrl}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
