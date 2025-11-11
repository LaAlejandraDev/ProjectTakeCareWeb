import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    messages.map((item, index) => {
      toast(item)
    messages.reduce()
    })
  }, [messages])

  return (
    <>
      <Navigate to={"/index/forum"} />
      <ToastContainer />
      <div className="w-screen h-screen flex bg-base-200">
        <div className="flex p-2 w-50">
          <Menu />
        </div>
        <div className="flex-grow overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
