import IncomeExpenseChart from '../IncomeExpenseChart'
import TaskList from '../TaskList'
import ProjectList from '../ProjectList'
import OverviewRightbar from './OverviewRightbar'
import IntakeBurnChart from '../IntakeBurnChart'

const OverviewContent = () => {
  
  // You can filter or transform `data` based on `timeRange` if needed

  return (
    <div>
      <div className='mt-24 ml-24 mb-24 flex flex-col gap-24 flex-1 mr-[360px]'>
        <div className='flex gap-24'>
          <div className='flex flex-col gap-16 flex-1'>
            <IncomeExpenseChart
              title="Income vs Expenses ($)"
            />
            <IntakeBurnChart
              title="Calorie Intake vs Burn (kcal)"
            />
          </div>
          <TaskList className={'p-16 max-h-[662px]'} />
        </div>
        <ProjectList />
      </div>
      <OverviewRightbar />
    </div>
  )
}

export default OverviewContent