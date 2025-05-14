import { ClipboardList } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';

const TaskList = ({ className }) => {
  const { todoList, getToDoList, loading, error } = useTaskStore(); // Default to an empty array

  useEffect(() => {
    getToDoList(); // Fetch tasks when the component mounts
  }, []);

  return (
    <div className={`bg-(--color-background-1) min-w-[300px] flex flex-1 flex-col rounded-24 ${className}`}>
      <div className="flex justify-between items-center mb-16">
        <div className="p-8 text-(--color-black-60) bg-(--color-black-10) rounded-80">
          <ClipboardList size={20} />
        </div>
        <h2 className="text-16 text-(--color-black-40) font-medium">Today Task List</h2>
        <h2 className="text-24 text-(--color-black-100) font-bold">{todoList.length}</h2>
      </div>
      <div className="flex flex-col gap-8 overflow-y-auto max-h-[100%]">
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading &&
          !error &&
          todoList.map((task, index) => (
            <div key={index} className="flex flex-col p-12 rounded-12 bg-(--color-background-3)">
              <span className="text-14 font-medium text-(--color-black-80)">{task.title}</span>
              <span className="text-12 font-medium text-(--color-black-60)">Priority: {task.priority}</span>
              <span className="text-12 font-medium text-(--color-black-60)">
                Timeslot: {task.start_time} - {task.end_time}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;