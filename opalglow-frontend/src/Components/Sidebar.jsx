import { ArrowDownLeftSquareIcon, ChartNoAxesGantt, UserRound } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='w-full h-screen bg-gray-400'>
        <div className='flex flex-col gap-0.5 pt-[50px]'>
            <Link to="/admin/users" className='text-md font-semi-bold text-white rounded-md p-4 hover:bg-gray-600 transition duration-200 flex gap-4 items-center'><UserRound size={20} /> <p>Users</p></Link>
            <Link to="/admin/products" className='text-md font-semi-bold text-white rounded-md p-4 hover:bg-gray-600 transition duration-200 flex gap-4 items-center'><ChartNoAxesGantt size={20} /> <p>Products</p></Link>
            <Link to="/admin/orders" className='text-md font-semi-bold text-white rounded-md p-4 hover:bg-gray-600 transition duration-200 flex gap-4 items-center'><ArrowDownLeftSquareIcon size={20} /> <p>Orders</p></Link>
        </div>
    </div>
  )
}

export default Sidebar