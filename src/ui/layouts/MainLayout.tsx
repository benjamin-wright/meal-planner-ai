import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import './MainLayout.css';

export function MainLayout() {
  return (
    <div className="main-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
