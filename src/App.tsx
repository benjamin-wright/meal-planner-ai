import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './ui/layouts';
import {
  PlanPage,
  ShopPage,
  ManagePage,
  CategoriesPage,
  UnitsPage,
  ItemsPage,
  RecipesPage,
  RecipeDetailPage,
} from './ui/pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Plan - Default Landing Page */}
          <Route path="/" element={<PlanPage />} />

          {/* Shop */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Manage - Nested routes with tabs */}
          <Route path="/manage" element={<ManagePage />}>
            <Route index element={<Navigate to="/manage/categories" replace />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="units" element={<UnitsPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="recipes/:id" element={<RecipeDetailPage />} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
