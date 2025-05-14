import React from "react";

const projects = [
  {
    id: 1,
    title: "Project A",
    isHourly: true,
    hours: 20,
    deadline: "2023-12-31",
    progress: 50,
    status: "in-progress",
    image: "/project1.png",
  },
  {
    id: 2,
    title: "Project B",
    isHourly: false,
    deadline: "2023-11-15",
    progress: 0,
    status: "pending",
    image: "/project2.png",
  },
  {
    id: 3,
    title: "Project C",
    isHourly: false,
    deadline: "2023-10-01",
    progress: 100,
    status: "completed",
    image: "/project3.png",
  },
  {
    id: 4,
    title: "Project D",
    isHourly: true,
    hours: 15,
    deadline: "2024-01-20",
    progress: 30,
    status: "in-progress",
    image: "/project5.png",
  },
];

const ProjectCard = ({ title, deadline, progress, image, isHourly, hours }) => {
  return (
    <div className="flex flex-col gap-12 bg-(--color-white-100) rounded-24 p-16">
      <img src={image} alt={title} className="h-[150px] object-cover rounded-16" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-12 text-(--color-black-40)">Deadline: {deadline}</p>
      {isHourly ? (
        <p className="text-16 font-semibold text-(--color-black-100)">{hours} Hours</p>
      ) : (
        <div className="flex flex-col items-start gap-8">
          <div className="w-full h-8 bg-(--color-black-10) rounded-full">
            <div
              className="bg-(--color-primary) h-full rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-14 text-(--color-black-80) text-center">{progress}% Complete</p>
        </div>
      )}
    </div>
  );
};

const ProjectBoard = () => {
  const inProgressProjects = projects.filter((project) => project.status === "in-progress");
  const pendingProjects = projects.filter((project) => project.status === "pending");
  const completedProjects = projects.filter((project) => project.status === "completed");

  return (
    <div className="flex h-screen gap-16">
      {/* In Progress Column */}
      <div className="flex flex-col flex-1 p-4 gap-8">
        <div className="flex items-center justify-start p-12 gap-12 border border-x-0 border-y-(--color-black-10)">
          <div className="w-12 h-12 bg-(--color-primary) rounded-full"></div>
          <h2 className="text-18 font-bold">In Progress</h2>
        </div>
        
        {inProgressProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {/* Pending Column */}
      <div className="flex flex-col flex-1 p-4 gap-8">
        <div className="flex items-center justify-start p-12 gap-12 border border-x-0 border-y-(--color-black-10)">
          <div className="w-12 h-12 bg-(--color-warning) rounded-full"></div>
          <h2 className="text-18 font-bold">Pending</h2>
        </div>
        {pendingProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {/* Completed Column */}
      <div className="flex flex-col flex-1 h-fit p-4 gap-8">
        <div className="flex items-center justify-start p-12 gap-12 border border-x-0 border-y-(--color-black-10)">
          <div className="w-12 h-12 bg-(--color-success) rounded-full"></div>
          <h2 className="text-18 font-bold">Completed</h2>
        </div>
        {completedProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;