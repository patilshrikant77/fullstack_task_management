
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axios';
import { Board, CreateTaskAPIPayload, UpdateTaskAPIPayload, addBoardAPIPayload } from './interface';

//boards
export const fetchBoards = createAsyncThunk<Board[]>('boards/fetchBoards', async () => {
    const response = await axiosInstance.get('/api/boards');
    const boards: Board[] = response.data.data;
    // Logic to set the first column of each board as active
    boards[0].isActive = true;
    return boards;
  });


export const updateSelectedBoardColumn = async (id: string, apiPayload: Board) => {
    try {
        const response = await axiosInstance.put(`api/boards/update/${id}`, apiPayload);
        return response.data;
    } catch (error) {
        
        console.error("Error updating column:", error);
        throw error;
    }
};


export const addNewBoardColumn = async (apiPayload: addBoardAPIPayload) => {
    try {
        const response = await axiosInstance.post(`api/boards/add`, apiPayload);
        return response.data;
    } catch (error) {
        console.error("Error updating column:", error);
        throw error;
    }
};



//Task

export const createTask = async (apiPayload: CreateTaskAPIPayload) => {
    try {
        const response = await axiosInstance.post(`api/tasks/add`, apiPayload);
        return response.data;
    } catch (error) {
        console.error("Error updating Task:", error);
        throw error;
    }
};

export const updateTask = async (taskId:string, apiPayload: UpdateTaskAPIPayload) => {
    try {
        const response = await axiosInstance.put(`api/tasks/update/${taskId}`, apiPayload);
        return response.data;
    } catch (error) {
        console.error("Error updating Task:", error);
        throw error;
    }
};


export const removeTask = async (taskId:string) => {
    try {
        const response = await axiosInstance.post(`api/tasks/delete/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error delete Task:", error);
        throw error;
    }
};


