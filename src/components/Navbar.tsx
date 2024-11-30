import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full p-6 bg-primary h-[94px] flex justify-between items-center border-l border-light-gray">
      <div className="right flex items-center justify-between flex-grow">
        <h2 className="font-poppins font-semibold text-[25.7px] text-nowrap mr-12">
          Dôjo Factory
        </h2>
        <div className="flex items-center bg-white text-gray-400 border-[1.74px] border-light-gray rounded-lg">
          <Search className="text-inherit mr-2 ml-6" />
          <input
            type="text"
            className="w-[437px] h-[46px] bg-transparent outline-none font-bold font-inter"
            placeholder="search"
          />
        </div>
        <div className=" flex items-center gap-4">
          <img
            src="../../public/images/Vector.png"
            alt="bell"
            className=" w-[24px] h-[24px]"
          />
          <img
            src={"../../public/images/online.png"}
            alt="online"
            className=" w-[40px] h-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
