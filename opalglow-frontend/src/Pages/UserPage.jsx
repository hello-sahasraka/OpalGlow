import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer';

const UserPage = () => {
  return (
    <div>
      <Header />

      <div className="w-full h-[calc(100vh-60px)]">
        <Outlet />
      </div>
    </div>
  )
}

export default UserPage;