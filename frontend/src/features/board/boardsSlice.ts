import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Board,
  Task,
  AddBoardPayload,
  EditBoardPayload,
  AddTaskPayload,
  EditTaskPayload,
  DragTaskPayload,
  SetBoardisActivePayload,
  SetSubtaskCompletedPayload,
  SetTaskStatusPayload,
  DeleteTaskPayload,
} from "../../api/interface";
import { fetchBoards } from "../../api/boardApi";


// data.boards[0].isActive = true; // set first column to be active
// const initialState: Board[] = data.boards as unknown as Board[];

const boardsSlice = createSlice({
  name: "boards",
  initialState: [] as Board[],
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
        return action.payload;
    });
  },
  reducers: {
    addBoard: (state, action: PayloadAction<AddBoardPayload>) => {
      const isActive = state.length === 0;
      const payload = action.payload;
      const board: Board = {
        name: payload.name,
        isActive,
        columns: payload.newColumns,
      };
      state.push(board);
    },
    editBoard: (state, action: PayloadAction<EditBoardPayload>) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        board.name = payload.name;
        board.columns = payload.newColumns;
      }
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      if (board) {
        state.splice(state.indexOf(board), 1);
      }
    },
    setBoardActive: (state, action: PayloadAction<SetBoardisActivePayload>) => {
      state.forEach((board, index) => {
        board.isActive = index === action.payload.index;
      });
    },
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const {id, title, status, description, subtasks, newColIndex } = action.payload;
      const task: Task = {id, title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      if (board) {
        const column = board.columns[newColIndex];
        if (column) {
          column.tasks.push(task);
        }
      }
    },
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const column = board.columns[prevColIndex];
        const task = column.tasks[taskIndex];
        if (task) {
          task.title = title;
          task.status = status;
          task.description = description;
          task.subtasks = subtasks;
          if (prevColIndex !== newColIndex) {
            column.tasks.splice(taskIndex, 1);
            const newColumn = board.columns[newColIndex];
            if (newColumn) {
              newColumn.tasks.push(task);
            }
          }
        }
      }
    },
    dragTask: (state, action: PayloadAction<DragTaskPayload>) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const prevCol = board.columns[prevColIndex];
        const task = prevCol.tasks.splice(taskIndex, 1)[0];
        if (task) {
          board.columns[colIndex].tasks.push(task);
        }
      }
    },
    setSubtaskCompleted: (state, action: PayloadAction<SetSubtaskCompletedPayload>) => {
      const { colIndex, taskIndex, index } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[colIndex];
        const task = col.tasks[taskIndex];
        const subtask = task.subtasks[index];
        if (subtask) {
          subtask.isCompleted = !subtask.isCompleted;
        }
      }
    },
    setTaskStatus: (state, action: PayloadAction<SetTaskStatusPayload>) => {
      const { colIndex, newColIndex, taskIndex, status } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[colIndex];
        const task = col.tasks[taskIndex];
        if (task) {
          task.status = status;
          if (colIndex !== newColIndex) {
            col.tasks.splice(taskIndex, 1);
            const newCol = board.columns[newColIndex];
            if (newCol) {
              newCol.tasks.push(task);
            }
          }
        }
      }
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const { colIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        const col = board.columns[colIndex];
        if (col) {
          col.tasks.splice(taskIndex, 1);
        }
      }
    },
  },
});

// Export the actions and reducer
export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
