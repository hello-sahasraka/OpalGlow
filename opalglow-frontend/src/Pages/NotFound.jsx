import { Link } from 'react-router-dom'
import sad from "../assets/Sad.png"

const NotFound = () => {
    return (
        <div className="min-h-full flex flex-col items-center justify-center bg-pink-50 text-gray-800 p-6">

            {/* Image */}
            <img
                src={sad}
                alt="Not Found"
                className="w-60 h-60 p-2 object-cover rounded-full shadow-lg mb-6 border-4 border-rose-200"
            />

            {/* Heading */}
            <h1 className="text-6xl font-bold text-rose-500 mb-3">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-center text-gray-600 max-w-md mb-6">
                Looks like this beauty item doesn’t exist anymore…
                Let’s get you back to the glam!
            </p>

            {/* Button */}
            <Link
                to="/products"
                className="bg-rose-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-rose-600 transition-all duration-300"
            >
                Back to Shop
            </Link>
        </div>
    )
}

export default NotFound
