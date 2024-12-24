// src/components/Layout/Breadcrumb.tsx
import React from 'react';
import { Home } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPage }) => {
  const pageTitle = currentPage === 'dashboard' 
    ? 'Dashboard' 
    : 'Admin Dashboard';

  return (
    <div className="flex items-center p-6 pb-0 text-sm text-gray-600">
      <Home className="w-4 h-4 mr-2" />
      <span>{pageTitle}</span>
    </div>
  );
};

export default Breadcrumb;