// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest'

describe('pwa_sw.js', () => {
  let cacheMock

  beforeAll(async () => {
    cacheMock = {
      addAll: vi.fn().mockResolvedValue(),
      put: vi.fn().mockResolvedValue(),
    }
    const cachesMock = {
      open: vi.fn().mockResolvedValue(cacheMock),
      match: vi.fn(),
    }
    vi.stubGlobal('caches', cachesMock)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('network')))

    await import('../../colour_app/static/js/pwa_sw.js')
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  beforeEach(() => {
    cacheMock.addAll.mockClear()
    cacheMock.put.mockClear()
    caches.open.mockClear()
    fetch.mockClear()
  })

  describe('install event', () => {
    it('caches all static assets', async () => {
      const event = new Event('install')
      let installDone
      event.waitUntil = vi.fn((p) => { installDone = p })
      self.dispatchEvent(event)
      await installDone

      expect(caches.open).toHaveBeenCalledWith('colour-app-v2')
      expect(cacheMock.addAll).toHaveBeenCalledOnce()
      const assets = cacheMock.addAll.mock.calls[0][0]
      expect(assets).toContain('/')
      expect(assets).toContain('/dashboard')
      expect(assets).toContain('/config')
      expect(assets).toContain('/static/css/styles.css')
      expect(assets).toContain('/static/css/dashboard.css')
      expect(assets).toContain('/static/js/main.js')
      expect(assets).toContain('/static/js/dashboard.js')
      expect(assets).toContain('/static/js/views/cie.js')
      expect(assets).toContain('/static/manifest.json')
      expect(assets).toContain('/static/img/icon-192.png')
      expect(assets).toContain('/static/img/icon-512.png')
      expect(assets).toContain('/static/img/cie1931xy.svg')
    })
  })

  describe('fetch event', () => {
    const BASE = self.location.origin

    it('serves from cache when available', async () => {
      const cachedResponse = new Response('cached')
      caches.match.mockResolvedValue(cachedResponse)

      const request = new Request(new URL('/static/css/styles.css', BASE))
      const event = new Event('fetch')
      let respondWithArg
      event.respondWith = vi.fn((p) => { respondWithArg = p })
      event.request = request
      self.dispatchEvent(event)

      const response = await respondWithArg
      expect(await response.text()).toBe('cached')
    })

    it('fetches from network and updates cache on miss', async () => {
      caches.match.mockResolvedValue(undefined)
      const networkResponse = new Response('fresh')
      fetch.mockResolvedValue(networkResponse)

      const request = new Request(new URL('/static/js/pwa.js', BASE))
      const event = new Event('fetch')
      let respondWithArg
      event.respondWith = vi.fn((p) => { respondWithArg = p })
      event.request = request
      self.dispatchEvent(event)

      const response = await respondWithArg
      expect(await response.text()).toBe('fresh')
      expect(caches.open).toHaveBeenCalledWith('colour-app-v2')
      expect(cacheMock.put).toHaveBeenCalledWith(request, expect.any(Response))
    })
  })
})
