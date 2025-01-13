import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { useState } from 'react';

export const AdminSettings = () => {

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
      setIsMinimized(!isMinimized);
  };
 
  return (
    <div className="flex">
      <AdminSidebar isMinimized={isMinimized} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
          className={`flex-1 p-8 transition-all duration-300 ${
              isMinimized ? "ml-20" : "ml-64"
          }`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Setting</h1>

      </main>
    </div>
  );
};