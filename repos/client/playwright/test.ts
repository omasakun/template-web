import { test as baseTest } from '@playwright/test'
import { fixtures } from '@playwright-testing-library/test/fixture.js'
import type { TestingLibraryFixtures } from '@playwright-testing-library/test/fixture'
const test = baseTest.extend<TestingLibraryFixtures>(fixtures)
const { expect } = test

test('visits the app root url', async ({ page, queries: q }) => {
  await page.goto('/')
  expect(await q.findByText(/Hello!/i)).toBeDefined()
})
test('should increment count on click', async ({ page, queries: q }) => {
  await page.goto('/')
  expect(await q.findByText('count is: 0')).toBeDefined()
  await (await q.findByRole('button')).click()
  expect(await q.findByText('count is: 1')).toBeDefined()
  await (await q.findByRole('button')).click()
  expect(await q.findByText('count is: 2')).toBeDefined()
})
