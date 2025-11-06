import { test, expect } from '@playwright/test';
import { ManagePage } from '../page-objects';

test.describe('Manage Page', () => {
  test('should display hub with navigation cards', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Verify page structure
    await expect(managePage.heading).toContainText('Manage');
    await expect(managePage.bottomNav).toBeVisible();
    await expect(managePage.manageNavButton).toHaveClass(/active/);
    
    // Verify all navigation cards are visible
    await expect(managePage.categoriesCard).toBeVisible();
    await expect(managePage.unitsCard).toBeVisible();
    await expect(managePage.itemsCard).toBeVisible();
    await expect(managePage.recipesCard).toBeVisible();
    
    // Verify counts are displayed (either numbers or "Loading...")
    const categoryCount = await managePage.getCategoryCount();
    expect(categoryCount).toMatch(/\d+ categories|Loading.../);
    
    // Verify URL
    expect(page.url()).toContain('/manage');
    expect(page.url()).not.toContain('/manage/categories'); // Should not redirect
  });

  test('should navigate to Categories page and back', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Navigate to Categories
    await managePage.navigateToCategories();
    await expect(page.locator('h1')).toContainText('Categories');
    expect(page.url()).toContain('/manage/categories');
    
    // Verify back button is visible
    const backButton = page.locator('.back-button');
    await expect(backButton).toBeVisible();
    
    // Click back button to return to hub
    await backButton.click();
    await page.waitForURL('**/manage');
    await expect(managePage.heading).toContainText('Manage');
    await expect(managePage.manageHub).toBeVisible();
  });

  test('should navigate to Units page and back', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Navigate to Units
    await managePage.navigateToUnits();
    await expect(page.locator('h1')).toContainText('Units');
    expect(page.url()).toContain('/manage/units');
    
    // Click back button to return to hub
    const backButton = page.locator('.back-button');
    await backButton.click();
    await page.waitForURL('**/manage');
    await expect(managePage.heading).toContainText('Manage');
  });

  test('should navigate to Items page and back', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Navigate to Items
    await managePage.navigateToItems();
    await expect(page.locator('h1')).toContainText('Items');
    expect(page.url()).toContain('/manage/items');
    
    // Click back button to return to hub
    const backButton = page.locator('.back-button');
    await backButton.click();
    await page.waitForURL('**/manage');
    await expect(managePage.heading).toContainText('Manage');
  });

  test('should navigate to Recipes page and back', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Navigate to Recipes
    await managePage.navigateToRecipes();
    await expect(page.locator('h1')).toContainText('Recipes');
    expect(page.url()).toContain('/manage/recipes');
    
    // Click back button to return to hub
    const backButton = page.locator('.back-button');
    await backButton.click();
    await page.waitForURL('**/manage');
    await expect(managePage.heading).toContainText('Manage');
  });

  test('should display resource counts', async ({ page }) => {
    const managePage = new ManagePage(page);
    await managePage.goto();

    // Wait for counts to load (they start as null/Loading...)
    await page.waitForTimeout(500);
    
    // Verify counts are numeric (should be 0 for empty database)
    const categoryCount = await managePage.getCategoryCount();
    const unitCount = await managePage.getUnitCount();
    const itemCount = await managePage.getItemCount();
    const recipeCount = await managePage.getRecipeCount();
    
    expect(categoryCount).toMatch(/\d+ categories/);
    expect(unitCount).toMatch(/\d+ units/);
    expect(itemCount).toMatch(/\d+ items/);
    expect(recipeCount).toMatch(/\d+ recipes/);
  });
});
