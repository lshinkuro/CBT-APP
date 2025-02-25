import { Link, useLocation } from "react-router-dom";
import {
    Users,
    ClipboardList,
    ClipboardCheck,
    BarChart,
    MessageCircleQuestion,
    BookImage,
    LogOut,
    Menu,
    X,
    Crosshair,
    ChevronsLeft,
    ChevronsRight,
    BookOpenCheck,
} from "lucide-react";
import { useState } from "react";
import logoPlatypusCollege from "../../assets/images/platypus-college.png";

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
        title: "Accuracy Tests",
        icon: Crosshair,
        path: "/admin/accuracy-tests",
    },
    {
        title: "Exams",
        icon: BookOpenCheck,
        path: "/admin/exams",
    },
    {
        title: "Logout",
        icon: LogOut,
        path: "/logout",
    },
];

// Props untuk komponen AdminSidebar
interface AdminSidebarProps {
    isMinimized: boolean;
    toggleSidebar: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isMinimized, toggleSidebar }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const usr =
        localStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") &&
        JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_COOKIE_KEY + "-usr") ?? "");

    return (
        <div>
            {/* Mobile Navigation Bar */}
            <div className="md:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <img src={logoPlatypusCollege} alt="Logo Platypus College" className="h-12 w-12 mr-3" />
                        <span className="text-lg font-semibold text-yellow-900">Platypus College</span>
                    </div>
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                <div className="text-sm text-black ms-5 mb-1">{usr?.email}</div>
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
            <div
                className={`hidden md:block h-screen bg-white border-r border-gray-200 fixed top-0 transition-all duration-300 ${
                    isMinimized ? "w-20" : "w-64"
                }`}
            >
                <div className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                        {!isMinimized && (
                            <>
                                <img src={logoPlatypusCollege} alt="Logo Platypus College" className="h-12 w-12 mr-3" />
                                <span className="text-lg font-semibold text-yellow-900">Platypus College</span>
                            </>
                        )}
                    </div>
                    <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
                        {isMinimized ? (
                            <ChevronsRight className="w-6 h-6 text-gray-600" />
                        ) : (
                            <ChevronsLeft className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>
                {!isMinimized && <div className="text-sm text-black ms-5 mb-1">{usr?.email}</div>}
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
                            {!isMinimized && <span>{item.title}</span>}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};
