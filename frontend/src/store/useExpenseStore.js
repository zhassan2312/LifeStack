import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

const BASE_URL = 'http://localhost:5000/api/expense';

export const useExpenseStore = create((set) => ({
    expenses: [],
    earnings: [],
    expenditures: [],
    income: 0,
    past10DaysData: [],
    past10WeeksData: [],
    past10MonthsData: [],
    loading: false,
    error: null,

    // Fetch total expenses for today
    getExpensesForToday: async () => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.get(`${BASE_URL}/getExpensesForToday/${user_id}`);
            set({ expenses: response.data.expensesForToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch total income for today
    getIncomeForToday: async () => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.get(`${BASE_URL}/getIncomeForToday/${user_id}`);
            set({ income: response.data.incomeForToday, loading: false });
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

    // Fetch earnings for today
    getEarningsForToday: async () => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.get(`${BASE_URL}/getEarningsForToday/${user_id}`);
            set({ earnings: response.data.earningsForToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch expenditures for today
    getExpendituresForToday: async () => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.get(`${BASE_URL}/getExpendituresForToday/${user_id}`);
            set({ expenditures: response.data.expendituresForToday, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Create a new expense
    createExpense: async (expenseData) => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.post(`${BASE_URL}/createExpense/${user_id}`, expenseData);
            set({ loading: false });
            return response.data.expense;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Update an existing expense
    updateExpense: async (expense_id, expenseData) => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            const response = await axios.put(`${BASE_URL}/updateExpense//${user_id}/${expense_id}`, expenseData);
            set({ loading: false });
            return response.data.expense;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Delete an expense
    deleteExpense: async (expense_id) => {
        set({ loading: true });
        try {
            const user_id = useAuthStore.getState().authUser.user_id;
            if (!user_id) {
                throw new Error('User ID not found');
            }
            await axios.delete(`${BASE_URL}/deleteExpense//${user_id}/${expense_id}`);
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));