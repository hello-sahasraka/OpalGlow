import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'

const Home = () => {
  return (
    <div>
      <Header />

      <div className="w-full h-[calc(100vh-60px)]">
        <Outlet />
      </div>

    </div>
  )
}

export default Home