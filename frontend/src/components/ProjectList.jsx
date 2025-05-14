import Project from './Project.jsx';


const data=[
    {
        id: 1,
        title: "Project A",
        startingTime: "2023-01-01",
        deadline: "2023-12-31",
        goal: "Complete the project",
        completionPercentage: "50%",
    },
    {
        id: 2,
        title: "Project B",
        startingTime: "2023-02-15",
        deadline: "2023-12-31",
        goal: "Finish the design phase",
        completionPercentage: "75%",
    },
    {
        id: 3,
        title: "Project C",
        deadline: "2023-12-31",
        startingTime: "2023-03-10",
        goal: "Develop the backend",
        completionPercentage: "30%",
    },
]


const ProjectList = () => {
  return (
    <div className='flex flex-col gap-24'>
        <h1 className='text-24 font-bold text-(--color-font-heading)'>
            Ongoing Projects
        </h1>
        <ul className='flex flex-col gap-12'>
           {data.map((project) => (
                <li key={project.id}>
                    <Project 
                        title={project.title}
                        startingTime={project.startingTime}
                        goal={project.goal}
                        completionPercentage={project.completionPercentage}
                        deadline={project.deadline}
                    />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProjectList