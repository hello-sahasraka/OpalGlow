import axios from 'axios';
import { Eye, EyeClosed, EyeOff } from 'lucide-react';
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [firstName, setFirstName] = useState();
    const [secondName, setSecondName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [role, setRole] = useState("user");
    const [phone, setPhone] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!email || !firstName || !secondName || !password || !confirmPassword || !role) {
            toast.error("Please fill all required fields.");
            return;
        }

        const userData = {
            firstName,
            secondName,
            email,
            password,
            role,
            phone
        }

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/', userData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            toast.success("Registration successful!");
            navigate('/admin/users');
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Registration failed.");
        }

        console.log(userData);

    }

    return (
        <div className="w-full h-full bg-gray-50 px-12 py-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Add New User
            </h1>
            <Toaster />
            <div className="overflow-x-auto w-full font-semibold bg-white rounded-xl shadow border border-gray-200 py-12 px-16 mx-auto">

                <div className="space-y-4">

                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Second Name"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />

                    <div className='w-full flex justify-between gap-4'>

                        <div className='w-1/2 relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>

                        </div>

                        <div className='w-1/2 relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>
                        </div>
                    </div>

                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <Link
                        to="/admin/users"
                        className="border-red-600 border bg-red-100 text-red-600 hover:bg-red-700 hover:text-white px-10 py-2 rounded-md transition"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        className="border-blue-600 border bg-blue-100 text-blue-600 hover:bg-blue-700 hover:text-white px-10 py-2 rounded-md transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddUser