import React,{useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";


const CompareChart = ({data,title}) => {

    const [isDaily, setIsDaily] = useState(true);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
  
    const handleDailyClick = () => {
      setIsDaily(true);
      setIsWeekly(false);
      setIsMonthly(false);
    };
  
    const handleWeeklyClick = () => {
      setIsDaily(false);
      setIsWeekly(true);
      setIsMonthly(false);
    };
  
    const handleMonthlyClick = () => {
      setIsDaily(false);
      setIsWeekly(false);
      setIsMonthly(true);
    };
  return (
    <div className="bg-(--color-background-1) pr-24 pt-24 pb-16 rounded-24">
      <div className="ml-32 mb-16 flex justify-between items-stretch">
        <h2 className="text-18 text-(--color-font-color) font-bold">{title}</h2>
        <div className="flex gap-16 text-12 items-center justify-center">
          <button
            onClick={handleDailyClick}
            className={`font-normal cursor-pointer ${
              isDaily ? "underline text-(--color-secondary-blue)" : "text-(--color-black-60)"
            }`}
          >
            Daily
          </button>
          <button
            onClick={handleWeeklyClick}
            className={`font-normal cursor-pointer ${
              isWeekly ? "underline text-(--color-secondary-blue)" : "text-(--color-black-60)"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={handleMonthlyClick}
            className={`font-normal cursor-pointer ${
              isMonthly ? "underline text-(--color-secondary-blue)" : "text-(--color-black-60)"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="w-[580px] h-[240px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={"name"} 
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
            />
            <Tooltip />
            <Area type="monotone" dataKey="compare1" stroke="#8AE6B0" fill="#8AE6B022" />
            <Area type="monotone" dataKey="compare2" stroke="#FF5A5F" fill="#FF5A5F22" />
            <Line
              type="monotone"
              dataKey="compare1"
              stroke="#8AE6B0"
              dot={{ stroke: "#8AE6B0", strokeWidth: 2, r: 4, fill: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="compare2"
              stroke="#FF5A5F"
              dot={{ stroke: "#FF5A5F", strokeWidth: 2, r: 4, fill: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompareChart;