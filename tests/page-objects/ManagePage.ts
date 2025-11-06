import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ManagePage extends BasePage {
  readonly heading: Locator;
  readonly pageContainer: Locator;
  readonly manageHub: Locator;
  readonly categoriesCard: Locator;
  readonly unitsCard: Locator;
  readonly itemsCard: Locator;
  readonly recipesCard: Locator;

  constructor(page: Page) {
    super(page);
    this.pageContainer = page.locator('.page-container.manage-page');
    this.heading = this.pageContainer.locator('h1').first();
    this.manageHub = page.locator('.manage-hub');
    this.categoriesCard = this.manageHub.locator('button[aria-label="Navigate to Categories"]');
    this.unitsCard = this.manageHub.locator('button[aria-label="Navigate to Units"]');
    this.itemsCard = this.manageHub.locator('button[aria-label="Navigate to Items"]');
    this.recipesCard = this.manageHub.locator('button[aria-label="Navigate to Recipes"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/manage');
  }

  async navigateToCategories(): Promise<void> {
    await this.categoriesCard.click();
    await this.page.waitForURL('**/manage/categories');
  }

  async navigateToUnits(): Promise<void> {
    await this.unitsCard.click();
    await this.page.waitForURL('**/manage/units');
  }

  async navigateToItems(): Promise<void> {
    await this.itemsCard.click();
    await this.page.waitForURL('**/manage/items');
  }

  async navigateToRecipes(): Promise<void> {
    await this.recipesCard.click();
    await this.page.waitForURL('**/manage/recipes');
  }
  
  async getCategoryCount(): Promise<string> {
    const text = await this.categoriesCard.locator('.nav-card-count').textContent();
    return text || '';
  }

  async getUnitCount(): Promise<string> {
    const text = await this.unitsCard.locator('.nav-card-count').textContent();
    return text || '';
  }

  async getItemCount(): Promise<string> {
    const text = await this.itemsCard.locator('.nav-card-count').textContent();
    return text || '';
  }

  async getRecipeCount(): Promise<string> {
    const text = await this.recipesCard.locator('.nav-card-count').textContent();
    return text || '';
  }
}
