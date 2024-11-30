import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import UseCases from "../components/UseCases";

const Dojo: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>("bg-blue");
  const sectorsRef = useRef<HTMLUListElement | null>(null); // Ref to the sectors container
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const handleSelectedColor = (type: string): void => {
    if (type === "toggle") {
      if (selectedSector === "bg-blue") {
        setSelectedSector("bg-second_blue");
      } else {
        setSelectedSector("bg-blue");
      }
    } else {
      setSelectedSector("bg-second_blue");
    }
  };

  // Scroll the sectors container left or right
  const scrollSectors = (direction: "left" | "right"): void => {
    if (sectorsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200; // Adjust the scroll amount as needed
      sectorsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Check if the container can scroll left or right
  useEffect(() => {
    const checkScrollPosition = (): void => {
      if (sectorsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sectorsRef.current;
        setCanScrollLeft(scrollLeft > 0); // Can scroll left if scrollLeft > 0
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth); // Can scroll right if not at the end
      }
    };

    // Initial check
    checkScrollPosition();

    // Event listener for scroll event to check scroll position
    if (sectorsRef.current) {
      sectorsRef.current.addEventListener("scroll", checkScrollPosition);
    }

    // Cleanup event listener
    return () => {
      if (sectorsRef.current) {
        sectorsRef.current.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <section className="p-6 w-[calc(100vw-342px)]">
      <div className="bg-primary rounded-xl w-full p-3">
        <h1 className="font-poppins font-semibold text-2xl">
          Welcome to the Dôjo Factory
        </h1>
        <p className="text-gray-400">
          The factory of building or optimizing use cases
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <div>
          <div className="font-poppins">Pre Defined Use Cases</div>
          <p className="text-gray-400">
            You can directly leverage or optimize.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center bg-white text-gray-400 border-[1.74px] border-light-gray rounded-lg">
            <Search className="text-inherit mr-2 ml-6" />
            <input
              type="text"
              className="w-[280px] h-[40px] bg-transparent outline-none font-bold font-inter"
              placeholder="search"
            />
          </div>
          <button
            onClick={() => handleSelectedColor("toggle")}
            className={`${selectedSector} cursor-pointer tracking-wide text-white font-semibold text-[14px] rounded-lg p-2`}
          >
            Optimize Use Case
          </button>
          <button className="bg-second_blue cursor-pointer tracking-wide text-white font-semibold text-[14px] rounded-lg p-2">
            Add Use Case to Home
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 relative">
        {canScrollLeft && (
          <FaChevronCircleRight
            className="cursor-pointer rotate-180 text-white bg-black rounded-full font-extrabold w-8 h-8 absolute -left-3 top-1/2 -translate-y-1/2 mt-2"
            onClick={() => scrollSectors("left")}
          />
        )}
        <ul
          ref={sectorsRef}
          className="mt-4 flex list-none gap-2 text-nowrap overflow-hidden overflow-x-auto scrollbar-hide"
        >
          {[...Array(15)].map((_, index) => (
            <li
              key={index}
              className="p-3 pb-5 rounded-xl cursor-pointer w-[164px] h-[75px] bg-light_blue border border-light-gray shrink-0"
              onClick={() => handleSelectedColor("sector")}
            >
              <h2 className="font-bold">Sector {index + 1}</h2>
              <p>Custom Name</p>
            </li>
          ))}
        </ul>
        {canScrollRight && (
          <FaChevronCircleRight
            className="cursor-pointer text-white bg-black rounded-full font-extrabold w-8 h-8 absolute -right-2 top-1/2 -translate-y-1/2 mt-2"
            onClick={() => scrollSectors("right")}
          />
        )}
      </div>
      <h1 className="my-3 font-bold text-[16px] font-poppins">
        Create and Optimize Use Cases
      </h1>
      <UseCases />
    </section>
  );
};

export default Dojo;
