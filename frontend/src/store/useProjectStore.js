import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/projects';

export const useProjectStore = create((set, get) => ({
    totalProjects: 0,
    completedProjects: 0,
    pendingProjects: 0,
    ongoingProjects: [],
    loading: false,
    error: null,

    // Fetch total number of projects
    getTotalProjectNumber: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getTotalProjectNumber`);
            set({ totalProjects: response.data.totalProjects, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch number of completed projects
    getCompletedProjectNumber: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getCompletedProjectNumber`);
            set({ completedProjects: response.data.completedProjects, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch number of pending projects
    getPendingProjectNumber: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getPendingProjectNumber`);
            set({ pendingProjects: response.data.pendingProjects, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch ongoing projects
    getOngoingProjects: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getOngoingProjects`);
            set({ ongoingProjects: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new project
    createProject: async (projectData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/createProject`, projectData);
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing project
    updateProject: async (id, projectData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/updateProject/${id}`, projectData);
            set({ loading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a project
    deleteProject: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/deleteProject/${id}`);
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));