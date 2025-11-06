import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, ShoppingCartIcon, SettingsIcon } from './Icons';
import './BottomNav.css';

export const BottomNav: React.FC = () => (
  <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
    <NavLink
      to="/"
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      aria-label="Plan meals"
    >
      <CalendarIcon className="nav-icon" />
      <span className="nav-label">Plan</span>
    </NavLink>

    <NavLink
      to="/shop"
      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      aria-label="Shopping list"
    >
      <ShoppingCartIcon className="nav-icon" />
      <span className="nav-label">Shop</span>
    </NavLink>

    <NavLink
      to="/manage"
      className={({ isActive }) => `nav-item ${isActive || window.location.pathname.startsWith('/manage') ? 'active' : ''}`}
      aria-label="Manage items"
    >
      <SettingsIcon className="nav-icon" />
      <span className="nav-label">Manage</span>
    </NavLink>
  </nav>
);
