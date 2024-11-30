import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { Edge, Node } from "react-flow-renderer";

interface UseCase {
  nodes: Node[];
  edges: Edge[];
  usecase: number;
}

interface DownloadModalProps {
  onClose: () => void;
  useCases: UseCase[];
}

const ShowModal: React.FC<DownloadModalProps> = ({ onClose, useCases }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 relative h-[calc(100%-2rem)] mr-5 overflow-hidden scrollbar-hide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold font-poppins">Your Use Cases</h1>
          <IoClose
            className="font-bold w-9 h-9 mt-2 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className=" overflow-y-scroll h-full scrollbar-hide">
          {useCases.length > 0 &&
            useCases.map((caseItem) => (
              <div
                key={caseItem.usecase}
                className="bg-white border-2 p-4 rounded-xl my-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="w-[186px] font-semibold">
                      Use Case {caseItem.usecase}
                    </span>
                    <p className="text-gray-400 text-sm">Loprem</p>
                  </div>
                  <div className="text-tertiary text-sm bg-light_blue rounded-xl p-2 px-5">
                    Live
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <button className="border-2 mr-4 rounded-xl p-2 px-7 text-sm mt-2 tracking-wider">
                    Edit Workflow
                  </button>
                  <button className="bg-tertiary text-white rounded-xl p-2 px-7 text-sm mt-2 tracking-wider">
                    Save
                  </button>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShowModal;
