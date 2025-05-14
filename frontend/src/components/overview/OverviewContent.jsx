
import CompareChart from '../CompareChart'
import TaskList from '../TaskList'
import ProjectList from '../ProjectList'
import OverviewRightbar from './OverviewRightbar'

const data=[
  {name: 'Jan', compare1: 4000, compare2: 2400},
  {name: 'Feb', compare1: 3000, compare2: 1398},
  {name: 'Mar', compare1: 2000, compare2: 9800},
  {name: 'Apr', compare1: 2780, compare2: 3908},
  {name: 'May', compare1: 1890, compare2: 4800},
  {name: 'Jun', compare1: 2390, compare2: 3800},
  {name: 'Jul', compare1: 3490, compare2: 4300},
  {name: 'Aug', compare1: 4000, compare2: 2400},
  {name: 'Sep', compare1: 3000, compare2: 1398},
  {name: 'Oct', compare1: 2000, compare2: 9800},
  {name: 'Nov', compare1: 2780, compare2: 3908},
  {name: 'Dec', compare1: 1890, compare2: 4800},
]

const OverviewContent = () => {
  
  return (
    <div>
      <div className='mt-24 ml-24 mb-24 flex flex-col gap-24 flex-1 mr-[360px]'>
        <div className='flex gap-24'>
          <div className='flex flex-col gap-16 flex-1'>
            <CompareChart 
                data={data} 
                title={"Income vs Expenses ($)"}
              />
              <CompareChart 
              data={data} 
              title={"Calorie Intake vs Burn (kcal)"}
            />
          </div>
          <TaskList className={'p-16 max-h-[662px]'}/>
        </div>
        <ProjectList/>

      </div>
      <OverviewRightbar/>
    </div>
    
  )
}

export default OverviewContent