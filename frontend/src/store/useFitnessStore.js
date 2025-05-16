import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const BASE_URL = 'http://localhost:5000/api/fitness';

export const useFitnessStore = create((set, get) => ({
    totalIntake: 0,
    totalBurnt: 0,
    foodForToday: [],
    exercisesForToday: [],
    loading: false,
    error: null,
    past10DaysData: [],
    past10WeeksData: [],
    past10MonthsData: [],
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
            const user_id = useAuthStore.getState().authUser.user_id;
            const response = await axios.post(`${BASE_URL}/createIntake/${user_id}`, intakeData);
            set({ loading: false });
            return response.data.intake;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    createBurnt: async (burnData) => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            // FIX: Add slash before user_id
            const response = await axios.post(`${BASE_URL}/createBurnt/${user_id}`, burnData);
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

    
        // Fetch data for the past 10 days
        getPast10DaysData: async () => {
            set({ loading: true });
            try {
                const user_id = useAuthStore.getState().authUser.user_id;
                if (!user_id) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`${BASE_URL}/getPast10DaysData/${user_id}`);
                set({ past10DaysData: response.data, loading: false });
            } catch (error) {
                set({ error: error.message, loading: false });
            }
        },
    
        // Fetch data for the past 10 weeks
        getPast10WeeksData: async () => {
            set({ loading: true });
            try {
                const user_id = useAuthStore.getState().authUser.user_id;
                if (!user_id) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`${BASE_URL}/getPast10WeeksData/${user_id}`);
                set({ past10WeeksData: response.data, loading: false });
            } catch (error) {
                set({ error: error.message, loading: false });
            }
        },
    
        // Fetch data for the past 10 months
        getPast10MonthsData: async () => {
            set({ loading: true });
            try {
                const user_id = useAuthStore.getState().authUser.user_id;
                if (!user_id) {
                    throw new Error('User ID not found');
                }
                const response = await axios.get(`${BASE_URL}/getPast10MonthsData/${user_id}`);
                set({ past10MonthsData: response.data, loading: false });
            } catch (error) {
                set({ error: error.message, loading: false });
            }
        },
}));