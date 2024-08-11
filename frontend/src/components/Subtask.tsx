import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Import RootState from your store configuration
import { SubtaskProps } from "../api/interface";
import { setSubtaskCompleted } from "../features/board/boardsSlice";



const Subtask: React.FC<SubtaskProps> = ({ index, taskIndex, colIndex }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find(board => board.isActive === true);
  const col = board?.columns[colIndex];
  const task = col?.tasks[taskIndex];
  const subtask = task?.subtasks[index];

  const checked = subtask?.isCompleted || false;

  const onChange = () => {
    if (subtask) {
      dispatch(
         setSubtaskCompleted({ 
          index,
          taskIndex,
          colIndex,
        })
      );
    }
  };

  return (
    <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
      <input
        className="w-4 h-4 accent-[#635fc7] cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked ? "line-through opacity-30" : ""}>
        {subtask?.title}
      </p>
    </div>
  );
};

export default Subtask;
