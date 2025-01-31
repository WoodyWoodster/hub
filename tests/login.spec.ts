import { test, expect } from '@playwright/test';

test('should be redirected to login if not authenticated', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/.*login/);
})
