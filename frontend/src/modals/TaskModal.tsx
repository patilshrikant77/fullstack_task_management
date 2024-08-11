import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import { RootState } from "../redux/store"; // Adjust this import according to your project structure
import { setTaskStatus, deleteTask } from "../features/board/boardsSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import { Board, Column, TaskModalProps } from "../api/interface";
import { removeTask, updateTask } from "../api/boardApi";


const TaskModal: React.FC<TaskModalProps> = ({ taskIndex, colIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);

  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((board: Board) => board.isActive);
  const columns = board?.columns;
  const col = columns?.[colIndex];
  const task = col?.tasks[taskIndex];
  const subtasks = task?.subtasks || [];

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState<string>(task?.status || "");
  const [newColIndex, setNewColIndex] = useState<number>(columns?.indexOf(col || ({} as Column)) || 0);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    const apiPayload = {
      columnId: columns?.[newColIndex]?.id as string,
      boardId: board?.id as string,
      title: task?.title ?? "",
      status: status,
      description: task?.description ?? "",
      subtasks: task?.subtasks ?? [],
    }
    const taskId = task?.id  as string
    await updateTask(taskId, apiPayload);

    dispatch(setTaskStatus({
      taskIndex,
      colIndex,
      newColIndex,
      status,
    }));
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === "Delete") {
      // api call
      const taskID = task?.id;
      await removeTask(taskID as string);

      dispatch(deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* MODAL SECTION */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task?.title}</h1>

          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task?.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* Subtasks Section */}
        <div className="mt-3 space-y-2">
          {subtasks.map((subtask,index) => (
            <Subtask
              key={subtask.id}
              index={index} // Ensure SubtaskProps has `index` defined
              taskIndex={taskIndex}
              colIndex={colIndex}
            />
          ))}
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns?.map((col,index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
                  onDeleteBtnClick={onDeleteBtnClick}
                  type="task"
                  title={task?.title || ""} 
                  setIsDeleteModalOpen={function (value: React.SetStateAction<boolean>): void {
                      throw new Error("Function not implemented.");
                  } }        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTaskModal
                  setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                  setIsTaskModalOpen={setIsTaskModalOpen}
                  type="edit"
                  taskIndex={taskIndex}
                  prevColIndex={colIndex} device={"mobile"}        />
      )}
    </div>
  );
};

export default TaskModal;
