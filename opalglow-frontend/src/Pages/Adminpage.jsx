import { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Components/Loader';


const Adminpage = () => {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in!");
      navigate('/login');
      return;
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/validate", {
        headers: {
          "Authorization": "Bearer " + token,
        }
      }).then((response) => {
        if (response.data.user.role == "admin") {
          setUserValidated(true);
        } else {
          toast.error("Access denied: Not an admin.");
          navigate('/login');
        }
      }).catch((error) => {
        console.error("Validation error:", error);
        toast.error("Session expired or unauthorized.");
        navigate('/login');
      })
    }
  }, [])

  return (
    <>
      {!userValidated ? <div className='w-full h-screen flex justify-center items-center'><Loader /></div>
        :
        <div className="flex h-screen">
          <div className="w-[300px]">
            <Sidebar />
          </div>
          <div className='w-full'>
            <Outlet />
          </div>
        </div>
      }
    </>
  )
}

export default Adminpage