import { motion } from 'framer-motion';
import { useAuth } from '../stores/authStore';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Saya</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nama</label>
              <p className="mt-1 text-lg">{user?.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1 text-lg">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Bergabung Sejak</label>
              <p className="mt-1 text-lg">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};