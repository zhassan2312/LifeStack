import { ClipboardList } from 'lucide-react';
import React from 'react';

const TaskList = ({className}) => {
  // Example task data with title, priority, and timeslot
  const tasks = [
    { id: 1, title: 'Complete project report', priority: 'High', timeslot: '10:00 AM - 11:00 AM' },
    { id: 2, title: 'Team meeting', priority: 'Medium', timeslot: '3:00 PM - 4:00 PM' },
    { id: 3, title: 'Review pull requests', priority: 'Low', timeslot: '1:00 PM - 2:00 PM' },
    { id: 4, title: 'Plan next sprint', priority: 'High', timeslot: '4:30 PM - 5:30 PM' },
    { id: 5, title: 'Write documentation', priority: 'Medium', timeslot: '9:00 AM - 10:00 AM' },
    { id: 6, title: 'Code review', priority: 'Low', timeslot: '11:00 AM - 12:00 PM' },
  ];

  return (
    <div className={`bg-(--color-background-1) min-w-[300px] flex flex-1 flex-col rounded-24  ${className}`}>
      <div className="flex justify-between items-center mb-16">
        <div className="p-8 text-(--color-black-60) bg-(--color-black-10) rounded-80">
          <ClipboardList size={20} />
        </div>
        <h2 className="text-16 text-(--color-black-40) font-medium">
          Today Task List
        </h2>
        <h2 className="text-24 text-(--color-black-100) font-bold">
          {tasks.length}
        </h2>
      </div>
      {/* Add vertical scrolling */}
      <div className="flex flex-col gap-8 overflow-y-auto max-h-[100%]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col p-12 rounded-12 bg-(--color-background-3)"
          >
            <span className="text-14 font-medium text-(--color-black-80)">
              {task.title}
            </span>
            <span className="text-12 font-medium text-(--color-black-60)">
              Priority: {task.priority}
            </span>
            <span className="text-12 font-medium text-(--color-black-60)">
              Timeslot: {task.timeslot}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;