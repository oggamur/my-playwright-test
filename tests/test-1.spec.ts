import { test, expect, Page, Locator } from '@playwright/test'

type Elements = {
  locator: (page: Page) => Locator
  name: string
  text?: string
  href?: string
}[]

const elements: Elements = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    href: '/',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    href: '/docs/intro',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    href: '/docs/api/class-playwright',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    href: '/community/welcome',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository link',
    href: 'https://github.com/microsoft/playwright',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server link',
    href: 'https://aka.ms/playwright/discord',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light button',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Search (Command+K)' }),
    name: 'Search (Command+K) button',
  },
]
test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/')
  })
  test('Проверка отображения навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible()
      })
    })
  })

  test('Элементы хедера имеют корректные названия', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка отображения текста ${name}`, async () => {
          await expect(locator(page)).toContainText(text)
        })
      }
    })
  })

  test('Проверка атрбутов href - элементов навигации хедера', async ({
    page,
  }) => {
    elements.forEach(({ locator, name, href }) => {
      if (href) {
        test.step(`Проверка атрибута href для ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute('href', href)
        })
      }
    })
  })

  test('Проверка переключения lightmode', async ({ page }) => {
    await page
      .getByRole('button', { name: 'Switch between dark and light' })
      .click()
    await page
      .getByRole('button', { name: 'Switch between dark and light' })
      .click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('Проверка текстового содержания заголовка страницы', async ({
    page,
  }) => {
    await expect(
      page.getByRole('heading', { name: 'Playwright enables reliable' })
    ).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.'
    )
  })

  test('Проверка кнопки getStarted', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Get started' })
    ).toHaveAttribute('href', '/docs/intro')
    await expect.soft(page.getByRole('banner')).toContainText('Get started')
    await page.getByRole('link', { name: 'Get started' }).click()
    await page.goto('https://playwright.dev/docs/intro')
  })
})
