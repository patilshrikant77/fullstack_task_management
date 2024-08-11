import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { dragTask } from "../features/board/boardsSlice"; // Updated import path
import Task from "./Task";
import { ColumnProps, Column as ColumnType, DragTaskPayload, Task as TaskType } from "../api/interface"; // Update path as necessary
import { updateTask } from "../api/boardApi";

const Column: React.FC<ColumnProps> = ({ colIndex }) => {


  const dispatch: AppDispatch = useDispatch();
  const [color, setColor] = useState<string | null>(null);
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col: ColumnType | undefined = board?.columns[colIndex];

  useEffect(() => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-sky-500",
    ];

    setColor(shuffle(colors).pop() || null);
  }, [color, dispatch]);

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>, targetColToDrop: ColumnType) => {
    e.preventDefault();
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    ) as DragTaskPayload;

  
    const col = board?.columns?.find((_, i) => i === prevColIndex);
    const task = col?.tasks.find((_, i) => i === taskIndex);

    const apiPayload = {
      columnId: targetColToDrop.id as string,
      boardId: board?.id as string,
      title: task?.title ?? "",
      status: targetColToDrop.name as string,
      description: task?.description ?? "",
      subtasks: task?.subtasks ?? []
    }

   const taskId = task?.id  as string
   await updateTask(taskId, apiPayload);

    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      key={col?.id}
      onDrop={(e) => handleOnDrop(e, col as ColumnType)}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} >&nbsp;</div>
        {col?.name} ({col?.tasks.length || 0})
      </div>

      {col?.tasks.map((task: TaskType, index: number) => (
        <Task key={index} taskIndex={index} colIndex={colIndex}  />
      ))}
    </div>
  );
};

export default Column;

