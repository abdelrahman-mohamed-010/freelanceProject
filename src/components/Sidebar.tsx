import {
  ChartNoAxesColumn,
  CircleArrowUp,
  Headphones,
  House,
  LayoutGrid,
  LogOut,
  Package,
  PanelRight,
  SquarePen,
  UserPlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="max-xl:fixed top-0 left-0 bg-primary w-[318px] min-h-screen px-2 py-6">
      <div className="py-2 px-4 h-full flex flex-col justify-between ">
        <div className="flex-grow">
          <header className="flex justify-between items-center w-full">
            <img src={"../../public/images/Frame 6415 (1).png"} alt="logo" />
            <PanelRight className="text-secondary cursor-pointer" />
          </header>
          <hr className="border-[rgba(236, 236, 236, 1)] w-[270px] my-5" />
          <div className="flex gap-3 items-center p-2 bg-white rounded-lg border border-light-gray">
            <img
              src={"../../public/images/Avatar.png"}
              className="w-[42px] h-[42px]"
              alt="avatar"
            />
            <div>
              <h3 className="text-tertiary text-lg font-[700] font-poppins">
                Olivia Rhye
              </h3>
              <p className="text-[10px]">olivia@untitledui.com</p>
            </div>
          </div>
          <nav>
            <h3 className="text-[rgba(0, 0, 0, 0.48)] font-[600] text-sm my-[19.54px]">
              Action
            </h3>
            <ul className="list-none flex flex-col">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <House />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/Dojo"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <Package />
                  Dôjo Factory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dsde"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <LayoutGrid />
                  App & API
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/awd"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <ChartNoAxesColumn />
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/Dsd"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <SquarePen />
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/Dds"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <UserPlus />
                  Dojo Colleagues
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/sw"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <CircleArrowUp />
                  Upgrade Plan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/s"}
                  className={({ isActive }) =>
                    `flex gap-3 items-center font-semibold rounded-lg p-4 ${
                      isActive === true ? " bg-tertiary text-white" : ""
                    }`
                  }
                >
                  <Headphones />
                  Help Center
                </NavLink>
              </li>
            </ul>
          </nav>
          <hr className="border-[rgba(236, 236, 236, 1)] w-[270px] my-5" />
        </div>
        <div className="flex font-semibold gap-4 py-2">
          <LogOut className="text-tertiary" />
          Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
