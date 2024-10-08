import React from "react";

// Define the props type for the ElipsisMenu component
interface ElipsisMenuProps {
  type: "Boards" | "Task"; // Adjust the types as needed based on what 'type' can be
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

const ElipsisMenu: React.FC<ElipsisMenuProps> = ({
  type,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <div
      className={
        type === "Boards"
          ? "absolute top-16 right-5"
          : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElipsisMenu;
