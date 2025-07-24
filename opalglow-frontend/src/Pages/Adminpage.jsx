import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'


const Adminpage = () => {
  return (
    <div className="flex h-screen">
        <div className="w-[300px]">
          <Sidebar />
        </div>
        <div className='w-full'>
        <Outlet />
        </div>
    </div>
  )
}

export default Adminpage