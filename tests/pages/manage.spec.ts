import { test, expect } from '@playwright/test';
import { ManagePage } from '../page-objects';

test.describe('Manage Page', () => {
  test('should display page elements and redirect /manage to categories', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Verify page structure
    await expect(managePage.heading).toContainText('Manage');
    await expect(managePage.bottomNav).toBeVisible();
    await expect(managePage.manageNavButton).toHaveClass(/active/);
    
    // Verify Categories is default tab
    await expect(managePage.contentHeading).toContainText('Categories');
    await expect(managePage.categoriesTab).toHaveClass(/active/);
    expect(page.url()).toContain('/manage/categories');
  });

  test('should navigate between all tabs with correct content and active states', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Start at Categories
    await expect(managePage.contentHeading).toContainText('Categories');
    await expect(managePage.categoriesTab).toHaveClass(/active/);

    // Navigate to Units
    await managePage.navigateToUnits();
    await expect(managePage.contentHeading).toContainText('Units');
    await expect(managePage.unitsTab).toHaveClass(/active/);
    expect(page.url()).toContain('/manage/units');

    // Navigate to Items
    await managePage.navigateToItems();
    await expect(managePage.contentHeading).toContainText('Items');
    await expect(managePage.itemsTab).toHaveClass(/active/);
    expect(page.url()).toContain('/manage/items');

    // Navigate to Recipes
    await managePage.navigateToRecipes();
    await expect(managePage.contentHeading).toContainText('Recipes');
    await expect(managePage.recipesTab).toHaveClass(/active/);
    expect(page.url()).toContain('/manage/recipes');

    // Navigate back to Categories
    await managePage.navigateToCategories();
    await expect(managePage.contentHeading).toContainText('Categories');
    await expect(managePage.categoriesTab).toHaveClass(/active/);
  });
});
