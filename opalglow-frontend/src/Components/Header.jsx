import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='sticky top-0 w-full h-[60px] bg-gray-800/25 backdrop-blur-md text-gray-900 font-semibold flex justify-end shadow z-10'>
        <div className="flex justify-between items-center w-[25%] h-full mx-[100px]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/aboutus">About Us</Link>
        </div>
    </div>
  )
}

export default Header