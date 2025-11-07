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
import { DatabaseProvider } from './ui/providers';

const App: React.FC = () => {
  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Plan - Default Landing Page */}
            <Route path="/" element={<PlanPage />} />

            {/* Shop */}
            <Route path="/shop" element={<ShopPage />} />

            {/* Manage Hub */}
            <Route path="/manage" element={<ManagePage />} />
            
            {/* Manage Resources - Direct children of MainLayout */}
            <Route path="/manage/categories" element={<CategoriesPage />} />
            <Route path="/manage/units" element={<UnitsPage />} />
            <Route path="/manage/items" element={<ItemsPage />} />
            <Route path="/manage/recipes" element={<RecipesPage />} />
            <Route path="/manage/recipes/:id" element={<RecipeDetailPage />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
