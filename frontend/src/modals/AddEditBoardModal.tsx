import React, { useState, useEffect } from "react";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addBoard, editBoard } from "../features/board/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addNewBoardColumn, updateSelectedBoardColumn } from "../api/boardApi";
import { Column } from "../api/interface";

// Define the type for props
interface AddEditBoardModalProps {
  setIsBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "add" | "edit";
}

const AddEditBoardModal: React.FC<AddEditBoardModalProps> = ({
  setIsBoardModalOpen,
  type,
}) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState<Column[]>([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4()},
    { name: "Done", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state: RootState) =>  state.boards.find(board => board.isActive));

  useEffect(() => {
    if (type === "edit" && isFirstLoad && board) {
      setNewColumns(
        board.columns.map(col => ({ ...col}))
      );
      setName(board.name);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, board]);

  const validate = (): boolean => {
    const isValid = !!name.trim() && newColumns.every(col => !!col.name.trim());
    setIsValid(isValid);
    return isValid;
  };

  const onChange = (id: string | null, newValue: string) => {
    setNewColumns(prevState => {
      const newState = prevState.map(col => 
        col.id === id ? { ...col, name: newValue } : col
      );
      return newState;
    });
  };

  const onDelete = (id: string | null) => {
    setNewColumns(prevState => prevState?.filter(el => el.id !== id));
  };

  const onSubmit = async () => {
    if (validate()) {
      setIsBoardModalOpen(false); 
      if (type === "add") {
         // here need to call api
          try {
             const addColumns = newColumns.map(({id, ...rest }) => rest);
                await addNewBoardColumn({ name, isActive:false, columns:addColumns });
                dispatch(addBoard({ name, newColumns }));
                // Handle success (e.g., show a success message, redirect, etc.)
              } catch (error) {
                  // Handle error
              }
          
      } else {

         // here need to call api
         if(board) {
          try {
              await updateSelectedBoardColumn(board.id as string, { name, isActive:board.isActive, columns:newColumns });
                // Handle success (e.g., show a success message, redirect, etc.)
                dispatch(editBoard({ name, newColumns }));
              } catch (error) {
                  // Handle error
              }
          }
      }
    }
  };

  return (
    <div
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white  text-black  font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Group
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm  text-gray-500">
            Group Name
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm  text-gray-500">
            Group Columns
          </label>
          {newColumns.map((column) => (
            <div key={column.id} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                onChange={(e) => onChange(column.id, e.target.value)}
                type="text"
                value={column.name}
              />
              <img
                src={crossIcon}
                onClick={() => onDelete(column.id)}
                className="m-4 cursor-pointer"
                alt="Delete"
              />
            </div>
          ))}
          <div>
            <button
              className="w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: null},
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={onSubmit}
              className="w-full items-center hover:opacity-70  dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBoardModal;
