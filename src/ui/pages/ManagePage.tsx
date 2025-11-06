import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './ManagePage.css';

const ManagePage: React.FC = () => (
  <div className="page-container manage-page">
    <h1>Manage</h1>
    <nav className="manage-tabs">
      <NavLink to="/manage/categories" className={({ isActive }) => isActive ? 'active' : ''}>
        Categories
      </NavLink>
      <NavLink to="/manage/units" className={({ isActive }) => isActive ? 'active' : ''}>
        Units
      </NavLink>
      <NavLink to="/manage/items" className={({ isActive }) => isActive ? 'active' : ''}>
        Items
      </NavLink>
      <NavLink to="/manage/recipes" className={({ isActive }) => isActive ? 'active' : ''}>
        Recipes
      </NavLink>
    </nav>
    <div className="manage-content">
      <Outlet />
    </div>
  </div>
);

export default ManagePage;
