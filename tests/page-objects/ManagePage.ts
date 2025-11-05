import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ManagePage extends BasePage {
  readonly heading: Locator;
  readonly pageContainer: Locator;
  readonly manageTabs: Locator;
  readonly categoriesTab: Locator;
  readonly unitsTab: Locator;
  readonly itemsTab: Locator;
  readonly recipesTab: Locator;
  readonly manageContent: Locator;
  readonly contentHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.pageContainer = page.locator('.page-container.manage-page');
    this.heading = this.pageContainer.locator('h1').first();
    this.manageTabs = page.locator('.manage-tabs');
    this.categoriesTab = this.manageTabs.locator('a', { hasText: 'Categories' });
    this.unitsTab = this.manageTabs.locator('a', { hasText: 'Units' });
    this.itemsTab = this.manageTabs.locator('a', { hasText: 'Items' });
    this.recipesTab = this.manageTabs.locator('a', { hasText: 'Recipes' });
    this.manageContent = page.locator('.manage-content');
    this.contentHeading = this.manageContent.locator('h1');
  }

  async goto() {
    await this.page.goto('/manage/categories');
  }

  async navigateToCategories() {
    await this.categoriesTab.click();
    await this.page.waitForURL('**/manage/categories');
    await this.contentHeading.waitFor({ state: 'visible' });
  }

  async navigateToUnits() {
    await this.unitsTab.click();
    await this.page.waitForURL('**/manage/units');
    await this.contentHeading.waitFor({ state: 'visible' });
  }

  async navigateToItems() {
    await this.itemsTab.click();
    await this.page.waitForURL('**/manage/items');
    await this.contentHeading.waitFor({ state: 'visible' });
  }

  async navigateToRecipes() {
    await this.recipesTab.click();
    await this.page.waitForURL('**/manage/recipes');
    await this.contentHeading.waitFor({ state: 'visible' });
  }
}
