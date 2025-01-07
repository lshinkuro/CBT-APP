import { Link, useLocation } from "react-router-dom";
import {
    Users,
    ClipboardList,
    ClipboardCheck,
    Settings,
    BarChart,
    MessageCircleQuestion,
    BookImage,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

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
        title: "Programs",
        icon: BookImage,
        path: "/admin/programs",
    },
    {
        title: "Try Outs",
        icon: ClipboardList,
        path: "/admin/tryouts",
    },
    {
        title: "Try Out Sections",
        icon: ClipboardCheck,
        path: "/admin/tryout-sections",
    },
    {
        title: "Questions",
        icon: MessageCircleQuestion,
        path: "/admin/questions",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
    },
    {
        title: "Logout",
        icon: LogOut,
        path: "/logout",
    },
];

export const AdminSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Mobile Navigation Bar */}
            <div className="md:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                {isOpen && (
                    <nav className="bg-white shadow-lg">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                                    location.pathname === item.path ? "bg-blue-50 text-blue-600" : ""
                                }`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        ))}
                    </nav>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
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
        </div>
    );
};
