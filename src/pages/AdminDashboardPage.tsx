import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { BentoOverview } from '../components/admin/BentoOverview';
import { PPDBManager } from '../components/admin/PPDBManager';
import { NewsManager } from '../components/admin/NewsManager';
import { GalleryManager } from '../components/admin/GalleryManager';
import { PengurusManager } from '../components/admin/PengurusManager';
import { ProgramManager } from '../components/admin/ProgramManager';
import { FacilityManager } from '../components/admin/FacilityManager';

export const AdminDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab });
  };

  const handleQuickModal = (type: string) => {
    setSearchParams({ tab: type });
  };

  return (
    <AdminLayout currentTab={currentTab} onTabChange={handleTabChange}>
      {currentTab === 'overview' && (
        <BentoOverview 
          onNavigate={handleTabChange} 
          onOpenNewModal={handleQuickModal} 
        />
      )}
      {currentTab === 'ppdb' && <PPDBManager />}
      {currentTab === 'news' && <NewsManager />}
      {currentTab === 'gallery' && <GalleryManager />}
      {currentTab === 'pengurus' && <PengurusManager />}
      {currentTab === 'program' && <ProgramManager />}
      {currentTab === 'facilities' && <FacilityManager />}
    </AdminLayout>
  );
};

export default AdminDashboardPage;
