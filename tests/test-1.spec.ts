import { test, expect } from '@playwright/test'

test('Проверка отображения навигации хедера', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  await expect(
    page.getByRole('link', { name: 'Playwright logo Playwright' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'API' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Community' })).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'GitHub repository' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Discord server' })).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Switch between dark and light' })
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Search (Command+K)' })
  ).toBeVisible()
})

test('Элементы хедера имеют корректные названия', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs')
  await expect(page.getByRole('link', { name: 'API' })).toContainText('API')
  await expect(page.getByRole('button', { name: 'Node.js' })).toContainText(
    'Node.js'
  )
  await expect(page.getByRole('link', { name: 'Community' })).toContainText(
    'Community'
  )
})

test('Проверка атрбутов href - элементов навигации хедера', async ({
  page,
}) => {
  await page.goto('https://playwright.dev/')

  await expect(
    page.getByRole('link', { name: 'Playwright logo Playwright' })
  ).toHaveAttribute('href', '/')
  await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute(
    'href',
    '/docs/intro'
  )
  await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
    'href',
    '/docs/api/class-playwright'
  )
  await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
    'href',
    '/community/welcome'
  )
  await expect(
    page.getByRole('link', { name: 'GitHub repository' })
  ).toHaveAttribute('href', 'https://github.com/microsoft/playwright')
  await expect(
    page.getByRole('link', { name: 'Discord server' })
  ).toHaveAttribute('href', 'https://aka.ms/playwright/discord')
})

test('Проверка переключения lightmode', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await page
    .getByRole('button', { name: 'Switch between dark and light' })
    .click()
  await page
    .getByRole('button', { name: 'Switch between dark and light' })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('Проверка текстового содержания заголовка страницы', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(
    page.getByRole('heading', { name: 'Playwright enables reliable' })
  ).toContainText(
    'Playwright enables reliable end-to-end testing for modern web apps.'
  )
})

test('Проверка кнопки getStarted', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute(
    'href',
    '/docs/intro'
  )
  await expect.soft(page.getByRole('banner')).toContainText('Get started')
  await page.getByRole('link', { name: 'Get started' }).click()
  await page.goto('https://playwright.dev/docs/intro')
})
