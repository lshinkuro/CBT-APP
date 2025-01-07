import { AdminSidebar } from '../../components/admin/AdminSidebar';

export const AdminSettings = () => {
 
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Setting</h1>

      </main>
    </div>
  );
};