import axios from "axios";
import { ArrowDownLeftSquareIcon, ChartNoAxesGantt, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const navLinks = [
    { path: "/admin/users", label: "Users", icon: <UserRound size={20} /> },
    { path: "/admin/products", label: "Products", icon: <ChartNoAxesGantt size={20} /> },
    { path: "/admin/orders", label: "Orders", icon: <ArrowDownLeftSquareIcon size={20} /> },
  ];

  useEffect(() => {
    if (token) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/currentuser", {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then((response) => {
        setUser(response.data);
      }).catch((e) => {
        console.log(e);
        setUser(null);
      })
    }
  }, [token]);

  return (
    <aside className="h-screen w-full bg-gray-900 text-white shadow-md flex flex-col justify-between">
      <div className="flex flex-col justify-between border-white pt-10 px-4 gap-3">
        <h2 className="text-lg font-semibold mb-6 text-gray-200 tracking-wide px-2">Admin Panel</h2>

        {navLinks.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300 hover:text-white"}
              `}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}

      </div>

      <button className="flex gap-3 mx-4 my-12 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium bg-blue-600 hover:bg-blue-500/90 text-white"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        <LogOut size={20} /><span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
