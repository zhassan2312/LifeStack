import SearchBox from './SearchBox'
import { Bell } from 'lucide-react'

const Header = () => {
  return (
    <div className='flex pt-4 pb-4 pr-12 items-center bg-(--color-white-100)'>
        <SearchBox className={'ml-auto'}/>
        <Bell size={24} className='ml-auto text-font-color mr-[344px]' />
    </div>
  )
}

export default Header