import { test, expect } from '@playwright/test';
import { PlanPage, ShopPage, ManagePage } from '../page-objects';

test.describe('Navigation Workflow', () => {
  test('should navigate between all main sections using bottom nav', async ({ page }) => {
    // Start at Plan
    const planPage = new PlanPage(page);
    await planPage.goto();
    await expect(planPage.heading).toContainText('Meal Plan');
    await expect(planPage.planNavButton).toHaveClass(/active/);

    // Navigate to Shop
    await planPage.navigateToShop();
    const shopPage = new ShopPage(page);
    await expect(shopPage.heading).toContainText('Shopping List');
    await expect(shopPage.shopNavButton).toHaveClass(/active/);
    expect(page.url()).toContain('/shop');

    // Navigate to Manage
    await shopPage.navigateToManage();
    const managePage = new ManagePage(page);
    await expect(managePage.heading).toContainText('Manage');
    await expect(managePage.manageNavButton).toHaveClass(/active/);
    expect(page.url()).toContain('/manage');

    // Navigate back to Plan from Manage
    await managePage.navigateToPlan();
    await expect(planPage.heading).toContainText('Meal Plan');
    await expect(planPage.planNavButton).toHaveClass(/active/);

    // Navigate to Shop from Plan
    await planPage.navigateToShop();
    await expect(shopPage.heading).toContainText('Shopping List');

    // Navigate back to Plan from Shop
    await shopPage.navigateToPlan();
    await expect(planPage.heading).toContainText('Meal Plan');
  });

  test('should work with browser back and forward buttons', async ({ page }) => {
    const planPage = new PlanPage(page);
    await planPage.goto();

    // Navigate to Shop
    await planPage.navigateToShop();
    const shopPage = new ShopPage(page);
    expect(page.url()).toContain('/shop');

    // Navigate to Manage
    await shopPage.navigateToManage();
    expect(page.url()).toContain('/manage');

    // Go back to Shop
    await page.goBack();
    expect(page.url()).toContain('/shop');
    await expect(shopPage.heading).toContainText('Shopping List');

    // Go back to Plan
    await page.goBack();
    expect(page.url()).not.toContain('/shop');
    await expect(planPage.heading).toContainText('Meal Plan');

    // Go forward to Shop
    await page.goForward();
    expect(page.url()).toContain('/shop');
    await expect(shopPage.heading).toContainText('Shopping List');

    // Go forward to Manage
    await page.goForward();
    expect(page.url()).toContain('/manage');
    const managePage = new ManagePage(page);
    await expect(managePage.heading).toContainText('Manage');
  });
});
