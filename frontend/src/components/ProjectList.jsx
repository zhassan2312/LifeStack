import React, { useEffect } from 'react';
import Project from './Project.jsx';
import { useProjectStore } from '../store/useProjectStore';

const ProjectList = () => {
  const { ongoingProjects, loading, error, getOngoingProjects } = useProjectStore();

  useEffect(() => {
    getOngoingProjects();
  }, [getOngoingProjects]);

  return (
    <div className='flex flex-col gap-24'>
      <h1 className='text-24 font-bold text-(--color-font-heading)'>
        Ongoing Projects
      </h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul className='flex flex-col gap-12'>
        {(ongoingProjects || []).map((project) => (
          <li key={project.project_id}>
            <div className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-4">
              <Project
                title={project.title}
                description={project.description}
                status={project.status}
                createdAt={project.created_at}
                progressPercentage={project.progress_percentage}
                totalCost={project.total_cost}
                totalHours={project.total_hours}
                hourlyRate={project.hourly_rate}
              />
              {/* Only for project-based */}
              {project.progress_percentage !== null && (
                <div>
                  <span>Progress: {project.progress_percentage}%</span>
                  {/* Example progress bar */}
                  <div className="w-full bg-gray-200 rounded h-2 my-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${project.progress_percentage}%` }}
                    ></div>
                  </div>
                  <span>Budget: {project.total_cost}</span>
                  {/* Render milestones here if available */}
                </div>
              )}
              {/* Only for hourly-based */}
              {project.total_hours !== null && (
                <div>
                  <span>Hours Worked: {project.total_hours}</span>
                  <span className="ml-4">Hourly Rate: {project.hourly_rate}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;