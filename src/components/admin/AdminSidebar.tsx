import { Link, useLocation } from "react-router-dom";
import { Users, ClipboardList, ClipboardCheck, Settings, BarChart } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        icon: BarChart,
        path: "/admin/dashboard",
    },
    {
        title: "Users",
        icon: Users,
        path: "/admin/users",
    },
    {
        title: "Try Outs",
        icon: ClipboardList,
        path: "/admin/tryouts",
    },
    {
        title: "Try Out Sections",
        icon: ClipboardCheck,
        path: "/admin/tryout-section",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
    },
];

export const AdminSidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </div>

            <nav className="mt-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                            location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""
                        }`}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};
