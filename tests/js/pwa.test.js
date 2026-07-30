// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest'

describe('pwa.js', () => {
  beforeAll(async () => {
    document.body.innerHTML = `
      <button class="menu-toggle"><span class="hamburger"></span></button>
      <nav class="nav-menu"><ul><li><a href="/">Home</a></li></ul></nav>
    `
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { register: vi.fn().mockResolvedValue({}) },
      configurable: true,
      writable: true,
    })
    console.log = vi.fn()
    await import('../../colour_app/static/js/pwa.js')
  })

  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('toggles .active class on nav-menu when menu-toggle is clicked', () => {
    const nav = document.querySelector('.nav-menu')
    const toggle = document.querySelector('.menu-toggle')
    expect(nav.classList.contains('active')).toBe(false)
    toggle.click()
    expect(nav.classList.contains('active')).toBe(true)
    toggle.click()
    expect(nav.classList.contains('active')).toBe(false)
  })

  it('registers service worker on window load', () => {
    const register = navigator.serviceWorker.register
    register.mockClear()
    window.dispatchEvent(new Event('load'))
    expect(register).toHaveBeenCalledWith('/static/js/pwa_sw.js')
  })

  it('logs success on SW registration', async () => {
    console.log.mockClear()
    window.dispatchEvent(new Event('load'))
    await vi.waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('SW registrado!', {})
    })
  })
})
