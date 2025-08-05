import { ArrowDownLeftSquareIcon, ChartNoAxesGantt, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/admin/users", label: "Users", icon: <UserRound size={20} /> },
    { path: "/admin/products", label: "Products", icon: <ChartNoAxesGantt size={20} /> },
    { path: "/admin/orders", label: "Orders", icon: <ArrowDownLeftSquareIcon size={20} /> },
  ];

  return (
    <aside className="h-screen w-full bg-gray-900 text-white shadow-md">
      <div className="flex flex-col pt-10 px-4 gap-3">
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
    </aside>
  );
};

export default Sidebar;
