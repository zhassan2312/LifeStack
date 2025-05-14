import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/fitness';

export const useFitnessStore = create((set, get) => ({
    totalIntake: 0,
    totalBurnt: 0,
    foodForToday: [],
    exercisesForToday: [],
    loading: false,
    error: null,

    // Fetch total calorie intake for today
    getIntakeForToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getIntakeForToday`);
            set({ totalIntake: response.data.totalIntake, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch total calories burnt for today
    getBurntForToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getBurntForToday`);
            set({ totalBurnt: response.data.totalBurnt, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch food items logged for today
    getFoodForToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getFoodForToday`);
            set({ foodForToday: response.data.foodForToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch exercises logged for today
    getExercisesForToday: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/getExcercisesForToday`);
            set({ exercisesForToday: response.data.exercisesForToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new calorie intake record
    createIntake: async (intakeData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/createIntake`, intakeData);
            set({ loading: false });
            return response.data.intake;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new calorie burn record
    createBurnt: async (burnData) => {
        set({ loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/createBurnt`, burnData);
            set({ loading: false });
            return response.data.burnt;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing calorie intake record
    updateIntake: async (id, intakeData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/updateIntake/${id}`, intakeData);
            set({ loading: false });
            return response.data.updatedIntake;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing calorie burn record
    updateBurnt: async (id, burnData) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/updateBurnt/${id}`, burnData);
            set({ loading: false });
            return response.data.updatedBurnt;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a calorie intake record
    deleteIntake: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/deleteIntake/${id}`);
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete a calorie burn record
    deleteBurnt: async (id) => {
        set({ loading: true });
        try {
            await axios.delete(`${BASE_URL}/deleteBurnt/${id}`);
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));