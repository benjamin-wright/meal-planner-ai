import { Page, Locator } from '@playwright/test';

/**
 * Base page object with common navigation functionality
 */
export class BasePage {
  readonly page: Page;
  readonly bottomNav: Locator;
  readonly planNavButton: Locator;
  readonly shopNavButton: Locator;
  readonly manageNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bottomNav = page.locator('nav[aria-label="Main navigation"]');
    this.planNavButton = this.bottomNav.locator('a[aria-label="Plan meals"]');
    this.shopNavButton = this.bottomNav.locator('a[aria-label="Shopping list"]');
    this.manageNavButton = this.bottomNav.locator('a[aria-label="Manage items"]');
  }

  async navigateToPlan(): Promise<void> {
    await this.planNavButton.click();
    await this.page.waitForURL((url) => !url.pathname.includes('/shop') && !url.pathname.includes('/manage'));
  }

  async navigateToShop(): Promise<void> {
    await this.shopNavButton.click();
    await this.page.waitForURL('**/shop');
  }

  async navigateToManage(): Promise<void> {
    await this.manageNavButton.click();
    await this.page.waitForURL('**/manage');
  }
}
