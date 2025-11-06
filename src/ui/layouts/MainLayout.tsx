import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import './MainLayout.css';

export const MainLayout: React.FC = () => (
  <div className="main-layout">
    <main className="main-content">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);
