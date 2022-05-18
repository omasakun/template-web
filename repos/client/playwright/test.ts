import { expect, test } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  expect(await page.textContent('h1')).toContain('Hello!')
})
test('should increment count on click', async ({ page }) => {
  await page.goto('/')
  expect(await page.textContent('button')).toContain('count is: 0')
  await (await page.$('button')).click()
  expect(await page.textContent('button')).toContain('count is: 1')
  await (await page.$('button')).click()
  expect(await page.textContent('button')).toContain('count is: 2')
})
