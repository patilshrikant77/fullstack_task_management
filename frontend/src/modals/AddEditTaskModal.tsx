import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { RootState } from "../redux/store";
import { AddEditTaskModalProps, Board, Subtask, Task} from "../api/interface";
import { addTask, editTask } from "../features/board/boardsSlice";
import { createTask, updateTask } from "../api/boardApi";


const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex = 0,
  prevColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: uuidv4(), title: '', isCompleted: false },
    { id: uuidv4(), title: '', isCompleted: false },
  ]);

  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((board: Board) => board.isActive);
  const columns = board?.columns || [];
  const col = columns[prevColIndex];
  const task = col?.tasks[taskIndex];

  const onChangeSubtasks = (id: string, newValue: string) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      if (subtask) {
        subtask.title = newValue;
      }
      return newState;
    });
  };

  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = (): boolean => {
    if (!title.trim()) {
      setIsValid(false);
      return false;
    }
    if(subtasks) {
      for (const subtask of subtasks) {
        if (!subtask.title.trim()) {
          setIsValid(false);
          return false;
        }
      }
    }

    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad && task) {
    if (task.subtasks) {
      setSubtasks(task.subtasks?.map((subtask) => ({
        ...subtask,
        id: uuidv4(),
      })));
    }

    setTitle(task.title);
    setDescription(task.description);
    setStatus(columns[prevColIndex]?.name || "");
    setIsFirstLoad(false);
  }

  const onDelete = (id: string) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = async (type: "add" | "edit") => {
    const subTasksPayload = (subtasks ?? []).map(({id, ...rest }) => rest);
        const apiPayload = {
          columnId: columns[newColIndex].id as string,
          boardId: board?.id as string,
          title: title,
          status: columns[newColIndex].name,
          description: description,
          subtasks: subTasksPayload,
        }
    if (type === "add") {

      try {
        //Call the Update API
       const createdTaskResp:{stauts:boolean, message:string; data:Task} = await createTask(apiPayload);
        dispatch(
          addTask({
            ...createdTaskResp.data,
            newColIndex,
          })
         );
          // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            // Handle error
     }
     
    } else {
      try {
         //Call the Update API
        const updatedTaskResp:{stauts:boolean, message:string; data:Task} = await updateTask(task.id as string, apiPayload);
         dispatch(
          editTask({
            ...updatedTaskResp.data,
            prevColIndex,
            newColIndex,
            taskIndex: 0
          })
         );
           // Handle success (e.g., show a success message, redirect, etc.)
         } catch (error) {
             // Handle error
      }
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 dropdown"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 dropdown"
      }
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>

          {subtasks?.map((subtask, index) => (
            <div key={subtask.id} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className="bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                placeholder="e.g Take coffee break"
              />
              <img
                alt ="remove subtask"
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}

          <button
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current Status */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
               validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                if (type === "edit") {
                  setIsTaskModalOpen(false);
                }
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
