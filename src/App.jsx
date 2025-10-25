import "./App.css";
import Menu from "./components/Menu";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navigate to={"/index/forum"} />
      <div className="w-screen h-screen flex bg-base-200">
        <div className="flex p-4">
          <Menu />
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
