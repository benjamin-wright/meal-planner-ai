import { test, expect } from '@playwright/test';
import { ShopPage } from '../page-objects';

test.describe('Shop Page', () => {
  test('should display page with correct elements and active navigation', async ({ page }) => {
    const shopPage = new ShopPage(page);
    await shopPage.goto();

    // Verify page elements
    await expect(shopPage.heading).toContainText('Shopping List');
    await expect(shopPage.bottomNav).toBeVisible();
    await expect(shopPage.shopNavButton).toHaveClass(/active/);
  });
});
