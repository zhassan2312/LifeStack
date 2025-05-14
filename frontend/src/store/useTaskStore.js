import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const BASE_URL = 'http://localhost:5000/api/task';

export const useTaskStore = create((set, get) => ({
    todoList: [],
    completedTaskNumberToday: 0,
    totalTaskNumberToday: 0,
    pendingTaskNumberToday: 0,
    loading: false,
    error: null,

    getToDoList: async () => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id; // Get user_id from auth store
            const response = await axios.get(`${BASE_URL}/getTasksForToday/${user_id}`);
            set({ todoList: response.data.tasksForToday || [], loading: false }); // Ensure fallback to an empty array
        } catch (error) {
            set({ error: error.message, loading: false, todoList: [] }); // Reset todoList on error
        }
    },

    // Fetch total tasks for today
    getTotalTaskNumberToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getTotalTaskNumberToday`);
            set({ totalTaskNumberToday: response.data.totalTasksToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch completed tasks for today
    getCompletedTaskNumberToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getCompletedTaskNumberToday`);
            set({ completedTaskNumberToday: response.data.completedTasksToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch pending task count for today
    getPendingTaskNumberToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getPendingTaskNumberToday`);
            set({ pendingTaskNumberToday: response.data.pendingTasksToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new task
    createTask: async (taskData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/createTask`, taskData);
            set({ loading: false });
            return response.data.task;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing task
    updateTask: async (id, taskData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/updateTask/${id}`, taskData);
            set({ loading: false });
            return response.data.task;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a task
    deleteTask: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/deleteTask/${id}`);
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));