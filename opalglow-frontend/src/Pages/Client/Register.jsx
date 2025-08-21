import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Eye, EyeClosed } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    secondName: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    phone: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, firstName, secondName, password, confirmPassword, role } = formData;

    if (!email || !firstName || !secondName || !password || !confirmPassword || !role) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/user/', payload);
      toast.success("Registration successful!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/3609620/pexels-photo-3609620.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96 z-10"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">Sign in to <span className='bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>OpalGlow</span></h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="secondName"
          placeholder="Second Name"
          className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
          value={formData.secondName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className='relative flex items-center mt-3'>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="placeholder:text-gray-500 placeholder:text-xs pl-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
          </button>
        </div>

        <div className='relative flex items-center mt-3'>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="placeholder:text-gray-500 placeholder:text-xs pl-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            {showConfirmPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
          </button>
        </div>

        {/* Hidden role input */}
        <input type="hidden" name="role" value={formData.role} />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          className="placeholder:text-gray-500 placeholder:text-xs pl-3 mt-3 border-1 border-gray-300 bg-white/80 rounded-md w-full h-[40px]"
          value={formData.phone}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-black py-2 rounded text-gray-200 font-semibold mt-8 hover:bg-gray-400 transition duration-300 drop-shadow-lg cursor-pointer"
        >
          Create account
        </button>

        <div className="flex justify-center items-center gap-2 text-gray-700 text-xs mt-4">
          <p>
            Already have an account?
            <span className="text-blue-800 cursor-pointer">
              <Link to="/login"> Log in!</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
