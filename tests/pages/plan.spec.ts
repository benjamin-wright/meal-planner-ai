import { test, expect } from '@playwright/test';
import { PlanPage } from '../page-objects';

test.describe('Plan Page', () => {
  test('should be the default landing page with correct elements', async ({ page }) => {
    const planPage = new PlanPage(page);
    await planPage.goto();

    // Verify it's the landing page
    expect(page.url()).toMatch(/\/$|\/$/);
    
    // Verify page elements
    await expect(planPage.heading).toContainText('Meal Plan');
    await expect(planPage.bottomNav).toBeVisible();
    await expect(planPage.planNavButton).toHaveClass(/active/);
  });

  test('should redirect unknown routes to Plan page', async ({ page }) => {
    await page.goto('/unknown-route');
    
    const planPage = new PlanPage(page);
    await expect(planPage.heading).toContainText('Meal Plan');
  });
});
