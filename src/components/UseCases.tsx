import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
  Position,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import Modal from "./Modal";
import ShowModal from "./ShowSavedCases";
import { Box, ChevronDown, CirclePlus, CornerUpRight } from "lucide-react";

// Custom node component with handles
const UseCaseNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="bg-white p-4 border-2 border-blue-300 rounded-lg shadow-md w-48 relative">
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-3 !h-3 !bg-tertiary !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !bg-tertiary !border-2 !border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-3 !h-3 !bg-tertiary !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-3 !h-3 !bg-tertiary !border-2 !border-white"
      />

      {/* Node Content */}
      <div className="flex flex-col items-start">
        <div className="flex items-center font-semibold">
          <Box className="w-4 h-4 mr-2" />
          {data.label}
        </div>
        <p className="text-gray-500 mt-1">Property</p>
      </div>
    </div>
  );
};

// Node types
const nodeTypes = {
  useCase: UseCaseNode,
};

interface UseCase {
  nodes: Node[];
  edges: Edge[];
  usecase: number;
}

const UseCasesFlow = () => {
  // Initial nodes and edges
  const initialNodes: Node[] = [
    {
      id: "1",
      position: { x: 400, y: 100 },
      type: "useCase",
      data: { label: "Component A" },
      draggable: true,
    },
  ];

  const initialEdges: Edge[] = [];

  // State management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedComponent, setSelectedComponent] = useState<number | null>(
    null
  );
  const [selectedChildComp, setSelectedChildComp] = useState<number | null>(
    null
  );
  const [ShowselectedChildComp, SetShowSelectedChildComp] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [showCases, setShowCases] = useState(false);
  const [undoStack, setUndoStack] = useState<Edge[][]>([]); // Undo stack

  // Keydown listener for Ctrl + Z
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        if (undoStack.length > 0) {
          const lastEdges = undoStack[undoStack.length - 1];
          setUndoStack((prevStack) => prevStack.slice(0, -1));
          setEdges(lastEdges); // Restore edges to the last state
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undoStack]);

  // Connection handler
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setUndoStack((prevStack) => [...prevStack, edges]); // Save current edges to the stack
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: { stroke: "rgba(0, 155, 255, 1)" },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );
  // Component click handlers
  const handleComponentClick = (id: number) => {
    setSelectedComponent((prev) => (prev === id ? null : id));
  };

  const handleComponentChildClick = (id: number) => {
    setSelectedChildComp((prev) => (prev === id ? null : id));
  };

  // Create new use component
  const handleCreateNewUseComponent = (letter: string) => {
    SetShowSelectedChildComp(letter);
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "useCase",
      data: { label: `Component ${letter}` },
      position: { x: 500, y: 400 },
      draggable: true,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // Save use case
  const handleSaveUseCase = () => {
    setUseCases((prevUseCases) => [
      ...prevUseCases,
      { nodes, edges, usecase: useCases.length + 1 },
    ]);
    setShowModal(true);
  };

  // Show use case
  const handleShowUseCase = (id: number) => {
    setNodes(useCases[id - 1].nodes);
    setEdges(useCases[id - 1].edges);
    setShowCases(false);
  };

  // Create new use case
  const handleCreateNewUseCase = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    SetShowSelectedChildComp(null);
  };

  return (
    <div className="relative w-full h-[500px]">
      <div
        className="absolute inset-0 border border-light-gray rounded-lg"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(236, 236, 236, 1) 1px, transparent 1px)`,
          backgroundSize: "10px 10px",
        }}
      >
        {showModal && (
          <Modal open={showModal}>
            <ShowModal
              onClose={() => setShowModal(false)}
              useCases={useCases}
            />
          </Modal>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-3 z-10 h-full">
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCreateNewUseCase}
                className="font-bold z-30 flex gap-6 items-center bg-white rounded-lg border border-light-gray p-3 shadow-md"
              >
                Create New Use Case <CirclePlus className="text-tertiary" />
              </button>
              <button className="cursor-default w-[300px] text-sm text-nowrap flex justify-between items-center bg-white rounded-lg border border-light-gray p-4 shadow-md">
                <span className="text-tertiary font-semibold mr-4">
                  Use Case : Use Case 1
                </span>
                <CornerUpRight className="font-bold w-5 h-5 text-black" />
                <span className="text-xs font-thin ml-2">
                  {edges.length} Connections
                </span>
              </button>
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => setShowCases(!showCases)}
                className="font-bold flex gap-6 items-center bg-white rounded-lg border border-light-gray p-3 shadow-lg"
              >
                Your Use Cases <ChevronDown />
              </button>

              <div className="flex flex-col absolute gap-1 z-30 mt-14">
                {useCases.length > 0 &&
                  showCases === true &&
                  useCases.map((caseItem) => (
                    <span
                      key={caseItem.usecase}
                      className="w-[186px] p-2 font-semibold bg-white border-2 rounded-lg cursor-pointer"
                      onClick={() => handleShowUseCase(caseItem.usecase)}
                    >
                      Use Case {caseItem.usecase}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="w-[307px] overflow-scroll scrollbar-hide text-sm text-nowrap flex flex-col justify-between font-bold bg-white rounded-lg border border-light-gray p-3 shadow-lg h-full mb-6">
            {Array.from({ length: 6 }).map((_, index) => {
              const componentId = index + 1;
              return (
                <div
                  key={componentId}
                  className="flex flex-col bg-primary p-2 py-3 gap-3 bg-light-gray rounded-lg r mb-2"
                  onClick={() => handleComponentClick(componentId)}
                >
                  <div className="flex justify-between items-center font-bold font-poppins">
                    <span>Component {componentId}</span>
                    <ChevronDown className="w-5 h-5 mr-2" />
                  </div>

                  {selectedComponent === componentId && (
                    <div className="flex flex-col gap-3">
                      {["A", "B", "C"].map((letter) => (
                        <div
                          key={letter}
                          onClick={() => handleCreateNewUseComponent(letter)}
                          className="text-sm flex gap-3 items-center cursor-pointer text-gray-700 p-2 bg-white border-light-gray rounded-lg"
                        >
                          <Box className="w-4 h-4" /> Component {letter}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {ShowselectedChildComp !== null && (
          <div className="absolute right-0 w-[307px] overflow-scroll mt-3 mr-3 scrollbar-hide text-sm text-nowrap flex flex-col justify-between font-bold bg-white rounded-lg border border-light-gray p-3 pb-2 shadow-lg h-fit z-30">
            <h3 className="flex items-center gap-2 text-xl mb-5">
              <Box /> Component {ShowselectedChildComp}
            </h3>
            {Array.from({ length: 4 }).map((_, index) => {
              const componentId = index + 1;
              return (
                <div
                  key={componentId}
                  className={`flex flex-col border-light-gray border-2 p-2 py-3 gap-3 bg-light-gray rounded-lg r mb-2 ${
                    selectedChildComp === componentId
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                  onClick={() => handleComponentChildClick(componentId)}
                >
                  <div className="flex justify-between items-center font-bold font-poppins">
                    <span>Property {componentId}</span>
                    <ChevronDown
                      className={`w-5 h-5 mr-2 ${
                        selectedChildComp === componentId ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {selectedChildComp === componentId && (
                    <div className="flex flex-col gap-3">
                      {["A", "B", "C"].map((comp) => (
                        <div
                          key={comp}
                          className="text-sm flex gap-3 items-center cursor-pointer text-gray-700 p-2 border-light-gray rounded-lg"
                        >
                          <Box className="w-4 h-4" /> Component {comp}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="absolute bottom-7 right-2 z-10">
          <button
            onClick={handleSaveUseCase}
            className="font-semibold ml-[54px] mb-2 flex gap-6 items-center bg-tertiary text-white rounded-lg border border-light-gray p-3 shadow-lg"
          >
            Save Use Case
          </button>
          <button className="font-semibold flex gap-6 items-center bg-second_blue text-white rounded-lg border border-light-gray p-3 shadow-lg">
            Add Use Case to Home
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="absolute inset-0"
          fitView
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

const UseCases = () => {
  return (
    <div className=" relative">
      <ReactFlowProvider>
        <Controls
          style={{
            position: "absolute",
            bottom: "0",
            left: "314px",
            zIndex: 100,
            padding: "8px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <UseCasesFlow />
      </ReactFlowProvider>
    </div>
  );
};

export default UseCases;
