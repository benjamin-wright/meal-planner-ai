import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.page-container:not(.manage-page)').locator('h1');
  }

  async goto(): Promise<void> {
    await this.page.goto('/shop');
  }
}
