import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex max-w-screen">
      <Sidebar />
      <div className=" flex flex-col flex-grow ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
