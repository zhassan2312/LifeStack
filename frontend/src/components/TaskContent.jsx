import React, { useState } from "react";
import Card from "./Card";
import { Circle, CircleAlert, CircleCheckBig, LayoutList, ListChecks, Logs } from "lucide-react";
import Topbar from "./Topbar";
import CompareChart from "./CompareChart";
import ProjectList from "./ProjectList";
import TaskList from "./TaskList";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";
import ProjectBoard from "./ProjectBoard";

const tasks = [
  { title: "Morning Meeting", startHour: 9, endHour: 10 },
  { title: "Work on Project A", startHour: 11, endHour: 13 },
  { title: "Lunch Break", startHour: 13, endHour: 14 },
  { title: "Team Sync", startHour: 15, endHour: 16 },
  { title: "Wrap-up", startHour: 17, endHour: 18 },
];

const data = [
  { name: "Jan", compare1: 4000, compare2: 2400 },
  { name: "Feb", compare1: 3000, compare2: 1398 },
  { name: "Mar", compare1: 2000, compare2: 9800 },
  { name: "Apr", compare1: 2780, compare2: 3908 },
  { name: "May", compare1: 1890, compare2: 4800 },
  { name: "Jun", compare1: 2390, compare2: 3800 },
  { name: "Jul", compare1: 3490, compare2: 4300 },
  { name: "Aug", compare1: 4000, compare2: 2400 },
  { name: "Sep", compare1: 3000, compare2: 1398 },
  { name: "Oct", compare1: 2000, compare2: 9800 },
  { name: "Nov", compare1: 2780, compare2: 3908 },
  { name: "Dec", compare1: 1890, compare2: 4800 },
];

const TaskContent = () => {
  const [activeTab, setActiveTab] = useState("Dashboard"); // State to track the active tab

  return (
    <>
      <Topbar
        list={["Dashboard", "Projects", "Timeline"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="task-dashboard flex">
        {/* Conditionally Render Content Based on Active Tab */}
        {activeTab === "Dashboard" && (
          <div className="flex-1 p-20 mr-[360px]">
            <div className="flex flex-col gap-12">
              <div className="flex gap-12">
                <Card title={"Total Tasks Today"} text={"10"} icon={<Logs size={20} />} />
                <Card title={"Completed Tasks"} text={"6"} icon={<ListChecks size={20} />} />
                <Card title={"Pending Tasks"} text={"4"} icon={<LayoutList size={20} />} />
              </div>
              <div className="flex gap-12">
                <Card title={"Total Projects"} text={"10"} icon={<Circle size={20} />} />
                <Card title={"Completed Projects"} text={"6"} icon={<CircleCheckBig size={20} />} />
                <Card title={"Pending Projects"} text={"4"} icon={<CircleAlert size={20} />} />
              </div>
              <CompareChart data={data} title={"Total vs Completed Tasks"} />
              <ProjectList />
            </div>
          </div>
        )}

        

        {activeTab === "Projects" && (
          <div className="flex-1 p-20 mr-[360px]">
            <ProjectBoard /> 
          </div>
        )}

        {activeTab === "Timeline" && (
          <div className="flex-1 p-20 mr-[360px]">
            <h1 className="text-20 font-bold mb-16">My Schedule Timeline</h1>
            <div className="timeline-container overflow-x-auto">
              {/* Time Slots */}
              <div className="flex min-w-[1200px] border-b border-(--color-black-10) pb-8">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-[50px] text-center text-12 text-(--color-black-60)"
                  >
                    {i}:00
                  </div>
                ))}
              </div>

              {/* Tasks */}
              <div className="relative mt-8 min-w-[1200px]">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="absolute bg-(--color-primary) text-white rounded-8 p-8 text-12"
                    style={{
                      left: `${(task.startHour / 24) * 100}%`,
                      width: `${((task.endHour - task.startHour) / 24) * 100}%`,
                    }}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fixed Right Bar */}
        <div className="fixed top-0 right-0 h-screen w-[360px] bg-(--color-background-1) p-24 overflow-y-auto">
          <TaskList className={"flex-1 mt-48"} />
          <hr className="my-24 border-(--color-black-10)" />
          <CreateTask />
          <hr className="my-24 border-(--color-black-10)" />
          <CreateProject />
        </div>
      </div>
    </>
  );
};

export default TaskContent;