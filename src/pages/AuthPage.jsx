import AuthForm from "../components/AuthForm";

export default function AuthPage(props) {
  const { apiUrl, setIsLoggedIn, setUserData, userData } = props;
  return (
    <>
      <div className="w-full flex items-center justify-center my-[80px]">
        <div className="w-20 h-20 rounded-full bg-slate-400"></div>
      </div>
      <AuthForm
        userData={userData}
        setUserData={setUserData}
        apiUrl={apiUrl}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}
