// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
    channelValue,
    flickerStatus,
    formatAge,
    normalizeChannels,
} from '../../colour_app/static/js/sensor-data.js'
import { initCie } from '../../colour_app/static/js/views/cie.js'
import { initFlicker } from '../../colour_app/static/js/views/flicker.js'

afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
})

describe('sensor-data', () => {
    it('reads lowercase sensor keys and normalizes calibration keys', () => {
        const data = { f1: 10, f2: 20, clr: 30, nir: 40, fd: 50 }
        expect(channelValue(data, 'f1')).toBe(10)
        expect(channelValue(data, 'clr')).toBe(30)
        expect(channelValue(data, 'fd')).toBe(50)
        expect(normalizeChannels(data)).toMatchObject({
            F1: 10,
            F2: 20,
            Clear: 30,
            NIR: 40,
            F8: 0,
        })
    })

    it('classifies fd values and formats ages', () => {
        expect(flickerStatus(0).state).toBe('quiet')
        expect(flickerStatus(25).state).toBe('detected')
        expect(flickerStatus(250).state).toBe('strong')
        expect(flickerStatus(null).state).toBe('unavailable')
        expect(formatAge(1000, 4000)).toBe('há 3s')
    })
})

describe('CIE view', () => {
    it('positions the live marker from xy coordinates', () => {
        document.body.innerHTML = `
            <span id="cie-marker" hidden></span>
            <span id="cie-x"></span>
            <span id="cie-y"></span>
            <span id="cie-cct"></span>
            <span id="cie-cct-status"></span>
            <span id="cie-lux"></span>
            <span id="cie-readout"></span>
        `
        const view = initCie()
        view.update({ x: 0.3127, y: 0.329, CCT: 6500, CCT_Status: 'CCT inside', Lux: 123 })

        const marker = document.getElementById('cie-marker')
        expect(marker.hidden).toBe(false)
        expect(parseFloat(marker.style.left)).toBeCloseTo(42.18, 1)
        expect(parseFloat(marker.style.top)).toBeCloseTo(60.1, 1)
        expect(document.getElementById('cie-x').textContent).toBe('0.3127')
        expect(document.getElementById('cie-cct').textContent).toBe('6500 K')
        expect(document.getElementById('cie-cct-status').textContent).toBe('Dentro do intervalo')
    })

    it('hides the marker without a valid analysis', () => {
        document.body.innerHTML = '<span id="cie-marker"></span>'
        const view = initCie()
        view.update(null)
        expect(document.getElementById('cie-marker').hidden).toBe(true)
    })
})

describe('Flicker view', () => {
    it('keeps a rolling sample series and updates the fd status', () => {
        document.body.innerHTML = `
            <strong id="flicker-fd"></strong>
            <strong id="flicker-status"></strong>
            <strong id="flicker-count"></strong>
            <svg id="flicker-chart" viewBox="0 0 620 260"></svg>
        `
        const view = initFlicker()
        view.update({ fd: 10 })
        view.update({ fd: 25 })

        expect(document.getElementById('flicker-fd').textContent).toBe('25')
        expect(document.getElementById('flicker-status').textContent).toBe('Flicker fraco')
        expect(document.getElementById('flicker-status').dataset.state).toBe('detected')
        expect(document.getElementById('flicker-count').textContent).toBe('2')
        expect(document.querySelectorAll('#flicker-chart [data-drawing="point"]')).toHaveLength(1)
    })
})
