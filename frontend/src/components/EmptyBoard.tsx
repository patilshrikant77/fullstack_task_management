import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

// Define the type for props
interface EmptyBoardProps {
  type: "edit" | "add";
}

const EmptyBoard: React.FC<EmptyBoardProps> = ({ type }) => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold">
        {type === "edit"
          ? "This Board is empty. Create a new column to get started."
          : "There are no Boards available. Create a new Board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
};

export default EmptyBoard;
