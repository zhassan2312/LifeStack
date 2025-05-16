// IncomeExpenseChart.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useExpenseStore } from '../store/useExpenseStore';

const IncomeExpenseChart = ({ title }) => {
  const {
    past10DaysData,
    past10WeeksData,
    past10MonthsData,
    getPast10DaysData,
    getPast10WeeksData,
    getPast10MonthsData,
    loading,
    error,
  } = useExpenseStore();

  const [timeRange, setTimeRange] = useState('daily');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (timeRange === 'daily') {
          await getPast10DaysData();
        } else if (timeRange === 'weekly') {
          await getPast10WeeksData();
        } else if (timeRange === 'monthly') {
          await getPast10MonthsData();
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };
    
    fetchData();
  }, [timeRange, getPast10DaysData, getPast10WeeksData, getPast10MonthsData]);

  let chartData = past10DaysData;
  if (timeRange === 'weekly') chartData = past10WeeksData;
  if (timeRange === 'monthly') chartData = past10MonthsData;

  return (
    <div className="bg-(--color-background-1) pr-24 pt-24 pb-16 rounded-24">
      <div className="ml-32 mb-16 flex justify-between items-stretch">
        <h2 className="text-18 text-(--color-font-color) font-bold">{title}</h2>
        <div className="flex gap-16 text-12 items-center justify-center">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`font-normal cursor-pointer ${
                timeRange === range
                  ? 'underline text-(--color-secondary-blue)'
                  : 'text-(--color-black-60)'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[240px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">Loading...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : chartData?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            No data available for selected period
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 16, right: 16 }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                padding={{ top: 16, bottom: 16 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8AE6B0"
                strokeWidth={2}
                dot={{ stroke: '#8AE6B0', strokeWidth: 2, r: 4, fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#FF5A5F"
                strokeWidth={2}
                dot={{ stroke: '#FF5A5F', strokeWidth: 2, r: 4, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IncomeExpenseChart;