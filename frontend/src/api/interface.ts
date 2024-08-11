export interface LoginResponse {
    statusCode: number;
    message: string;
    token: string;
    refreshToken: string;
    expirationTime: string;
    role: string;
  }

// Define the types for your entities based on the data structure

export interface Subtask {
  id:string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id:string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: string;
}

export interface Column {
  id: string | null;
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  isActive: boolean;
  columns: Column[];
  id?:string;
}


// Define types for action payloads

export interface AddBoardPayload {
  name: string;
  newColumns: Column[];
}

export interface EditBoardPayload {
  name: string;
  newColumns: Column[];
}

export interface AddTaskPayload {
  id:string;
  title: string;
  status: string;
  description: string;
  subtasks: Subtask[];
  newColIndex: number;
}

export interface EditTaskPayload {
  title: string;
  status: string;
  description: string;
  subtasks: Subtask[];
  prevColIndex: number;
  newColIndex: number;
  taskIndex: number;
}

export interface DragTaskPayload {
  colIndex: number;
  prevColIndex: number;
  taskIndex: number;
}

export interface SetSubtaskCompletedPayload {
  colIndex: number;
  taskIndex: number;
  index: number;
}

export interface SetTaskStatusPayload {
  colIndex: number;
  newColIndex: number;
  taskIndex: number;
  status: string;
}

export interface DeleteTaskPayload {
  colIndex: number;
  taskIndex: number;
}

export interface SetBoardisActivePayload {
  index: number;
}


// columns tsx
export interface ColumnProps {
  colIndex: number;
}

export interface DragTaskPayload {
  colIndex: number;
  prevColIndex: number;
  taskIndex: number;
}


export interface SidebarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boards: Board[]; // Assuming `Board` is the type of a board
  onBoardClick: (index: number) => void;
}

export interface SubtaskProps {
  index: number;
  taskIndex: number;
  colIndex: number;
}


// Assuming these types are in ../api/interface.ts or another appropriate file
export interface TaskProps {
  colIndex: number;
  taskIndex: number;
}


export interface RootState {
  boards: Board[];
  auth:AuthState;
}


export interface BoardType {
  isActive: boolean;
  columns: Column[];
}


export interface TaskModalProps {
  taskIndex: number;
  colIndex: number;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface AddEditTaskModalProps {
  type: "add" | "edit";
  device: "mobile" | "desktop";
  setIsTaskModalOpen: (isOpen: boolean) => void;
  setIsAddTaskModalOpen: (isOpen: boolean) => void;
  taskIndex?: number;
  prevColIndex?: number;
}


export interface DeleteModalProps {
  type: "task" | "group"; // Define the type of the entity being deleted
  title: string;
  onDeleteBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AuthState {
  token:string;
}

export interface BoardsState {
  boards: Board[];
}


// API Payloads
export interface APIColumn {
  name:string, tasks:Task[];
}

export interface addBoardAPIPayload {
  name: string;
  isActive: boolean;
  columns: APIColumn[];
}

export interface APISubTask {
  title:string;  isCompleted: boolean;
}



export interface UpdateTaskAPIPayload {
  columnId:string;
  boardId: string;
  title: string;
  status: string;
  description: string;
  subtasks: APISubTask[];
}

export type CreateTaskAPIPayload = UpdateTaskAPIPayload;