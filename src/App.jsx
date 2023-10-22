import { useState } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import DashPage from "./pages/DashPage";
function App() {
  const apiUrl = "http://localhost:3000";
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userData, setUserData] = useState();
  return (
    <>
      <div className="w-full h-full py-8 px-6 flex flex-col">
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
    </>
  );
}

export default App;
